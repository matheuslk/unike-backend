import Drive from '@ioc:Adonis/Core/Drive';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Image from 'App/Models/Image';
import Product from 'App/Models/Product';
import Size from 'App/Models/Size';
import ProductFilterValidator from 'App/Validators/ProductFilterValidator';
import ProductStoreValidator from 'App/Validators/ProductStoreValidator';

export default class ProductsController {
  public async filter({ request }: HttpContextContract): Promise<Product[]> {
    const { name, category_id, size } = await request.validate(
      ProductFilterValidator
    );

    const products = Product.query();
    if (name !== undefined) {
      await products.where('name', 'like', `%${name}%`);
    }
    if (category_id !== undefined) {
      await products.where('category_id', category_id);
    }
    if (size !== undefined) {
      await products
        .join('sizes', 'sizes.product_id', '=', 'products.id')
        .where('sizes.size', size);
    }
    return await products;
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
      body.sizes.forEach(size => {
        Size.create({
          size,
          product_id: product.id,
        })
          .then()
          .catch(error => {
            console.log(error.stack);
          });
      });
    }

    if (body.files !== undefined) {
      body.files.forEach((file, index) => {
        const file_name = `${product.id}-${index}-file.${file.extname ?? ''}`;
        Promise.all([
          file.moveToDisk('./', {
            name: file_name,
          }),
          Image.create({
            file_name,
            product_id: product.id,
          }),
        ])
          .then()
          .catch(error => {
            console.log(error.stack);
          });
      });
    } else {
      await Image.create({
        file_name: `default.jpg`,
        product_id: product.id,
      });
    }

    return product;
  }

  public async show({ params }: HttpContextContract): Promise<Product[]> {
    return await Product.query()
      .where('id', params.id)
      .preload('category')
      .preload('sizes')
      .preload('images');
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
      body.sizes.forEach((size, index) => {
        const currentSize: Size | undefined = sizes[index];
        currentSize !== undefined
          ? currentSize
              .merge({ size })
              .save()
              .then()
              .catch(error => {
                console.log(error.stack);
              })
          : Size.create({ size, product_id: product.id })
              .then()
              .catch(error => {
                console.log(error.stack);
              });
      });
      if (body.sizes.length < sizes.length) {
        for (let index = body.sizes.length; index <= sizes.length; index++) {
          if (index === sizes.length) {
            break;
          }
          await sizes[index].delete();
        }
      }
    }

    const images = await product.related('images').query();
    if (body.deleteFiles === true) {
      images.forEach((image, index) => {
        if (index === 0) {
          if (image.file_name !== 'default.jpg') {
            Promise.all([
              Drive.delete(image.file_name),
              image.merge({ file_name: 'default.jpg' }).save(),
            ])
              .then()
              .catch(error => {
                console.log(error.stack);
              });
          }
          return;
        }
        Promise.all([Drive.delete(image.file_name), image.delete()])
          .then()
          .catch(error => {
            console.log(error.stack);
          });
      });
    } else if (body.files !== undefined) {
      body.files.forEach((file, index) => {
        const currentImage: Image | undefined = images[index];
        const file_name = `${product.id}-${index}-file.${file.extname ?? ''}`;
        file
          .moveToDisk('./', {
            name: file_name,
          })
          .then()
          .catch(error => {
            console.log(error.stack);
          });
        if (currentImage !== undefined) {
          currentImage
            .merge({ file_name })
            .save()
            .then()
            .catch(error => {
              console.log(error.stack);
            });
          return;
        }
        Image.create({ file_name, product_id: product.id })
          .then()
          .catch(error => {
            console.log(error.stack);
          });
      });
      if (body.files.length < images.length) {
        for (let index = body.files.length; index <= images.length; index++) {
          if (index === images.length) {
            break;
          }
          const currentImage = images[index];
          Promise.all([
            Drive.delete(currentImage.file_name),
            currentImage.delete(),
          ])
            .then()
            .catch(error => {
              console.log(error.stack);
            });
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

  public async destroy({ product }: HttpContextContract): Promise<Product> {
    const images = await product.related('images').query();
    images.forEach((image, index) => {
      if (index === 0) {
        if (image.file_name !== 'default.jpg') {
          Promise.all([
            Drive.delete(image.file_name),
            image.merge({ file_name: 'default.jpg' }).save(),
          ])
            .then()
            .catch(error => {
              console.log(error.stack);
            });
        }
        return;
      }
      Promise.all([Drive.delete(image.file_name), image.delete()])
        .then()
        .catch(error => {
          console.log(error.stack);
        });
    });
    await product.delete();
    return product;
  }
}
