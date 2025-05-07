import IUser from "./IUser";

interface IUserState {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser, token: string) => void;
  clearUser: () => void;
}

export default IUserState;
