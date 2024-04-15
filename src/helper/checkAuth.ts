import { authProvider } from "../providers/auth-provider";

export const checkAuth = () => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  if (!token) {
    return null;
  }

  return {
    authenticated: true,
    redirectTo: "/login",
  };
};
