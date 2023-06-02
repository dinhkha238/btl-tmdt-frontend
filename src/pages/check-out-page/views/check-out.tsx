import {
  useCreateOrder,
  useCustomer,
  useDeleteAllToCart,
} from "@/pages/app.loader";
import { Button, Col, Input, Row, Image } from "antd";
import "../components/check-out.css";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CheckOut = () => {
  const navigate = useNavigate();
  const { data: dataUser, isLoading } = useCustomer();
  const { mutate: deleteAllCart } = useDeleteAllToCart();
  const [inputAddress, setInputAddress] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputNote, setInputNote] = useState("");
  const { mutate: createOrder } = useCreateOrder();
  const handleInputAddress = (event: any) => {
    setInputAddress(event.target.value);
  };
  const handleInputPhone = (event: any) => {
    setInputPhone(event.target.value);
  };
  const handleInputNote = (event: any) => {
    setInputNote(event.target.value);
  };

  return (
    <>
      <Col style={{ marginBottom: 150, marginTop: 50 }}>
        <Row justify={"center"}></Row>
        <Row>
          <Col push={3}>
            <h2>Customer information</h2>
          </Col>
        </Row>
        <Row justify={"space-between"}>
          <Col push={3}>
            <Input
              style={{ width: 530, height: 50 }}
              placeholder="Address"
              size="large"
              value={inputAddress}
              onChange={handleInputAddress}
            />
          </Col>
          <Col pull={3}>
            <Input
              style={{ width: 530, height: 50 }}
              placeholder="Phone"
              size="large"
              value={inputPhone}
              onChange={handleInputPhone}
            />
          </Col>
        </Row>
        <Row>
          <Col push={3}>
            <h2>Your order</h2>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col span={18}>
            <Row justify={"space-between"} className="border">
              <Col push={1}>
                <h3>Product</h3>
              </Col>
              <Col pull={1}>
                <h3>Subtotal</h3>
              </Col>
            </Row>
            {!isLoading &&
              dataUser?.cart?.data?.map((item: any) => {
                return (
                  <Row className=" border">
                    <Col span={4}>
                      <Image src={item.urlImg} preview={false} />
                    </Col>
                    <Col span={16} style={{ paddingTop: 60, paddingLeft: 10 }}>
                      <Row>
                        <h3>
                          {item.color} x {item.count}
                        </h3>
                      </Row>
                    </Col>
                    <Col span={4} style={{ paddingTop: 40 }} pull={1}>
                      <Row justify={"end"} style={{ paddingTop: 10 }}>
                        <h3 style={{ color: "#edb932" }}>
                          ${item.price * item.count}
                        </h3>{" "}
                      </Row>
                    </Col>
                  </Row>
                );
              })}
            <Row justify={"space-between"} className="border">
              <Col push={1}>
                <h3>Total</h3>
              </Col>
              <Col pull={1}>
                <h3>${dataUser?.cart?.total}</h3>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col push={3}>
            <h2>Additional information</h2>
          </Col>
        </Row>
        <Row justify={"space-between"}>
          <Col span={8} push={3}>
            <TextArea
              rows={3}
              placeholder="Notes about your order, e.g. special notes for delivery."
              value={inputNote}
              onChange={handleInputNote}
            />
          </Col>
          <Col pull={4}>
            <Button className="button size-button" onClick={info}>
              PLACE ORDER
            </Button>
          </Col>
        </Row>
      </Col>
    </>
  );
  function formatDate(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  function info() {
    const order = {
      time: formatDate(new Date()),
      id_user: dataUser?.id,
      user: dataUser?.user,
      name: dataUser?.fullname,
      address: inputAddress,
      phone: inputPhone,
      products: dataUser?.cart?.data,
      total: dataUser?.cart?.total,
      note: inputNote,
    };
    createOrder(order);
    deleteAllCart();
    navigate("/sanpham");
  }
};
