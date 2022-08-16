import { useEffect, createContext, PropsWithChildren, useState } from "react";

interface AuthContextType {
  login: (aceessToken: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  getToken: () => string | null;
}
export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  isLoggedIn: () => false,
  getToken: () => null,
});

function AuthProvider({ children }: PropsWithChildren) {
  const login = (accessToken: string) => {
    window.localStorage.setItem("access_token", accessToken);
  };
  const logout = () => {
    window.localStorage.removeItem("access_token");
  };
  const isLoggedIn = () => {
    if (window.localStorage.getItem("access_token")) {
      return true;
    } else {
      return false;
    }
  };
  const getToken = () => window.localStorage.getItem("access_token");

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
