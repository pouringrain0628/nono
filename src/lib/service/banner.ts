import { provide, inject } from "midway";
import { IBannerModel } from "../model/banner";
import { IIndexOptions, IPagingResult } from "../../banner.interfaces";

@provide()
export class BannerService {
  @inject()
  BannerModel!: IBannerModel;

  async index(options: IIndexOptions): Promise<IPagingResult> {
    const { pageNum, pageSize } = options;
    const offset = (pageNum - 1) * pageSize;

    return this.BannerModel.findAndCountAll({
      offset,
      limit: pageSize,
      order: [['index', 'DESC']]
    })
  }
}
