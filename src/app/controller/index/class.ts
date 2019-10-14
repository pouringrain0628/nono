import { provide, inject, controller, get } from "midway";
import { IClassService } from "../../../class.interfaces";

@provide()
@controller('/api/index/class')
export class ClassController {
  @inject()
  classService!: IClassService;

  @get()
  async index(ctx: any) {
    const { pageSize = 10, pageNum = 1 } = ctx.query;
    const classes = await this.classService.index({ pageSize, pageNum });
    ctx.success(classes);
  }

  @get('/:id')
  async show(ctx: any) {
    const id: number = ctx.params.id;
    const detail = await this.classService.show(id);
    ctx.success(detail);
  }
}
