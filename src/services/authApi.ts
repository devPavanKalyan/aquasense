import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_SERVICE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true // So refresh token in HttpOnly cookie is sent
});

export default authApi;

// export type AuthResponse = {
//   code: number;
//   message: string;
//   data: {
//     status: number;
//     message: "PASSWORD_MODIFIED" | "PASSWORD_NOT_MODIFIED";
//     mfaEnabled?: boolean;
//     mfaType?: string;
//     emailVerified?: boolean;
//     userType?: string;
//     error?: string;
//   };
// };

// type ExistenceResponse = {
//   code: number;
//   collegeId: string;
//   email: string;
//   password_modified: boolean;
// };

export const existence = async (username: string): Promise<any> => {
  const response = await authApi.post(`/check/existence`, {
    username
  });
  return response;
};

export const generate_token = async (object: any): Promise<any | null> => {
  try {
    const response = await authApi.post(`/generate/token`, {
      object
    });

    if (response.status === 200) {
      return response.data || null;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch password token:", error);
    return null;
  }
};

export const validate_token = async (username: string): Promise<boolean> => {
  try {
    const response = await authApi.post(`/token/validate`, {
      username
    });

    if (response.status === 200) {
      return response.data || false;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Failed to validate token:", error);
    return false;
  }
};

export const send_reset_email = async (userId: string): Promise<any | null> => {
  try {
    const response = await authApi.post(`/reset/password/email`, {
      userId
    });

    if (response.status === 200 && response.data) {
      return response.data;
    }

    console.warn("Unexpected response format:", response);
    return null;
  } catch (error: any) {
    console.error(
      "Failed to send reset email:",
      error?.response?.data || error.message
    );
    return null;
  }
};

export const check_password_changed = async (
  userId: string
): Promise<boolean> => {
  try {
    const res = await authApi.get<boolean>(`/check/password/changed`, {
      params: { userId }
    });
    return res.data;
  } catch (error) {
    console.error("Error checking password changed status:", error);
    return false;
  }
};
