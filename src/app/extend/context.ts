
export = {
  success(data: any, msg = 'ok') {
    (this as any).body = {
      code: 200,
      msg,
      data
    }
  }
}
