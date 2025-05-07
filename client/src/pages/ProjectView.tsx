import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IProject from "../interfaces/IProject";
import axios from "axios";
import Loading from "../components/Loading";
import ITask from "../interfaces/ITask";
import CreateTaskModal from "../components/CreateTaskModal";

const ProjectView = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const no_api_backend = import.meta.env.VITE_SOCKET_BACKEND;

  const { id } = useParams();

  const [project, setProject] = useState<IProject | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backend}/project/${id}`);
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
        const res = await axios.get(`${backend}/task/project/${id}`);
        setTasks(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [backend, project, id]);

  if (loading) return <Loading />;

  if (!project)
    return <main className="p-6 text-center text-red">Project not found.</main>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-soft-white mb-4">{project.description}</p>

      <div className="flex gap-4 items-center my-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue hover:bg-blue-hover transition-all duration-300 px-4 py-2"
        >
          Add Task
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Assignees:</h2>
        <ul className="space-y-3">
          {project.assignees.map((assignee) => (
            <li key={assignee._id} className="flex items-center space-x-4">
              {assignee.profile_picture && (
                <img
                  src={`${no_api_backend}/images/${assignee.profile_picture}`}
                  alt={assignee.fullname}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-medium">{assignee.fullname}</p>
                <p className="text-sm text-soft-white">{assignee.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-sm text-soft-white">
        <p>Created: {new Date(project.createdAt).toLocaleString()}</p>
      </div>

      {showModal && (
        <CreateTaskModal
          projectId={project._id}
          onClose={() => setShowModal(false)}
          onTaskCreated={(newTask) => setTasks((prev) => [...prev, newTask])}
        />
      )}
    </main>
  );
};

export default ProjectView;
