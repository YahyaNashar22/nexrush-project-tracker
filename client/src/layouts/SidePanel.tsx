import { useEffect, useState } from "react";
import { LogOut, Menu, Folder } from "lucide-react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";

import SideBarItem from "../components/SideBarItem";

import logo from "../assets/logo.png";
import IProject from "../interfaces/IProject";
import Loading from "../components/Loading";
import { socket } from "../socket";

const SidePanel = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backend}/project`);
        setProjects(res.data);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          alert(error.response?.data.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [backend]);

  // ✅ Real-time update: Listen for new project creation
  useEffect(() => {
    socket.connect();

    socket.on("project:created", (newProject: IProject) => {
      setProjects((prev) => [newProject, ...prev]);
    });

    return () => {
      socket.off("project:created");
      socket.disconnect();
    };
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={`flex flex-col h-screen bg-bg-btn text-font-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } relative z-10`}
    >
      {/* Top: Logo & Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <span
          onClick={() => navigate("/")}
          className={`text-xl font-bold transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }  rounded-full`}
        >
          <img src={logo} width={60} />
        </span>
        <button onClick={toggleSidebar} className="absolute right-10">
          <Menu className="h-6 w-6 text-font-white" />
        </button>
      </div>

      {/* Middle: Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {loading ? (
          <Loading />
        ) : (
          projects.map((project) => (
            <SideBarItem
              key={project._id}
              icon={<Folder />}
              text={project.title}
              isOpen={isOpen}
            />
          ))
        )}
      </nav>

      <Link
        to="/add-new-project"
        className="text-white text-center bg-blue hover:bg-blue-hover p-2 transition-all duration-300"
      >
        Add New
      </Link>

      {/* Bottom: User Info and Logout */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        {isOpen && (
          <div>
            <div className="text-sm font-semibold">John Doe</div>
            <div className="text-xs text-secondary-grey">john@example.com</div>
          </div>
        )}
        <button className="text-red hover:text-red-hover ml-auto">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
