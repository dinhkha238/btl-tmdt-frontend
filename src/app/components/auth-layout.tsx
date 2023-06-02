import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => {
  return (
    <div className="app-layout">
      <Outlet />
    </div>
  );
};
