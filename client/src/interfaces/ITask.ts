import IUser from "./IUser";

interface ITask {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed" | "canceled" | "in progress";
  deadline: string;
  asset?: File | null;
  assignee: IUser;
  created_by: IUser;
  project: string;
}

export default ITask;
