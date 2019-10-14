import { inject, provide } from "midway";
import { IClassModel } from "../model/class";
import { IIndexOptions, IClassResult } from "../../class.interfaces";

@provide()
export class ClassService {
  @inject()
  ClassModel!: IClassModel;

  async index(indexOptions: IIndexOptions): Promise<IClassResult> {
    const { pageSize, pageNum } = indexOptions;
    const offset = (pageNum - 1) * pageSize;

    return this.ClassModel.findAndCountAll({
      offset,
      limit: pageSize,
    })
  }

  async show(id: number) {
    return this.ClassModel.findByPk(id);
  }
}
