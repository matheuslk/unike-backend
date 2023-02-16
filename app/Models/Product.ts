import { DateTime } from 'luxon';
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm';
import Category from './Category';
import Size from './Size';
import Image from './Image';

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public price: number;

  @column()
  public description: string;

  @column()
  public category_id: number;

  @hasOne(() => Category)
  public category: HasOne<typeof Category>;

  @hasMany(() => Size)
  public sizes: HasMany<typeof Size>;

  @hasMany(() => Image)
  public images: HasMany<typeof Image>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
