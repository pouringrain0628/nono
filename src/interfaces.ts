export interface IUserResult {
  id: number;
  openid: string;
}

export interface IUserCreateOption {
  openid: string;
}

export interface IUserService {
  create(option: IUserCreateOption): Promise<IUserResult>;
  findByOpenid(options: IUserCreateOption): Promise<IUserResult>
}
