import { createBrowserRouter } from "react-router-dom";
import {
  AboutUsPath,
  AdminPath,
  CheckOutPath,
  ContactPath,
  LoginAdminPath,
  LoginPath,
  MyOrderPath,
  RoomPath,
  SanPhamPath,
  SignUpPath,
  TrangChuPath,
} from "./pages/router";
import { TrangChu } from "./pages/trang-chu-page/views/trang-chu";
import { SanPham } from "./pages/san-pham-page/components";
import { AppLayout } from "./app/components/app-layout";
import { Contact } from "./pages/contact-page/view/contact";
import { Room } from "./pages/room-page/views/room";
import { AboutUs } from "./pages/about-us-page/views/about-us";
import { Login } from "./pages/login-page/views/login";
import { SignUp } from "./pages/sign-up-page/views/sign-up";
import { Admin } from "./pages/admin-page/views/admin";
import { CheckOut } from "./pages/check-out-page/views/check-out";
import { LayoutAdmin } from "./pages/admin-page/views/login";
import { MyOrder } from "./pages/order-page/views/my-order";

export const routers = createBrowserRouter([
  {
    path: LoginPath,
    element: <Login />,
  },
  {
    path: SignUpPath,
    element: <SignUp />,
  },

  {
    path: AdminPath,
    element: <Admin />,
  },
  {
    path: LoginAdminPath,
    element: <LayoutAdmin />,
  },

  {
    element: <AppLayout />,
    children: [
      {
        path: MyOrderPath,
        element: <MyOrder />,
      },
      {
        path: TrangChuPath,
        element: <TrangChu />,
      },
      {
        path: SanPhamPath,
        element: <SanPham />,
      },
      {
        path: ContactPath,
        element: <Contact />,
      },
      {
        path: RoomPath,
        element: <Room />,
      },
      {
        path: AboutUsPath,
        element: <AboutUs />,
      },
      {
        path: CheckOutPath,
        element: <CheckOut />,
      },
    ],
  },
]);
