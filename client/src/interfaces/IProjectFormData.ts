interface IProjectFormData {
  title: string;
  description: string;
  assignees: string[];
  deadline: string;
  thumbnail?: File | null;
}

export default IProjectFormData;
