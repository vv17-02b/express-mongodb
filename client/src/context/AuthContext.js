import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  userId: null,
  email: null,
  role: null,      
  ready: false,     
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});