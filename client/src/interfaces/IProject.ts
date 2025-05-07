import IUser from "./IUser";

interface IProject {
  _id: string;
  title: string;
  description: string;
  progress: number;
  assignees: IUser[];
  deadline: Date;
  createdAt: Date;
}

export default IProject;
