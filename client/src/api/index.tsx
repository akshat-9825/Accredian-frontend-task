import axios, { AxiosResponse, AxiosError } from "axios";

interface LoginData {
  identifier: string;
  password: string;
}

interface ResponseObject {
  message: string;
}

interface RegistrationData {
  username: string;
  email: string;
  password: string;
}

interface ForgotPasswordData {
  username: string;
  email: string;
  newPassword: string;
}

export interface ResponseType {
  success: boolean;
  message: string;
}

export const handleLogin = async ({
  identifier,
  password,
}: LoginData): Promise<ResponseType> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(identifier);

  try {
    const response: AxiosResponse<ResponseObject> = await axios.post(
      "http://localhost:5001/api/login",
      {
        username: isEmail ? undefined : identifier,
        email: isEmail ? identifier : undefined,
        password: password,
      }
    );
    return { success: true, message: response.data.message };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const handleRegistration = async ({
  username,
  email,
  password,
}: RegistrationData) => {
  await axios
    .post<ResponseObject>("/api/register", { username, email, password })
    .then((response: AxiosResponse<ResponseObject>) => {
      return response.data.message;
    })
    .catch((error: AxiosError) => {
      console.error("Error:", error.response?.data || error.message);
      return error;
    });
};

export const handleForgotPassword = async ({
  username,
  email,
  newPassword,
}: ForgotPasswordData) => {
  await axios
    .post<ResponseObject>("/api/forgotpassword", {
      username,
      email,
      newPassword,
    })
    .then((response: AxiosResponse<ResponseObject>) => {
      return response.data.message;
    })
    .catch((error: AxiosError) => {
      console.error("Error:", error.response?.data || error.message);
      return error;
    });
};
