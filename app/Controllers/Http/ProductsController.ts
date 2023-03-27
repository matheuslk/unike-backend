import Drive from '@ioc:Adonis/Core/Drive';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BadRequestException from 'App/Exceptions/BadRequestException';
import Category from 'App/Models/Category';
import Image from 'App/Models/Image';
import Product from 'App/Models/Product';
import Size from 'App/Models/Size';
import { ERROR_MESSAGES } from 'App/Utils/enums/error-messages';
import ProductFilterValidator from 'App/Validators/ProductFilterValidator';
import ProductStoreValidator from 'App/Validators/ProductStoreValidator';

export default class ProductsController {
  public async filter({ request }: HttpContextContract): Promise<Product[]> {
    const { name, categories, sizes } = await request.validate(
      ProductFilterValidator
    );

    const products = Product.query();
    if (name !== undefined) {
      await products.where('name', 'like', `%${name}%`);
    }
    if (categories !== undefined && categories.length > 0) {
      await products.whereIn('category_id', categories);
    }
    if (sizes !== undefined && sizes.length > 0) {
      await products
        .join('sizes', query => {
          query
            .on('sizes.product_id', '=', 'products.id')
            .andOnIn('sizes.size', sizes);
        })
        .select('products.*');
    }
    return await products.preload('images');
  }

  public async store({ request }: HttpContextContract): Promise<Product> {
    const body = await request.validate(ProductStoreValidator);

    const product = await Product.create({
      name: body.name,
      price: body.price,
      amount: body.amount,
      category_id: body.category_id,
      description: body.description,
    });

    if (body.sizes !== undefined) {
      for (const bodySize of body.sizes) {
        await Size.create({
          size: bodySize,
          product_id: product.id,
        });
      }
    }

    if (body.files !== undefined) {
      for (const [index, file] of body.files.entries()) {
        const file_name = `${product.id}-${index}-file.${file.extname ?? ''}`;
        await Promise.all([
          file.moveToDisk('./', {
            name: file_name,
          }),
          Image.create({
            file_name,
            product_id: product.id,
          }),
        ]);
      }
    } else {
      await Image.create({
        file_name: `default.jpg`,
        product_id: product.id,
      });
    }

    return product;
  }

  public async show({ params }: HttpContextContract): Promise<Product> {
    const product = await Product.query()
      .where('id', params.id)
      .preload('category')
      .preload('images')
      .preload('sizes')
      .first();
    if (product === null) {
      throw new BadRequestException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }
    return product;
  }

  public async update({
    request,
    product,
  }: HttpContextContract): Promise<Product> {
    const body = await request.validate(ProductStoreValidator);

    if (body.deleteSizes === true) {
      await product.related('sizes').query().delete();
    } else if (body.sizes !== undefined) {
      const sizes = await product.related('sizes').query();
      for (const [index, size] of body.sizes.entries()) {
        const currentSize: Size | undefined = sizes[index];
        currentSize !== undefined
          ? await currentSize.merge({ size }).save()
          : await Size.create({ size, product_id: product.id });
      }
      if (body.sizes.length < sizes.length) {
        for (let index = body.sizes.length; index < sizes.length; index++) {
          await sizes[index].delete();
        }
      }
    }

    const images = await product.related('images').query();
    if (body.deleteFiles === true) {
      for (const [index, image] of images.entries()) {
        if (index !== 0) {
          await Promise.all([Drive.delete(image.file_name), image.delete()]);
        } else if (image.file_name !== 'default.jpg') {
          await Promise.all([
            Drive.delete(image.file_name),
            image.merge({ file_name: 'default.jpg' }).save(),
          ]);
        }
      }
    } else if (body.files !== undefined) {
      for (const [index, file] of body.files.entries()) {
        const currentImage: Image | undefined = images[index];
        const file_name = `${product.id}-${index}-file.${file.extname ?? ''}`;
        await file.moveToDisk('./', {
          name: file_name,
        });

        if (currentImage === undefined) {
          await Image.create({ file_name, product_id: product.id });
        } else {
          await currentImage.merge({ file_name }).save();
        }
      }

      if (body.files.length < images.length) {
        for (let index = body.files.length; index < images.length; index++) {
          await Promise.all([
            Drive.delete(images[index].file_name),
            images[index].delete(),
          ]);
        }
      }
    }

    return await product
      .merge({
        name: body.name,
        price: body.price,
        amount: body.amount,
        category_id: body.category_id,
        description: body.description,
      })
      .save();
  }

  public async destroy({ product }: HttpContextContract): Promise<Product> {
    const images = await product.related('images').query();
    for (const [index, image] of images.entries()) {
      if (index === 0) {
        if (image.file_name !== 'default.jpg') {
          await Promise.all([
            Drive.delete(image.file_name),
            image.merge({ file_name: 'default.jpg' }).save(),
          ]);
        }
      } else {
        await Promise.all([Drive.delete(image.file_name), image.delete()]);
      }
    }

    await product.delete();
    return product;
  }

  public async filters(ctx: HttpContextContract): Promise<{
    categories: Category[];
    sizes: Size[];
  }> {
    const filters = await Promise.all([
      Category.query().orderBy('id', 'asc'),
      Size.query()
        .join('products', 'products.id', '=', 'sizes.product_id')
        .where('products.category_id', 1)
        .distinct('sizes.size')
        .orderBy('sizes.size', 'asc'),
    ]);
    return {
      categories: filters[0],
      sizes: filters[1],
    };
  }
}
