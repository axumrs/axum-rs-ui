import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ value, children }) {
  const [auth, setAuth] = useState(value ? { ...value } : null);

  const getAuth = () => {
    console.log("get auth:", auth);
    return auth;
  };

  const clearAuth = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ getAuth, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
