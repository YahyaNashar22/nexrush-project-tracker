import { useNavigate } from "react-router-dom";
import useUserStore from "../context/userStore";
import { LogOut } from "lucide-react";

const AuthButtons = ({ isOpen }: { isOpen: boolean }) => {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();
  return (
    <div className="p-4 border-t border-border flex items-center justify-between">
      {user ? (
        <>
          {isOpen && (
            <div>
              <div className="text-sm font-semibold">{user.fullname}</div>
              <div className="text-xs text-secondary-grey">{user.email}</div>
            </div>
          )}
          <button
            onClick={() => {
              clearUser();
              navigate("/sign-in");
            }}
            className="text-red hover:text-red-hover ml-auto"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </>
      ) : (
        <button
          onClick={() => navigate("/sign-in")}
          className="text-blue hover:underline w-full text-sm text-center"
        >
          {isOpen ? "Sign In" : <LogOut className="h-5 w-5 text-blue" />}
        </button>
      )}
    </div>
  );
};

export default AuthButtons;
