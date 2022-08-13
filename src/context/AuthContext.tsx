import { createContext, PropsWithChildren } from "react";

interface AuthContextType {
  login: (aceessToken: string) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
});

function AuthProvider({ children }: PropsWithChildren) {
  const login = (accessToken: string) => {
    window.localStorage.setItem("access_token", accessToken);
  };
  const logout = () => {
    window.localStorage.removeItem("access_token");
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
