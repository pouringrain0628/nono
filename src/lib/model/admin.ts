import { Model, Table, Column, DataType, Comment, Unique, AllowNull } from 'sequelize-typescript';
import { providerWrapper } from 'midway';
import * as bcryptjs from 'bcryptjs';

export const factory = () => AdminModel;
providerWrapper([
  {
    id: 'AdminModel',
    provider: factory,
  }
])

export type IAdminModel = typeof AdminModel;

@Table({
  freezeTableName: true,
  tableName: 'admins',
  timestamps: true,
})
export class AdminModel extends Model<AdminModel> {
  @Comment('管理员登录账号')
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(32))
  username!: string;

  @Comment('密码')
  @AllowNull(false)
  @Column(DataType.STRING)
  set password(value: string) {
    this.setDataValue('password', value);
    const salt = bcryptjs.genSaltSync();
    this.setDataValue('hashedPassword', bcryptjs.hashSync(value, salt));
  }

  @Comment('密码哈希值')
  @AllowNull(false)
  @Column(DataType.STRING)
  hashedPassword!: string;
}
