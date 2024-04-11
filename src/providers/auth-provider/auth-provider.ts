"use client";

import { AuthBindings } from "@refinedev/core";
import API from "../api";
export const authProvider: AuthBindings = {
  login: async ({ email, username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    const data = await API.post("auth/login", {
      email: email,
      password: password,
    }).then((res) => res.data);

    const { token, refreshToken } = data;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      return {
        success: true,
        redirectTo: "/",
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
    const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
    if (token) {
      const parsedUser = JSON.parse(token);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsedUser = JSON.parse(token);
      return parsedUser;
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
