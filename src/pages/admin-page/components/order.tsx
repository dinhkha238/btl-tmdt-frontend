import { useAcceptOrder, useOrderById, useOrders } from "@/pages/app.loader";
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

export const Order = () => {
  const [isTime, setIsTime] = useState("all");
  const { data: dataOrder } = useOrders({
    month_year: isTime,
  });
  const [idOrder, setIdOrder] = useState("");
  const { data: dataOrderById } = useOrderById({
    id: idOrder,
  });
  const { mutate: mutateAcceptOrder } = useAcceptOrder();

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
      title: "Tổng tiền",
      dataIndex: "totalOrder",
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
    {
      title: "Trạng thái",
      dataIndex: "payStatus",
      width: 200,
      render: (status: any, data: any) => {
        if (status === 0) {
          return (
            <Button
              onClick={() => {
                mutateAcceptOrder(data?.id);
              }}
            >
              Xác nhận
            </Button>
          );
        } else {
          return <div>Đã thanh toán</div>;
        }
      },
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = (data: any) => {
    setIdOrder(data?.id);
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
          <h2>Orders</h2>
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
        title="Chi tiết đơn hàng"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Row>
          <Col span={24}>
            <Row>Thông tin vận chuyển</Row>
            <Row>
              {dataOrderById?.shipment?.name +
                " - " +
                dataOrderById?.shipment?.address +
                " - " +
                dataOrderById?.shipment?.id}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Row>Địa chỉ nhận hàng</Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Row>Danh sách đơn hàng</Row>
            {dataOrderById?.cart?.map((item: any) => {
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
          <Col span={8}>Tổng tiền hàng</Col>
          <Col span={16}>
            <Row justify={"end"}>
              $
              {dataOrderById?.totalOrder +
                dataOrderById?.voucher?.value -
                dataOrderById?.shipment?.fees}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={8}>Phí vận chuyển</Col>
          <Col span={16}>
            <Row justify={"end"}>${dataOrderById?.shipment?.fees}</Row>
          </Col>
        </Row>
        <Row>
          <Col span={8}>Voucher</Col>
          <Col span={16}>
            <Row justify={"end"}>-${dataOrderById?.voucher?.value}</Row>
          </Col>
        </Row>
        <Row>
          <Col span={8}>Thành tiền</Col>
          <Col span={16}>
            <Row justify={"end"}>${dataOrderById?.totalOrder}</Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Row>Phương thức thanh toán</Row>
            <Row>{dataOrderById?.payment?.name}</Row>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
