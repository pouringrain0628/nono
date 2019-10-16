import { provide, controller, inject, Context, plugin, config, get } from "midway";
import { IUserService } from "../../../user.interfaces";

interface WeappConfig {
  appId: string;
  appSecret: string;
}

@provide()
@controller('/api/index/')
export class UserController {
  @inject()
  userService!: IUserService;

  @plugin()
  jwt: any;

  @config('weapp')
  weappConfig!: WeappConfig;

  @config('jwt')
  jwtConfig: any;

  @get('/test1')
  async index(ctx: Context) {
    console.log('test1');
    const userId = ctx.getJwtData().user.id;
    const userInfo = await this.userService.show({ id: userId });
    ctx.success(userInfo);
  }

  @get('/userInfo')
  async getUserInfo2(ctx: Context) {
    console.log('123')
    const userId = ctx.getJwtData().user.id;
    const userInfo = await this.userService.show({ id: userId });
    console.log(userInfo)
    ctx.success(userInfo);
  }

}
