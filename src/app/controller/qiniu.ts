import { provide, controller, get, inject, Context } from "midway";
import { QiniuService } from "../../lib/service/qiniu";

@controller('')
@provide()
export class QinuiController {
  @inject()
  qiniuService!: QiniuService;

  @get('/api/index/upToken')
  @get('/api/admin/upToken')
  async getUpToken(ctx: Context) {
    const token = this.qiniuService.getUpToken;
    ctx.success(token);
  }
}
