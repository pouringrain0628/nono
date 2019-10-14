import { provide, inject } from "midway";
import { IUserModel } from "../model/user";
import { IUserCreateOption, IUserResult, ShowOptions } from "../../user.interfaces";

@provide()
export class UserService {
  @inject()
  UserModel!: IUserModel;

  async create(options: IUserCreateOption): Promise<IUserResult> {
    const user: IUserResult = await this.UserModel.create(options);
    return user;
  }

  async findByOpenid(options: IUserCreateOption): Promise<IUserResult> {
    return this.UserModel.findOne({
      where: {
        openid: options.openid
      },
    });
  }

  async show(showPayload: ShowOptions): Promise<IUserResult> {
    return this.UserModel.findByPk(showPayload.id);
  }
}
