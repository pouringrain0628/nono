import { provide, inject, controller, Context, get } from "midway";
import { IBannerService } from "../../../banner.interfaces";
import { IClassService } from "../../../class.interfaces";

@provide()
@controller('/api/index/index')
export class IndexController {
  @inject()
  ctx!: Context;

  @inject()
  bannerService!: IBannerService;

  @inject()
  classService!: IClassService;

  @get()
  async index() {
    const options = this.ctx.query;

    const promiseArr: Array<Promise<any>> = [];

    promiseArr.push(this.classService.index(options));
    promiseArr.push(this.bannerService.index(options));

    const [banners, classes] = await Promise.all(promiseArr);

    this.ctx.success({
      banners,
      classes
    })
  }
}
