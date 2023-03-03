import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import Product from './Product';

export default class Size extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public size: string;

  @column()
  public product_id: number;

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;
}
