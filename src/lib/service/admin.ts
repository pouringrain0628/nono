import { provide, inject, Context } from 'midway';
import { IAdminModel } from '../../lib/model/admin';
import { ILoginOptions, IAdminResult, IRegisterOption } from '../../admin.interfaces';
import * as bcryptjs from 'bcryptjs';

@provide()
export class AdminService {
  @inject()
  AdminModel!: IAdminModel;

  @inject()
  ctx!: Context;

  async login(loginOptions: ILoginOptions) {
    const admin: IAdminResult = this.AdminModel.findOne({
      where: {
        username: loginOptions.username,
      },
    });

    if (!admin) this.ctx.throw(404, '该用户不存在');

    if (bcryptjs.compareSync(loginOptions.password as string, admin.hashedPassword as string)) {
      admin.password = undefined;
      admin.hashedPassword = undefined;
      return admin;
    } else {
      return null;
    }
  }

  async register(registerOption: IRegisterOption) {
    let admin: IAdminResult = this.AdminModel.findOne({
      where: {
        username: registerOption.username,
      },
    });

    if (admin) this.ctx.throw(402, '该用户已存在');

    admin = await this.AdminModel.create(registerOption);
    admin.hashedPassword = '';
    admin.password = '';
    return admin;
  }
}
