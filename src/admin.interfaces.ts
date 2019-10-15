
export interface ILoginOptions {
  username: string;
  password: string;
}

export interface IAdminResult {
  username: string;
  password?: string;
  hashedPassword?: string;
}

export interface IRegisterOption {
  username: string;
  password: string;
}

export interface IAdminService {
  login(loginOptions: ILoginOptions): IAdminResult | null;
  register(registerOptions: IRegisterOption): IAdminResult;
}
