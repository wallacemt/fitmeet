import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { Home } from "./pages/Home";
import { LoadingScreen } from "./components/LoginComponent";
import { ActivityTypePage } from "./pages/ActivityTypePage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { EditUserProfilePage } from "./pages/EditUserProfilePage";

const PrivateRoutes = ({ children }: any) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <LoadingScreen />;
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return children;
};

export const RouterApp = () => {
  const { user, loading } = useContext(UserContext);
  const privateRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/activity/type/:type", element: <ActivityTypePage /> },
    { path: "/profile", element: <UserProfilePage /> },
    { path: "/profile/edit", element: <EditUserProfilePage /> },
  ];

  if (loading) return <LoadingScreen />;
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<PrivateRoutes>{route.element}</PrivateRoutes>} />
      ))}
    </Routes>
  );
};
