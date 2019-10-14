import { Model, Table, Column, PrimaryKey, AllowNull, DataType, Comment, Default } from 'sequelize-typescript';
import { providerWrapper } from 'midway';

export const factory = () => GoodsModel;

providerWrapper([
  {
    id: 'GoodsModel',
    provider: factory,
  }
])

export type IGoodsModel = typeof GoodsModel;

@Table({
  freezeTableName: true,
  tableName: 'goods',
  timestamps: true,
})
export class GoodsModel extends Model<GoodsModel> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id!: number;

  @Comment('商品名称')
  @Column(DataType.STRING)
  name!: string;

  @Comment('商品价格，单位分')
  @AllowNull(false)
  @Column(DataType.INTEGER)
  price!: number;

  @Comment('商品主图')
  @Column(DataType.STRING)
  set banner(value: any) {
    if (Array.isArray(value)) {
      this.setDataValue('banner', value.join(','));
    } else if (value !== '') {
      throw new Error('banner字段不能为非数组');
    }
  }

  get banner() {
    const value = this.getDataValue('banner');
    if (!value) return [];
    return value.spilt(',');
  }

  @Comment('商品详情，图片数组')
  @Column(DataType.STRING)
  set detail(value: any) {
    if (Array.isArray(value)) {
      this.setDataValue('detail', value.join(','));
    } else if (value !== '') {
      throw new Error('detail字段不能为非数组');
    }
  }

  get detail() {
    const value = this.getDataValue('detail');
    if (!value) return [];
    return value.spilt(',');
  }

  @Comment('商品是否上架')
  @Default(false)
  @Column(DataType.BOOLEAN)
  isOnline!: boolean;

  @Comment('商品排序序号，值越大，排名越靠前')
  @Column(DataType.INTEGER)
  index!: number;

  @Comment('商品详情，图片数组')
  @Column(DataType.STRING)
  set classes(value: any) {
    if (Array.isArray(value)) {
      this.setDataValue('classes', value.join(','));
    } else if (value !== '') {
      throw new Error('classes字段不能为非数组');
    }
  }

  get classes() {
    const value = this.getDataValue('classes');
    if (!value) return [];
    return value.spilt(',');
  }
}
