import { provide, inject, controller, } from "midway";
import { IBannerService } from "../../../banner.interfaces";
import { IClassService } from "../../../class.interfaces";

@provide()
@controller('/api/index')
export class IndexController {
  @inject()
  bannerService!: IBannerService;

  @inject()
  classService!: IClassService;

  // @get('/index')
  // async index(ctx: Context) {
  //   // const options = ctx.query;
  //   // const { pageSize = 10, pageNum = 1 } = options;

  //   // const promiseArr: Array<Promise<any>> = [];

  //   // promiseArr.push(this.classService.index({ pageSize, pageNum }));
  //   // promiseArr.push(this.bannerService.index({ pageSize, pageNum }));
  //   let banners = null;
  //   let classes = null;

  //   // try {
  //   //   [banners, classes] = await Promise.all(promiseArr);
  //   // } catch (error) {
  //   //   ctx.throw(500, error.msg)
  //   // }

  //   console.log(banners, '123');
  //   console.log(classes);

  //   ctx.success({
  //     banners,
  //     classes
  //   });
  // }
}
