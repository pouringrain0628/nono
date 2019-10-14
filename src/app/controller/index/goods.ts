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
    payload.isOnline = true;
    const goodsList = await this.goodsService.index(payload);
    ctx.success(goodsList);
  }

  @get('/:id')
  async show(ctx: any) {
    const id = ctx.params.id;
    const goods = await this.goodsService.show({ id, isOnline: true });
    ctx.success(goods);
  }
}
