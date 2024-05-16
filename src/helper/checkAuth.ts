import { StorageKey } from "../enum";
import { authProvider } from "../providers/auth-provider";

export const checkAuth = () => {
  const token =
    typeof window !== "undefined" && localStorage.getItem(StorageKey.TOKEN);
  if (!token) {
    return null;
  }

  return {
    authenticated: true,
    redirectTo: "/login",
  };
};
