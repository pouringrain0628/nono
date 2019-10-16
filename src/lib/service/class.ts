import { inject, provide } from "midway";
import { IClassModel } from "../model/class";
import { IIndexOptions, IPagingResult } from "../../class.interfaces";

@provide()
export class ClassService {
  @inject()
  ClassModel!: IClassModel;

  async index(indexOptions: IIndexOptions): Promise<IPagingResult> {
    const { pageSize = 10, pageNum = 1 } = indexOptions;
    const offset = (pageNum - 1) * pageSize;
    return this.ClassModel.findAndCountAll({
      offset,
      limit: pageSize,
      logging: true,
    });
  }

  async show(id: number) {
    return this.ClassModel.findByPk(id);
  }
}
