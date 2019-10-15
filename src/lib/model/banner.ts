import { Model, Table, Comment, Column, DataType, BelongsTo, ForeignKey, Default } from 'sequelize-typescript';
import { GoodsModel } from './goods'

@Table({
  freezeTableName: true,
  tableName: 'banners',
})
export class BannerModel extends Model<BannerModel> {
  @ForeignKey(() => GoodsModel)
  @Comment('商品id')
  @Column(DataType.INTEGER)
  goodsId?: number;

  @BelongsTo(() => GoodsModel)
  goods?: GoodsModel;

  @Comment('图片地址')
  @Column(DataType.STRING)
  image?: string;

  @Comment('序号')
  @Default(0)
  @Column(DataType.INTEGER)
  index!: number;
}
