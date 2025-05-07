import { useState } from "react";

const AddNewProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignees: [],
    deadline: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here (e.g., POST to API)
    console.log(formData);
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
          <label className="block text-sm font-medium mb-1">
            Assignees (comma separated IDs or emails)
          </label>
          <input
            name="assignees"
            value={formData.assignees}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-[#3a3a3a] border border-gray-700 focus:outline-none"
          />
        </div>

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
          className="mt-4 px-4 py-2 bg-[#646cff] hover:bg-[#535bf2] text-white font-medium rounded"
        >
          Create Project
        </button>
      </form>
    </main>
  );
};

export default AddNewProject;
