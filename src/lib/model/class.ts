import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, AllowNull, Comment } from "sequelize-typescript";
import { providerWrapper } from "midway";

export const factory = () => ClassModel;

providerWrapper([
  {
    id: 'ClassModel',
    provider: factory,
  },
])

export type IClassModel = typeof ClassModel;

@Table({
  freezeTableName: true,
  tableName: 'classes',
})
export class ClassModel extends Model<ClassModel> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id!: number;

  @Comment('分类名称')
  @Column(DataType.STRING)
  name!: string;

  @Comment('logo地址')
  @Column(DataType.STRING)
  icon!: string;

  @Comment('二级分类')
  @Column(DataType.STRING)
  set children(value: any) {
    if (Array.isArray(value)) {
      this.setDataValue('children', value.join(','));
    } else if (value !== '') {
      throw new Error('children字段不能为非数组');
    }
  }

  get children() {
    const value = this.getDataValue('children');
    if (!value) return [];
    return value.spilt(',');
  }
}
