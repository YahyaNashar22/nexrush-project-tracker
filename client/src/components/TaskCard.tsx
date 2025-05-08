import ITask from "../interfaces/ITask";

interface Props {
  task: ITask;
}

const TaskCard = ({ task }: Props) => {
  return (
    <div className="p-4 bg-dark-2 rounded shadow">
      <h3 className="text-lg font-semibold text-white">{task.title}</h3>
      <p className="text-soft-white mb-1">{task.description}</p>

      {task.deadline && (
        <p className="text-sm text-gray-400 mb-1">
          Deadline: {new Date(task.deadline).toLocaleDateString()}
        </p>
      )}

      {task.assignee && (
        <p className="text-sm text-gray-300">
          Assigned to: {task.assignee.fullname}
        </p>
      )}
    </div>
  );
};

export default TaskCard;
