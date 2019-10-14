export interface IClassResult {
  id: number;
  name: string;
  icon: string;
  children: [];
}

export interface IIndexOptions {
  pageSize: number;
  pageNum: number;
}

export interface IPagingResult {
  count: number;
  rows: Array<IClassResult>;
}
export interface IClassService {
  index(indexOptions: IIndexOptions): Promise<IClassResult>;
  show(id: number): Promise<IPagingResult>;
}
