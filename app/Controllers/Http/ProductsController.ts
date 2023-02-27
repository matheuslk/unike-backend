import Drive from '@ioc:Adonis/Core/Drive';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Image from 'App/Models/Image';
import Product from 'App/Models/Product';
import Size from 'App/Models/Size';
import ProductStoreValidator from 'App/Validators/ProductStoreValidator';

export default class ProductsController {
  public async filter({ request }: HttpContextContract) {
    const { name, category_id, size } = request.body();

    const products = Product.query();
    if (name) {
      products.where('name', 'like', `%${name}%`);
    }
    if (category_id) {
      products.where('category_id', category_id);
    }
    if (size) {
      products
        .join('sizes', 'sizes.product_id', '=', 'products.id')
        .where('sizes.size', size);
    }
    return await products;
  }

  public async store({ request }: HttpContextContract) {
    const body = await request.validate(ProductStoreValidator);

    const product = await Product.create({
      name: body.name,
      price: body.price,
      amount: body.amount,
      category_id: body.category_id,
      description: body.description,
    });

    if (body.sizes?.length) {
      body.sizes.forEach((size) => {
        Size.create({
          size,
          product_id: product.id,
        });
      });
    }

    if (body.files?.length) {
      body.files.forEach((file, index) => {
        const file_name = `${product.id}-${index}-file.${file.extname}`;
        file.moveToDisk('./', {
          name: file_name,
        });
        Image.create({
          file_name,
          product_id: product.id,
        });
      });
    } else {
      Image.create({
        file_name: `default.jpg`,
        product_id: product.id,
      });
    }

    return product;
  }

  public async show({ params }: HttpContextContract) {
    return await Product.query()
      .where('id', params.id)
      .preload('category')
      .preload('sizes')
      .preload('images');
  }

  public async update({ request, product }: HttpContextContract) {
    const body = await request.validate(ProductStoreValidator);

    if (body.deleteSizes) {
      await product.related('sizes').query().delete();
    } else if (body.sizes?.length) {
      const sizes = await product.related('sizes').query();
      body.sizes.forEach((size, index) => {
        sizes[index]
          ? sizes[index].merge({ size }).save()
          : Size.create({ size, product_id: product.id });
      });
      if (body.sizes?.length < sizes.length) {
        for (let index = body.sizes.length; index <= sizes.length; index++) {
          if (index === sizes.length) {
            break;
          }
          sizes[index].delete();
        }
      }
    }

    const images = await product.related('images').query();
    if (body.deleteFiles) {
      images.forEach((image, index) => {
        if (index === 0) {
          if (image.file_name !== 'default.jpg') {
            Drive.delete(image.file_name);
            image.merge({ file_name: 'default.jpg' }).save();
          }
          return;
        }
        Drive.delete(image.file_name);
        image.delete();
      });
    } else if (body.files?.length) {
      body.files.forEach((file, index) => {
        const currentImage = images[index];
        const file_name = `${product.id}-${index}-file.${file.extname}`;
        file.moveToDisk('./', {
          name: file_name,
        });
        if (currentImage) {
          currentImage.merge({ file_name }).save();
          return;
        }
        Image.create({ file_name, product_id: product.id });
      });
      if (body.files?.length < images.length) {
        for (let index = body.files.length; index <= images.length; index++) {
          if (index === images.length) {
            break;
          }
          const currentImage = images[index];
          Drive.delete(currentImage.file_name);
          currentImage.delete();
        }
      }
    }

    await product
      .merge({
        name: body.name,
        price: body.price,
        amount: body.amount,
        category_id: body.category_id,
        description: body.description,
      })
      .save();
    return product;
  }

  public async destroy({ product }: HttpContextContract) {
    const images = await product.related('images').query();
    images.forEach((image, index) => {
      if (index === 0) {
        if (image.file_name !== 'default.jpg') {
          Drive.delete(image.file_name);
          image.merge({ file_name: 'default.jpg' }).save();
        }
        return;
      }
      Drive.delete(image.file_name);
      image.delete();
    });
    await product.delete();
    return product;
  }
}
