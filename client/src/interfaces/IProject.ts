interface IProject {
  _id: string;
  title: string;
  description: string;
  progress: number;
  assignees: string[];
  deadline: Date;
  createdAt: Date;
}

export default IProject;
