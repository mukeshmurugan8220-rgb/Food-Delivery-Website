import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("foodieGoUser")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("foodieGoUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("foodieGoUser");
    }
  }, [user]);

  // Register new user
  const signup = (userData) => {
    const users = JSON.parse(
      localStorage.getItem("foodieGoUsers") || "[]"
    );

    const exists = users.find(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (exists) {
      return { success: false, message: "Email already registered!" };
    }

    const updatedUsers = [...users, userData];

    localStorage.setItem("foodieGoUsers", JSON.stringify(updatedUsers));

    setUser({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    });

    return { success: true };
  };

  // Login user
  const login = (email, password) => {
    const users = JSON.parse(
      localStorage.getItem("foodieGoUsers") || "[]"
    );

    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password!",
      };
    }

    setUser({
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone,
    });

    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}