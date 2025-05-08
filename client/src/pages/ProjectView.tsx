import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IProject from "../interfaces/IProject";
import Loading from "../components/Loading";
import ITask from "../interfaces/ITask";
import CreateTaskModal from "../components/CreateTaskModal";
import axiosInstance from "../utils/axiosInstance";
import { socket } from "../socket";
import TaskList from "../components/TaskList";
import AssigneesList from "../components/AssigneesList";

const ProjectView = () => {
  const backend = import.meta.env.VITE_BACKEND;

  const { id } = useParams();

  const [project, setProject] = useState<IProject | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`${backend}/project/${id}`);
        setProject(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [backend, id]);

  useEffect(() => {
    if (!project) return;
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`${backend}/task/project/${id}`);
        setTasks(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [backend, project, id]);

  // ✅ Real-time update: Listen for new task creation
  useEffect(() => {
    socket.connect();

    socket.on("task:created", (newTask: ITask) => {
      setTasks((prev) => [...prev, newTask]);
    });

    return () => {
      socket.off("task:created");
      socket.disconnect();
    };
  }, []);

  const calculateProgress = (tasks: ITask[]) => {
    const relevantTasks = tasks.filter((task) => task.status !== "canceled");
    const completedTasks = relevantTasks.filter(
      (task) => task.status === "completed"
    );

    if (relevantTasks.length === 0) return 0;

    return Math.round((completedTasks.length / relevantTasks.length) * 100);
  };

  if (loading) return <Loading />;

  if (!project)
    return <main className="p-6 text-center text-red">Project not found.</main>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <div className="mb-4">
          <p className="text-xl text-soft-white mb-2">
            Progress: {calculateProgress(tasks)}%
          </p>
          <div className="w-full h-4 bg-soft-white rounded-full overflow-hidden">
            <div
              className="h-full bg-blue transition-all duration-500"
              style={{ width: `${calculateProgress(tasks)}%` }}
            />
          </div>
        </div>
      </div>

      <p className="text-soft-white mb-4">{project.description}</p>

      <div className="text-sm text-soft-white">
        <p>Created: {new Date(project.createdAt).toLocaleString()}</p>
      </div>

      <div className="flex gap-4 items-center my-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue hover:bg-blue-hover transition-all duration-300 px-4 py-2"
        >
          Add Task
        </button>
      </div>

      <AssigneesList project={project} />

      <TaskList tasks={tasks} />

      {showModal && (
        <CreateTaskModal
          projectId={project._id}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
};

export default ProjectView;
