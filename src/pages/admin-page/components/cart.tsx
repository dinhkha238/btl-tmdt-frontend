import { useCartById, useCarts } from "@/pages/app.loader";
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Modal,
  Row,
  Table,
} from "antd";
import { useState } from "react";

export const Cart = () => {
  const [isTime, setIsTime] = useState("all");
  const [totalCart, setTotalCart] = useState(0);

  const { data: dataOrder } = useCarts({
    month_year: isTime,
  });
  const [idOrder, setIdOrder] = useState("");
  const { data: dataOrderById } = useCartById({
    id: idOrder,
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "updatedAt",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalCart",
      render: (total: any) => {
        return <div>${total}</div>;
      },
    },
    {
      title: "Xem chi tiết",
      dataIndex: "",
      render: (_: any, data: any) => {
        return (
          <Button onClick={() => handleShowModal(data)}>Xem chi tiết</Button>
        );
      },
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = (data: any) => {
    setIdOrder(data?.id);
    setTotalCart(data?.totalCart);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    setIsTime(dateString);
  };
  return (
    <div>
      <Row justify={"space-between"}>
        <Col>
          <h2>Carts</h2>
        </Col>
        <Col>
          <Col>
            <DatePicker
              onChange={onChange}
              picker="month"
              style={{ margin: 20, marginRight: 40 }}
            />
          </Col>
        </Col>
      </Row>
      <Table dataSource={dataOrder} columns={columns} />;
      <Modal
        title="Chi tiết giỏ hàng"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Row>
          <Col span={24}>
            <Row>Danh sách giỏ hàng</Row>
            {dataOrderById?.map((item: any) => {
              return (
                <Row>
                  <Col span={8}>Image</Col>
                  <Col span={16}>
                    <Row>{item?.name}</Row>
                    <Row justify={"end"}>{"x" + item?.quantity}</Row>
                    <Row justify={"end"}>{"$" + item?.price}</Row>
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
        <Row>
          <Col span={8}>Thành tiền</Col>
          <Col span={16}>
            <Row justify={"end"}>${totalCart}</Row>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
