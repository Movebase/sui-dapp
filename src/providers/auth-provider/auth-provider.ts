"use client";

import { AuthBindings } from "@refinedev/core";
import { jwtDecode } from "jwt-decode";
import { User } from "../../app/users/type";
import { StorageKey } from "../../enum";
import API from "../api";
export const authProvider: AuthBindings = {
  login: async ({ email, username, password, remember, redirectPath }) => {
    // Suppose we actually send a request to the back end here.
    const data = await API.post("auth/login", {
      email: email,
      password: password,
    }).then((res) => res.data);

    const { token, refreshToken } = data;
    if (token) {
      const user: User = await jwtDecode(token);

      localStorage.setItem(StorageKey.TOKEN, token);
      localStorage.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
      localStorage.setItem("role", user.role);

      return {
        success: true,
        redirectTo: redirectPath,
      };
    }
    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username",
      },
    };
  },
  register: async ({ email, password, providerName }) => {
    // You can handle the register process according to your needs.

    // If the process is successful.
    return {
      success: true,
    };

    return {
      success: false,
      error: {
        name: "Register Error",
        message: "Invalid email or password",
      },
    };
  },
  forgotPassword: async ({ email }) => {
    // You can handle the reset password process according to your needs.

    // If process is successful.
    return {
      success: true,
    };

    return {
      success: false,
      error: {
        name: "Forgot Password Error",
        message: "Invalid email or password",
      },
    };
  },
  updatePassword: async ({ password, confirmPassword }) => {
    // You can handle the update password process according to your needs.

    // If the process is successful.
    return {
      success: true,
    };

    return {
      success: false,
      error: {
        name: "Update Password Error",
        message: "Invalid email or password",
      },
    };
  },
  logout: async () => {
    localStorage.clear();
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(StorageKey.TOKEN);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const token = localStorage.getItem(StorageKey.TOKEN);
    if (token) {
      const user: User = await jwtDecode(token);
      return user.role;
    }
    return null;
  },
  getIdentity: async () => {
    const token = localStorage.getItem(StorageKey.TOKEN);
    if (token) {
      const user: User = await jwtDecode(token);
      return user.role;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
