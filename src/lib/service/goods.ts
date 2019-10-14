import { provide, inject } from 'midway'
import { IGoodsModel } from '../model/goods'
import { IIndexOptions, IShowOptions } from '../../goods.interfaces';

@provide()
export class GoodsService {
  @inject()
  private GoodsModel!: IGoodsModel;

  async index(indexOptions: IIndexOptions) {
    const { pageNum, pageSize } = indexOptions;
    const offset = (pageNum - 1) * pageSize;
    return this.GoodsModel.findAndCountAll({
      offset,
      limit: pageSize,
      order: [['index', 'DESC']],
    })
  }

  async show(showOptions: IShowOptions) {
    const { id, isOnline } = showOptions;

    const where = {
      id,
    };

    if (isOnline) {
      (where as any).isOnline = true;
    }

    return this.GoodsModel.findOne({
      where,
    });
  }
}
