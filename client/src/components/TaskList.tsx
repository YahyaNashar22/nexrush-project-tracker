// components/TaskList.tsx
import { useState } from "react";
import ITask from "../interfaces/ITask";
import TaskCard from "./TaskCard";

interface Props {
  tasks: ITask[];
}

const statuses = ["all", "pending", "in progress", "completed", "canceled"];

const TaskList: React.FC<Props> = ({ tasks }) => {
  const [filter, setFilter] = useState<string>("all");

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>

      <div className="flex gap-2 mb-6 flex-wrap">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1 rounded-full transition-all duration-200 text-sm ${
              filter === status
                ? "bg-blue text-font-white"
                : "bg-border text-font-white"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-soft-white">No tasks found for "{filter}".</p>
      ) : (
        <ul className="space-y-4 h-96 overflow-auto">
          {filteredTasks.map((task) => (
            <li key={task._id}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
