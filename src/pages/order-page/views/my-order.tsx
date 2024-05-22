import { useDeleteOrder, useMyOrders, useOrderById } from "@/pages/app.loader";
import { Alert, Button, Col, Modal, Row, Table, Image, Tag } from "antd";
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
      title: "Trạng thái",
      dataIndex: "payStatus",
      width: 200,
      render: (status: any) => {
        if (status === 0) {
          return (
            <>
              <Tag color="blue">Đang xử lý</Tag>
            </>
          );
        } else if (status === 1) {
          return (
            <>
              <Tag color="green">Đơn hàng đã hoàn thành</Tag>
            </>
          );
        } else {
          return (
            <>
              <Tag color="red">Đã hủy</Tag>
            </>
          );
        }
      },
    },
    {
      title: "Hoạt động",
      dataIndex: "payStatus",
      render: (payStatus: any, dataOrder: any) => {
        if (payStatus === 0) {
          return (
            <Button danger onClick={() => handleShowModalDelete(dataOrder)}>
              Hủy đơn hàng
            </Button>
          );
        } else if (payStatus === 1) {
          return <Button type="primary">Đánh giá</Button>;
        } else {
          return <Button>Mua lại</Button>;
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
  const handleShowModalDelete = (data: any) => {
    setIdSelected(data?.id);
    setIsModalOpen(true);
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
    </div>
  );
};
