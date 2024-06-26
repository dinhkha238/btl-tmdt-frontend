import { useState } from "react";
import { Layout, Menu, Row, Col } from "antd";
import Sider from "antd/es/layout/Sider";
import { Product } from "../components/product";
import { User } from "../components/user";
import { Navigate, useNavigate } from "react-router-dom";
import { Order } from "../components/order";
import { Cart } from "../components/cart";
import { Statistic } from "../components/statistic";

export const Admin = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("statistics");
  const handleMenuClick = (e: any) => {
    setSelectedMenu(e.key); // Cập nhật trạng thái khi mục SideNav được chọn
  };
  const [isAuthenticated] = useState(localStorage.getItem("loginAdmin"));
  return (
    <>
      {isAuthenticated == "true" ? (
        <Row>
          <Col span={4}>
            <Layout
              style={{ minHeight: "100vh", width: 100, position: "fixed" }}
            >
              <Sider>
                <Menu
                  theme="dark"
                  mode="vertical"
                  defaultSelectedKeys={["statistics"]}
                  onClick={handleMenuClick} //Gọi hàm xử lý khi click vào mục SideNav
                >
                  <Menu.Item key="statistics">Thống kê</Menu.Item>
                  <Menu.Item key="products">Sản phẩm</Menu.Item>
                  <Menu.Item key="users">Người dùng</Menu.Item>
                  <Menu.Item key="orders">Đơn hàng</Menu.Item>
                  <Menu.Item onClick={handleLogout}>Đăng xuất</Menu.Item>
                </Menu>
              </Sider>
            </Layout>
          </Col>
          <Col span={20}>
            {selectedMenu === "products" && <Product />}
            {selectedMenu === "users" && <User />}
            {selectedMenu === "carts" && <Cart />}
            {selectedMenu === "orders" && <Order />}
            {selectedMenu === "statistics" && <Statistic />}
          </Col>
        </Row>
      ) : (
        <Navigate to="/login-admin" />
      )}
    </>
  );
  function handleLogout() {
    localStorage.removeItem("loginAdmin");
    navigate("/login-admin");
  }
};
