import { useAcceptOrder, useOrderById, useOrders } from "@/pages/app.loader";
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Modal,
  Row,
  Table,
  Image,
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
      {isModalVisible && (
        <Modal
          title="Chi tiết đơn hàng"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Row>
            <Col span={8}>Địa chỉ nhận hàng</Col>
            <Col span={16}>
              <Row justify={"end"}>{dataOrderById?.shipAdress}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={8}>Số điện thoại</Col>
            <Col span={16}>
              <Row justify={"end"}>{dataOrderById?.phone}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={8}>Đơn vị vận chuyển</Col>
            <Col span={16}>
              <Row justify={"end"}>
                {dataOrderById?.shipment?.name +
                  " - " +
                  dataOrderById?.shipment?.address}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row>Danh sách đơn hàng</Row>
              {dataOrderById?.cart?.map((item: any) => {
                return (
                  <Row style={{ marginTop: 20 }}>
                    <Col span={4}>
                      {
                        <Image
                          src={item?.url}
                          preview={false}
                          width={50}
                          style={{ height: 50 }}
                        />
                      }
                    </Col>
                    <Col span={14}>
                      <Row>
                        <Col>{item?.name}</Col>
                      </Row>
                    </Col>
                    <Col span={6}>
                      <Row justify={"end"}>
                        {"$" + item?.price + " x " + item?.quantity}
                      </Row>
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
            <Col span={8}>Phương thức thanh toán</Col>
            <Col span={16}>
              <Row justify={"end"}>{dataOrderById?.payment?.name}</Row>
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};
