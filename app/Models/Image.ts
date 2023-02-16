import { DateTime } from 'luxon';
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';
import Product from './Product';

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @hasOne(() => Product)
  public product: HasOne<typeof Product>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
