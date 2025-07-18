import { create } from "zustand";
import { MainRes } from "../types/api-response";
import { User } from "../schemas/master-data/user.schema";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  clearSession: () => void;
  setSession: (user: User | null) => void;
}

const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isError: false,

  fetchUser: async () => {
    set({ isLoading: true });

    try {
      const res = await fetch("/api/me", { method: "GET" });
      const data: MainRes<User> = await res.json();

      if (!data.success || !data.result) {
        throw new Error("Invalid response from server");
      }

      // const parsed = userModel.safeParse(data.result);

      // if (!parsed.success) {
      //   console.warn("Invalid user shape:", parsed.error.format());
      //   throw new Error("User schema mismatch");
      // }

      set({
        user: data.result,
        isAuthenticated: true,
        isLoading: false,
        isError: false,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isError: true,
      });
    }
  },

  logout: async () => {
    await fetch("/api/logout", { method: "POST" });
    set({ user: null, isAuthenticated: false, isError: false });
  },

  clearSession: () => {
    set({ user: null, isAuthenticated: false, isError: false });
  },

  setSession: (data: User | null) => {
    set({
      user: data,
      isAuthenticated: !!data,
      isLoading: false,
      isError: false,
    });

    console.log("✅ User stored in Zustand:", data);
  },
}));

export default useAuth;
