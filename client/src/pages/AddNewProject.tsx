import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import IProjectFormData from "../interfaces/IProjectFormData";
import { socket } from "../socket";

const AddNewProject = () => {
  const backend = import.meta.env.VITE_BACKEND;

  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [users, setUsers] = useState<{ _id: string; fullname: string }[]>([]);

  const [formData, setFormData] = useState<IProjectFormData>({
    title: "",
    description: "",
    assignees: [],
    deadline: "",
    thumbnail: null,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios(`${backend}/user`);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [backend]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("deadline", formData.deadline);
      formData.assignees.forEach((id) => payload.append("assignees", id));
      if (formData.thumbnail) {
        payload.append("thumbnail", formData.thumbnail);
      }

      const res = await axios.post(`${backend}/project`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      socket.emit("project:created", res.data);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6 bg-[#2d2d2d] rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-semibold mb-6">Create New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded bg-[#3a3a3a] border border-gray-700 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 rounded bg-[#3a3a3a] border border-gray-700 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setFormData((prev) => ({ ...prev, thumbnail: file }));
            }}
            className="w-full px-3 py-2 rounded bg-[#3a3a3a] border border-gray-700 text-white"
          />
        </div>

        <label className="block mb-2 text-sm font-medium">Assignees</label>
        <select
          multiple
          value={formData.assignees}
          onChange={(e) => {
            const selected = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            setFormData((prev) => ({ ...prev, assignees: selected }));
          }}
          className="w-full p-2 rounded bg-gray-800 text-white"
        >
          {!loading &&
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullname}
              </option>
            ))}
        </select>

        <div>
          <label className="block text-sm font-medium mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded bg-[#3a3a3a] border border-gray-700 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 px-4 py-2 bg-[#646cff] hover:bg-[#535bf2] text-white font-medium rounded"
        >
          Create Project
        </button>
      </form>
    </main>
  );
};

export default AddNewProject;
