import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { IonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";

type AuthContextProviderProps = {
  children: React.ReactNode;
};
interface Token {
  token: string;
}
interface Data {
  data: Token;
}
interface UserData {
  name?: string;
  email: string;
  password: string;
}

interface AuthContextValue {
  loading: boolean;
  isAuthenticated: boolean;
  user: UserData | null;
  userLogin: (formData: UserData) => Promise<void>;
  registerUser: (formData: UserData) => Promise<void>;
  logOut: () => void;
  setLoading: (value: boolean) => void;
  token: string | boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | boolean>(() => {
    const token = localStorage.getItem("token");
    return token ? token : false;
  });
  const [showToast, setShowToast] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_EASYPARK_API_URL}/auth/me`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUser(data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setToken(false);
        localStorage.removeItem("token");
        setShowToast(true);
        setLoading(false);
      }
    };

    token && getUser();
  }, [token]);

  const registerUser = async (formData: UserData) => {
    console.log(formData);
    try {
      setLoading(true);
      const {
        data: { token },
      }: Data = await axios.post(
        `${process.env.REACT_APP_EASYPARK_API_URL}/auth/signup`,
        formData
      );

      setToken(token);
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return alert("InvalidUser");
    }
  };

  const userLogin = async (formData: UserData) => {
    console.log(formData);
    try {
      setLoading(true);
      const {
        data: { token },
      }: Data = await axios.post(
        `${process.env.REACT_APP_EASYPARK_API_URL}/auth/signin`,
        formData
      );
      console.log(token);
      localStorage.setItem("token", token);
      setToken(token);
      setIsAuthenticated(true);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      return alert("InvalidUser");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(false);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextValue = {
    loading,
    isAuthenticated,
    user,
    userLogin,
    registerUser,
    logOut,
    setLoading,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
