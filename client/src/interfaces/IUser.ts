interface IUser {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  profile_picture: number;
  createdAt: Date;
}

export default IUser;
