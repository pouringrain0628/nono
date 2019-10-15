import { IGoodsResult } from "./goods.interfaces";

export interface IBannerResult {
  id: number;
  goodsId: number;
  goods?: IGoodsResult;
  image: string;
  index: number;
}

export interface IPagingResult {
  count: number;
  rows: Array<IBannerResult>;
}

export interface IIndexOptions {
  pageNum: number;
  pageSize: number;
  includeGoods?: boolean;
}

export interface IBannerService {
  index(options: IIndexOptions): Promise<IPagingResult>;
}
