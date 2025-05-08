import { create } from "zustand";
import IUserState from "../interfaces/IUserState";

const useUserStore = create<IUserState>((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => {
    localStorage.setItem("token", token); // ✅ Sync to localStorage
    set({ user, token });
  },
  clearUser: () => {
    localStorage.removeItem("token"); // ✅ Clear token
    set({ user: null, token: null });
  },
}));

export default useUserStore;
