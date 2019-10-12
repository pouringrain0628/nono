import { provide, inject } from "midway";
import { IUserModel } from "../model/user";
import { IUserCreateOption, IUserResult } from "../../interfaces";

@provide()
export class UserService {
  @inject()
  UserModel!: IUserModel;

  async create(options: IUserCreateOption): Promise<IUserResult> {
    const user: IUserResult = await this.UserModel.create(options);
    return user;
  }

  async findByOpenid(options: IUserCreateOption) {
    return this.UserModel.findOne({
      where: {
        openid: options.openid
      },
    });
  }
}
