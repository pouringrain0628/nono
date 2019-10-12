import { provide, controller, inject, post, Context, plugin, config } from "midway";
import { IUserService } from "../../../interfaces";

interface WeappConfig {
  appid: string;
  secret: string;
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
    const { appid, secret } = this.weappConfig;
    console.log('appid', appid);
    console.log('jwtConfig', this.jwtConfig);
    const WX_URL = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${ctx.request.body.code}&grant_type=authorization_code`;

    const res = await ctx.curl(WX_URL, { method: 'GET', dataType: 'json' });

    if (res.data && res.data.openid) {
      let user = await this.userService.findByOpenid(res.data.openid);
      if (!user) {
        user = await this.userService.create({
          openid: res.data.openid,
        });
      }

      const jwtData = {
        id: user.id,
      };

      const token = this.jwt.sign({ user: jwtData }, this.jwtConfig.jwt.secret, { expiresIn: '7d' });
      ctx.success({ token });
    } else {
      ctx.throw(403, { message: res.data.errmsg });
    }
  }
}
