import { Navigate, Outlet } from "react-router-dom";
import { AppHeader } from "./app-header";
import { AppFooter } from "./app-footer";

export const AppLayout: React.FC = () => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <>
      {isAuthenticated ? (
        <>
          <AppHeader />
          <Outlet />
          <AppFooter />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
