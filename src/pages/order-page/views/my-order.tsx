import { useOrdersById, useDeleteOrder } from "@/pages/app.loader";
import { DeleteOutlined } from "@ant-design/icons";
import { Alert, Col, Modal, Row, Table } from "antd";
import { useState } from "react";

export const MyOrder = () => {
  const { data: dataOrder } = useOrdersById();
  const [idSelected, setIdSelected] = useState("");
  const { mutate: mutateDeleteOrder } = useDeleteOrder();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOkDelete = () => {
    mutateDeleteOrder(idSelected);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Thời gian",
      dataIndex: "time",
    },

    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Sản phẩm",
      dataIndex: "products",
      width: 400,
      render: (cart: any) => {
        return (
          <div>
            {cart?.map((item: any, index: any) => {
              return (
                <div>
                  <Row>
                    <Col span={14}>
                      <b>
                        {index + 1}. {item.color}{" "}
                      </b>
                    </Col>
                    <Col span={5}>
                      {item.price} x {item.count}
                    </Col>
                  </Row>
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      render: (total: any) => {
        return <div>{total}</div>;
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
    },
    {
      title: "",
      dataIndex: "active",
      render: (_: any, data: any) => {
        return (
          <div>
            <DeleteOutlined style={{ color: "red" }} onClick={handleDelete} />
          </div>
        );

        function handleDelete() {
          setIsModalOpen(true);
          setIdSelected(data._id);
        }
      },
    },
  ];

  return (
    <div>
      <Row justify={"center"}>
        <p style={{ fontSize: 35, fontWeight: 500 }}>Đơn mua</p>
      </Row>
      <Table
        dataSource={dataOrder}
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
    </div>
  );
};
