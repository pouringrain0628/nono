import { provide, controller, inject, get } from 'midway'
import { IGoodsService } from '../../../goods.interfaces'

@provide()
@controller('/api/index/goods')
export class GoodsController {
  @inject()
  private goodsService!: IGoodsService;

  @get('/')
  async index(ctx: any) {
    const payload = ctx.query;
    const { pageSize = 10, pageNum = 1 } = payload;
    const goodsList = await this.goodsService.index({ pageSize, pageNum, isOnline: true });
    ctx.success(goodsList);
  }

  @get('/:id')
  async show(ctx: any) {
    const id = ctx.params.id;
    const goods = await this.goodsService.show({ id, isOnline: true });
    ctx.success(goods);
  }
}
