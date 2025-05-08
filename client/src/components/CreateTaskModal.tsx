import { useEffect, useState } from "react";
import ITask from "../interfaces/ITask";
import useUserStore from "../context/userStore";
import axiosInstance from "../utils/axiosInstance";

interface Props {
  projectId: string;
  onClose: () => void;
  onTaskCreated: (task: ITask) => void;
}

const CreateTaskModal = ({ projectId, onClose, onTaskCreated }: Props) => {
  const backend = import.meta.env.VITE_BACKEND;
  const { user } = useUserStore();

  const [users, setUsers] = useState<{ _id: string; fullname: string }[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignee, setAssignee] = useState("");
  const [asset, setAsset] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`${backend}/user`);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [backend]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("You must be logged in to create a task.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("deadline", deadline);
      formData.append("assignee", assignee);
      formData.append("created_by", user._id);
      formData.append("project", projectId);
      if (asset) {
        formData.append("asset", asset);
      }

      const res = await axiosInstance.post(`${backend}/task`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onTaskCreated(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-bg-semi backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-bg p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-soft-white">Title</label>
            <input
              type="text"
              className="w-full p-2 bg-dark-2 text-white border border-gray-600 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-soft-white">Description</label>
            <textarea
              className="w-full p-2 bg-dark-2 text-white border border-gray-600 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="block mb-1 text-soft-white">Deadline</label>
            <input
              type="date"
              className="w-full p-2 bg-dark-2 text-white border border-gray-600 rounded"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-soft-white">Assignee</label>
            <select
              className="w-full p-2 bg-dark-2 text-white border border-gray-600 rounded"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            >
              {users.map((u) => (
                <option key={u._id} value={u._id} className="text-bg">
                  {u.fullname}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-soft-white">Attach Asset</label>
            <input
              type="file"
              accept="*"
              className="text-white"
              onChange={(e) => setAsset(e.target.files?.[0] || null)}
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-white bg-gray-600 hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue hover:bg-blue-hover text-white rounded"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
