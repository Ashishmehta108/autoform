import { create } from "zustand";

type UserState = {
  userId: string;
  email: string;
  image: string;
  setUser: (userId: string, email: string, image: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  userId: "",
  email: "",
  image: "",
  setUser: (userId, email, image) =>
    set(() => ({
      userId,
      email,
      image,
    })),
}));
