import { Configuration } from '../../configurations/models/configuration.model';
import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
@Table({ timestamps: false })
export class Transaction extends Model {
  @Column
  from: string;

  @Column
  hash: string;

  @Column
  to: string;

  @Column
  value: number;

  @ForeignKey(() => Configuration)
  configurationId: number;

  @BelongsTo(() => Configuration)
  configuration: Configuration;
}
