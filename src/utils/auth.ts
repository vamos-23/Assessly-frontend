import { jwtDecode, type JwtPayload } from "jwt-decode";

type Role = "STUDENT" | "ADMIN";

interface CustomJwtPayload extends JwtPayload {
  role?: Role;
}

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

export const getUserRole = (): Role | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    const role = decoded.role;
    if (role === "ADMIN" || role === "STUDENT") {
      return role;
    }
    return null;
  } catch {
    return null;
  }
};
