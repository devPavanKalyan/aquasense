import React, {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useState
} from "react";

export interface User {
  name: string;
  email: string;
  roles: string[];
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

interface AuthContextType {
  authState: AuthState;
  login: (data: {
    access_token: string;
    refresh_token: string;
    user: User;
  }) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  authState: { accessToken: null, refreshToken: null, user: null },
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    user: null
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    let user: User | null = null;
    try {
      user = JSON.parse(localStorage.getItem("user") || "null");
    } catch (error) {
      user = null;
    }

    if (accessToken && refreshToken && user) {
      setAuthState({ accessToken, refreshToken, user });
    }
    setLoading(false);
  }, []);

  const isAuthenticated = !!authState.accessToken;

  const login = useCallback(
    (data: { access_token: string; refresh_token: string; user: User }) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setAuthState({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: data.user
      });
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    setAuthState({ accessToken: null, refreshToken: null, user: null });
  }, []);

  return (
    <AuthContext.Provider
      value={{ authState, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
