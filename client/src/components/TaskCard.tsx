import ITask from "../interfaces/ITask";

const TaskCard = ({ task }: { task: ITask }) => {
  const deadlineDate = new Date(task.deadline);
  const now = new Date();
  const timeDiff = deadlineDate.getTime() - now.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const isDeadlineClose = daysLeft <= 2;

  return (
    <div className="bg-dark rounded-lg p-4 shadow-md border border-border">
      <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
      <p className="text-soft-white mb-2">{task.description}</p>

      <div className="flex justify-between items-center text-sm text-font-white">
        <span
          className={`${
            task.status === "completed"
              ? "text-green-500"
              : task.status === "canceled"
              ? "text-gray-400"
              : task.status === "in progress"
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          Status: {task.status}
        </span>

        {task.deadline && (
          <span className={isDeadlineClose ? "text-red-500 font-medium" : ""}>
            Deadline: {deadlineDate.toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
