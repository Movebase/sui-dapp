"use client";

import { AuthBindings } from "@refinedev/core";
import axios from "axios";
import Cookies from "js-cookie";
import { decrypt } from "../../helper/decrypt";

export const authProvider: AuthBindings = {
  login: async ({ email, username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    const res = await axios.post("https://api-easm.zepto.vn/accounts/login", {
      email: email,
      password: password,
    });
    const device = await res.headers?.["x-hash"];
    const decryptedToken: any = decrypt(res.data.token, device);
    const { token, refreshToken } = JSON.parse(decryptedToken);

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
        message: "Invalid username ",
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
