"use client";

import React, { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: { role: string | null; id: string | null };
  accessToken: string | null;
  setAuth: (auth: {
    user: { role: string | null; id: string | null };
    accessToken: string | null;
  }) => void;
  clearAuth: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuthState] = useState(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken: { role: string; sub: string } = jwtDecode(token);
      return {
        user: { role: decodedToken.role, id: decodedToken.sub },
        accessToken: token,
      };
    }
    return { user: { role: null, id: null }, accessToken: null };
  });

  const setAuth = (newAuth: {
    user: { role: string | null; id: string | null };
    accessToken: string | null;
  }) => {
    if (newAuth.accessToken) {
      localStorage.setItem("accessToken", newAuth.accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
    setAuthState(newAuth);
  };

  const clearAuth = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ user: { role: null, id: null }, accessToken: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
