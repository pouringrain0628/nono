import { provide, controller, inject, post, Context, plugin, config, get } from "midway";
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

  @post('/login')
  async create(ctx: Context) {
    const { appId: appid, appSecret: secret } = this.weappConfig;

    const WX_URL = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${ctx.request.body.code}&grant_type=authorization_code`;

    const res = await ctx.curl(WX_URL, { method: 'GET', dataType: 'json' });

    console.log(res);

    if (res.data && res.data.openid) {
      let user = await this.userService.findByOpenid(res.data);
      if (!user) {
        user = await this.userService.create({
          openid: res.data.openid,
        });
      }

      const jwtData = {
        id: user.id,
      };

      const token = this.jwt.sign({ user: jwtData }, this.jwtConfig.secret, { expiresIn: '7d' });
      ctx.success({ token });
    } else {
      ctx.throw(403, { message: res.data.errmsg });
    }
  }

  @get('/userInfo')
  async getUserInfo(ctx: Context) {
    const userId = ctx.getJwtData().user.id;
    const userInfo = await this.userService.show({ id: userId });
    ctx.success(userInfo);
  }
}
