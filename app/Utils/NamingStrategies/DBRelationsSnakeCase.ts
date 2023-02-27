import {
  LucidModel,
  ModelRelations,
  SnakeCaseNamingStrategy,
} from '@ioc:Adonis/Lucid/Orm';

import { string } from '@poppinss/utils/build/helpers';

export class DBRelationsSnakeCase extends SnakeCaseNamingStrategy {
  public relationForeignKey(
    relation: ModelRelations['__opaque_type'],
    model: LucidModel,
    relatedModel: LucidModel
  ): string {
    if (relation === 'belongsTo') {
      return string.snakeCase(
        `${relatedModel.name}_${relatedModel.primaryKey}`
      );
    }

    return string.snakeCase(`${model.name}_${model.primaryKey}`);
  }
}
