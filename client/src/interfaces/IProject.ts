interface IProject {
  _id: string;
  title: string;
  description: string;
  progress: number;
  assignees: string[];
  deadline: Date;
  created_at: Date;
}

export default IProject;
