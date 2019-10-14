import { providerWrapper } from 'midway';
import { Column, Model, Table, DataType } from 'sequelize-typescript';

const { INTEGER, STRING } = DataType;
export const factory = () => UserModel;
providerWrapper([
  {
    id: 'UserModel',
    provider: factory,
  },
])

export type IUserModel = typeof UserModel;

@Table({
  freezeTableName: true,
  tableName: 'Users',
  timestamps: true,
})
export class UserModel extends Model<UserModel> {
  @Column({
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: STRING(32),
    comment: '用户openid'
  })
  openid!: string;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}
