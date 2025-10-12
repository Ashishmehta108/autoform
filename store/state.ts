import { create } from "zustand";

type User = {
  userId: string;
  email: string;
  image: string;
};
type UserState = {
  user: User;

  setUser: (user: User) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: { userId: "", email: "", image: "" },
  setUser: (user: User) =>
    set(() => ({
      user: user,
    })),
}));
