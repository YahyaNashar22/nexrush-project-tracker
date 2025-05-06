const SideBarItem = ({
  icon,
  text,
  isOpen,
}: {
  icon: React.ReactNode;
  text: string;
  isOpen: boolean;
}) => (
  <div className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded cursor-pointer">
    <div className="text-white">{icon}</div>
    {isOpen && <span>{text}</span>}
  </div>
);

export default SideBarItem;
