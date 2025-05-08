import IProject from "../interfaces/IProject";

const AssigneesList = ({ project }: { project: IProject }) => {
  const no_api_backend = import.meta.env.VITE_SOCKET_BACKEND;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Assignees:</h2>
      <ul className="flex items-center gap-4">
        {project.assignees.map((assignee) => (
          <li key={assignee._id} className="relative group">
            {assignee.profile_picture && (
              <>
                <img
                  src={`${no_api_backend}/images/${assignee.profile_picture}`}
                  alt={assignee.fullname}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue"
                />

                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-bg text-white text-sm rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap pointer-events-none">
                  <p className="font-medium">{assignee.fullname}</p>
                  <p className="text-xs text-soft-white">{assignee.email}</p>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssigneesList;
