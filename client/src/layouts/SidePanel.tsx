import { useState } from "react";
import { LogOut, Menu, Home, Folder, List } from "lucide-react"; // icons (optional)
import SideBarItem from "../components/SideBarItem";

const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`flex flex-col h-screen bg-gray-900 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Top: Logo & Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <span
          className={`text-xl font-bold transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          MyApp
        </span>
        <button onClick={toggleSidebar}>
          <Menu className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Middle: Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        <SideBarItem icon={<Home />} text="Home" isOpen={isOpen} />
        <SideBarItem icon={<Folder />} text="Projects" isOpen={isOpen} />
        <SideBarItem icon={<List />} text="Tasks" isOpen={isOpen} />
      </nav>

      {/* Bottom: User Info and Logout */}
      <div className="p-4 border-t border-gray-700 flex items-center justify-between">
        {isOpen && (
          <div>
            <div className="text-sm font-semibold">John Doe</div>
            <div className="text-xs text-gray-400">john@example.com</div>
          </div>
        )}
        <button className="text-red-400 hover:text-red-300 ml-auto">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
