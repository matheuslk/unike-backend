import { DateTime } from 'luxon';
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';
import Product from './Product';

export default class Size extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public size: string;

  @column()
  public product_id: number;

  @hasOne(() => Product)
  public product: HasOne<typeof Product>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
