export interface IUserResult {
  id: number;
  openid: string;
}

export interface IUserCreateOption {
  openid: string;
}

export interface ShowPayload {
  id: number;
}


export interface IUserService {
  create(option: IUserCreateOption): Promise<IUserResult>;
  findByOpenid(options: IUserCreateOption): Promise<IUserResult>;
  show(showPayload: ShowPayload): Promise<IUserResult>;
}
