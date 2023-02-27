import {
  BaseModel,
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import Category from './Category';
import Image from './Image';
import Size from './Size';

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public price: number;

  @column()
  public amount: number;

  @column()
  public description: string;

  @column()
  public category_id: number;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;

  @hasMany(() => Size)
  public sizes: HasMany<typeof Size>;

  @hasMany(() => Image)
  public images: HasMany<typeof Image>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async setDescription(product: Product) {
    if (!product.description) {
      product.description = '';
    }
  }
}
