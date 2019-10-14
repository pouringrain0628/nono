export interface IGoodsResult {
  id: number;
  name: string;
  price: number;
  banner: [];
  detail: [];
  isOnline: boolean;
  index: number;
  classes: [];
}

export interface IIndexOptions {
  pageSize: number;
  pageNum: number;
  isOnline?: boolean;
}

export interface IPagingResult {
  count: number;
  rows: Array<IGoodsResult>;
}

export interface IShowOptions {
  id: number;
  isOnline: boolean;
}

export interface IGoodsService {
  index(indexOptions: IIndexOptions): Promise<IPagingResult>;
  show(showOptions: IShowOptions): Promise<IGoodsResult>;
}
