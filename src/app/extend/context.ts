
export = {
  success(data: any, msg = 'ok') {
    (this as any).body = {
      code: 200,
      msg,
      data
    }
  },

  getJwtData() {
    const that = (this as any);
    const { app } = that;
    const bearerToken = that.request.header.authorization;

    const token = bearerToken.replace('bearer ', '');
    return app.jwt.decode(token, app.config.jwt.secret);
  }
}
