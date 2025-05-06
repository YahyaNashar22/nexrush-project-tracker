const SideBarItem = ({
  icon,
  text,
  isOpen,
}: {
  icon: React.ReactNode;
  text: string;
  isOpen: boolean;
}) => (
  <div className="flex items-center space-x-4 p-2 hover:bg-red-hover rounded cursor-pointer transition-all duration-300">
    <div className="text-font-white">{icon}</div>
    {isOpen && <span>{text}</span>}
  </div>
);

export default SideBarItem;
