
export = {
  success(data: any, msg = 'ok') {
    (this as any).body = {
      code: 200,
      msg,
      data
    }
  },

  getJwtData() {
    const app = (this as any).app;
    const bearerToken = (this as any).request.header.authorization;

    const token = bearerToken.replace('Bearer ', '');
    return app.jwt.decode(token, app.config.jwt.secret);
  }
}
