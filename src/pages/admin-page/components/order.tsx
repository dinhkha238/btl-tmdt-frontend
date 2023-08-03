import { useOrders } from "@/pages/app.loader";
import { Col, DatePicker, DatePickerProps, Row, Table } from "antd";
import { useState } from "react";

export const Order = () => {
  const [isTime, setIsTime] = useState("all");
  const { data: dataOrder } = useOrders({
    month_year: isTime,
  });
  const columns = [
    {
      title: "Thời gian",
      dataIndex: "time",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
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
      title: "Products",
      dataIndex: "products",
      width: 400,
      render: (cart: any) => {
        return (
          <div>
            {cart?.map((item: any, index: any) => {
              return (
                <div>
                  <Row justify={"space-between"}>
                    <Col span={19}>
                      <b>
                        {index + 1}. {item.color}{" "}
                      </b>
                    </Col>
                    <Col span={5}>
                      ${item.price} x {item.count}
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
        return <div>${total}</div>;
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
    },
  ];

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
    </div>
  );
};
