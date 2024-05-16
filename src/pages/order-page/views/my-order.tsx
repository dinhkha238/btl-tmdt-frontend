import { useDeleteOrder, useMyOrders, useOrderById } from "@/pages/app.loader";
import { Alert, Button, Col, Modal, Row, Table, Image } from "antd";
import { useState } from "react";

export const MyOrder = () => {
  const { data: dataMyOrder } = useMyOrders();
  const [idSelected, setIdSelected] = useState("");
  const { mutate: mutateDeleteOrder } = useDeleteOrder();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idOrder, setIdOrder] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: dataOrderById } = useOrderById({
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
      title: "Hoạt động",
      dataIndex: "payStatus",
      width: 200,
      render: (status: any) => {
        if (status === 0) {
          return <Button>Hủy đơn hàng</Button>;
        } else {
          return <div>Đơn hàng đã được chấp nhận</div>;
        }
      },
    },
  ];
  const handleShowModal = (data: any) => {
    setIdOrder(data?.id);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOkDelete = () => {
    mutateDeleteOrder(idSelected);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Row justify={"center"}>
        <p style={{ fontSize: 35, fontWeight: 500 }}>Đơn mua</p>
      </Row>
      <Table
        dataSource={dataMyOrder}
        columns={columns}
        style={{ minHeight: 500, paddingLeft: 40, paddingRight: 40 }}
      />
      <Modal
        title="Hủy đơn hàng"
        open={isModalOpen}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <Alert
          message={<p>Bạn có chắc chắn muốn hủy đơn hàng không?</p>}
          type="error"
          showIcon
        />
      </Modal>
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
                  <Col span={8}>
                    {
                      <Image
                        src={item?.url}
                        preview={false}
                        width={40}
                        style={{ height: 40, marginTop: 20 }}
                      />
                    }
                  </Col>
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
