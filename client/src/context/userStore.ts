import { create } from "zustand";

import IUserState from "../interfaces/IUserState";

const useUserStore = create<IUserState>((set) => ({
  user: null,
  token: null,

  setUser: (user, token) => set({ user, token }),

  clearUser: () => set({ user: null, token: null }),
}));

export default useUserStore;
