
export class IContext {
  body: {
    code: number;
    msg: string;
    data: any;
  } | undefined;
  success(data: any, msg = 'ok') {
    this.body = {
      code: 200,
      msg,
      data
    }
  }
}
