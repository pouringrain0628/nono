import { Context } from 'midway';
function getToken(ctx: Context): string {
  const bearerToken: string = ctx.request.header.authorization;
  if (bearerToken) return bearerToken.replace('Bearer ', '');
  return '';
}

export default function(options: any, app: any) {
  console.log('options:', options);
  console.log('app:', app);

  return async (ctx: Context, next: any) => {
    const token: string = getToken(ctx);
    if (!token) {
      ctx.throw(401, '请先登录');
    }

    try {
      await app.jwt.verify(token, app.config.jwt.secret);
    } catch (e) {
      ctx.logger.error('解析token失败:', e);
      ctx.throw(401, '登录状态已失效');
    }

    next();
  }
}
