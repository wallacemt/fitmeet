import { createContext, useState, useEffect } from "react";
import { getUser } from "@/services/userApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { UserResponse } from "@/types/UserTypes";

export const UserContext = createContext({
  user: null as UserResponse | null,
  login: (_token: string) => {},
  logout: () => {},
  loading: true,
  viewPreferenceModal: true,
  setViewPreferenceModal: "" as any,
  update: false,
  handleUpdate: () => {},
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const [viewPreferenceModal, setViewPreferenceModal] = useState(
    sessionStorage.getItem("viewPreferenceModal") !== "true" ? false : true || true
  );

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
    if (!sessionStorage.getItem("viewPreferenceModal")) {
      sessionStorage.setItem("viewPreferenceModal", "true");
      setViewPreferenceModal(true);
    }
  }, [update]);

  const fetchUserData = async () => {
    try {
      const userData: any = await getUser();
      setUser(userData);
    } catch (error: any) {
      if (error.status == 401) {
        logout();
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string) => {
    Cookies.set("jwtToken", token, { expires: 1, sameSite: "strict" });
    await fetchUserData();
    setTimeout(async () => {}, 3000);
    navigate("/home");
  };

  const logout = () => {
    Cookies.remove("jwtToken");
    setUser(null);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleUpdate = (() => setUpdate(!update));
  return (
    <UserContext.Provider value={{ user, login, logout, loading, viewPreferenceModal, setViewPreferenceModal, update, handleUpdate }}>
      {children}
    </UserContext.Provider>
  );
};
