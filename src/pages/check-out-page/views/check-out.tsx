import {
  useAllPayments,
  useAllShipments,
  useAllVouchers,
  useCreateOrder,
  useDeleteAllToCart,
} from "@/pages/app.loader";
import { Button, Col, Input, Row, Image, Select, message } from "antd";
import "../components/check-out.css";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Shipping {
  id: string;
  name: string;
  address: string;
  fees: number;
}
interface Voucher {
  id: string;
  name: string;
  value: number;
}

export const CheckOut = () => {
  const navigate = useNavigate();
  const { data: dataShipments } = useAllShipments();
  const { data: dataVouchers } = useAllVouchers();
  const { data: dataPayments } = useAllPayments();
  const { mutate: deleteAllCart } = useDeleteAllToCart();
  const [inputAddress, setInputAddress] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputNote, setInputNote] = useState("");
  const { mutate: createOrder } = useCreateOrder();
  const [feeShip, setFeeShip] = useState<Shipping>({
    fees: 0,
    id: "",
    name: "",
    address: "",
  });
  const [voucher, setVoucher] = useState<Voucher>({
    id: "",
    name: "",
    value: 0,
  });
  const [typePayment, setTypePayment] = useState("");
  const dataMyCart = JSON.parse(localStorage.getItem("dataMyCart") || "{}");
  const totalMyCart = dataMyCart
    ?.map((item: any) => item.price * item.quantity)
    .reduce((a: any, b: any) => a + b, 0);
  const handleInputAddress = (event: any) => {
    setInputAddress(event.target.value);
  };
  const handleInputPhone = (event: any) => {
    setInputPhone(event.target.value);
  };
  const handleInputNote = (event: any) => {
    setInputNote(event.target.value);
  };
  const handleChangeShip = (value: string) => {
    const foundElement = dataShipments?.find((item: any) => item.id === value);
    setFeeShip(foundElement);
    console.log(foundElement);
  };
  const handleChangeVoucher = (value: string) => {
    const foundElement = dataVouchers?.find((item: any) => item.id === value);
    console.log(foundElement);
    setVoucher(foundElement);
  };
  const handleChangeTypePayment = (value: any) => {
    setTypePayment(value);
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
            {dataMyCart?.map((item: any) => {
              return (
                <Row className=" border">
                  <Col span={4}>
                    <Image
                      src={item?.url}
                      preview={false}
                      width={100}
                      style={{ height: 100, margin: "10px 0 0 20px" }}
                    />
                  </Col>
                  <Col span={16} style={{ paddingTop: 60, paddingLeft: 10 }}>
                    <Row>
                      <h3>
                        {item.name} x {item.quantity}
                      </h3>
                    </Row>
                  </Col>
                  <Col span={4} style={{ paddingTop: 40 }} pull={1}>
                    <Row justify={"end"} style={{ paddingTop: 10 }}>
                      <h3 style={{ color: "#edb932" }}>
                        ${item.price * item.quantity}
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
                <h3>
                  $
                  {dataMyCart
                    ?.map((item: any) => item.price * item.quantity)
                    .reduce((a: any, b: any) => a + b, 0)
                    .toFixed(2)}
                </h3>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col push={3}>
            <h2>Payment methods</h2>
          </Col>
        </Row>
        <Row justify={"space-between"}>
          <Col span={8} push={3}>
            Shipping unit
          </Col>
          <Col span={5} pull={3}>
            <Row justify={"end"}>
              <Select
                placeholder="Select a shipping unit"
                style={{ width: 250, marginBottom: 10 }}
                onChange={handleChangeShip}
                options={dataShipments?.map((item: any) => {
                  return {
                    value: item.id,
                    label: item.name + " - " + item.address,
                  };
                })}
              />
            </Row>
          </Col>
        </Row>
        <Row justify={"space-between"}>
          <Col span={8} push={3}>
            Voucher
          </Col>
          <Col span={5} pull={3}>
            <Row justify={"end"}>
              <Select
                placeholder="Select a voucher"
                style={{ width: 250, marginBottom: 10 }}
                onChange={handleChangeVoucher}
                options={dataVouchers?.map((item: any) => {
                  return {
                    value: item.id,
                    label: item.name + " - $" + item.value,
                  };
                })}
              />
            </Row>
          </Col>
        </Row>
        <Row justify={"space-between"}>
          <Col span={8} push={3}>
            Payment type
          </Col>
          <Col span={5} pull={3}>
            <Row justify={"end"}>
              <Select
                placeholder="Select a payment type"
                style={{ width: 250 }}
                onChange={handleChangeTypePayment}
                options={dataPayments?.map((item: any) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
              />
            </Row>
          </Col>
        </Row>
        <Row>
          <Col push={3}>
            <h2>Payment details</h2>
          </Col>
        </Row>
        <Row justify={"space-between"}>
          <Col span={1} push={3}>
            Total bill
          </Col>
          <Col span={5} pull={3}>
            <Row justify={"end"}>${totalMyCart.toFixed(2)}</Row>
          </Col>
        </Row>
        <Row justify={"space-between"}>
          <Col span={8} push={3}>
            Total shipping fee
          </Col>
          <Col span={5} pull={3}>
            <Row justify={"end"}>${feeShip?.fees.toFixed(2)}</Row>
          </Col>
        </Row>
        <Row justify={"space-between"}>
          <Col span={8} push={3}>
            Discount on voucher
          </Col>
          <Col span={5} pull={3}>
            <Row justify={"end"}>-${voucher?.value.toFixed(2)}</Row>
          </Col>
        </Row>
        <Row justify={"space-between"}>
          <Col span={8} push={3}>
            <h3>Total payment</h3>
          </Col>
          <Col span={5} pull={3}>
            <Row justify={"end"}>
              <h2>
                ${(feeShip?.fees - voucher?.value + totalMyCart).toFixed(2)}
              </h2>
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
    return `${year}-${month}-${day}`;
  }
  function info() {
    if (inputAddress === "") {
      message.error("Please enter your address");
    } else if (inputPhone === "") {
      message.error("Please enter your phone number");
    } else if (feeShip.id === "") {
      message.error("Please select a shipping unit");
    } else if (voucher.id === "") {
      message.error("Please select a voucher");
    } else if (typePayment === "") {
      message.error("Please select a payment type");
    } else {
      const order = {
        paymentId: typePayment,
        shipmentId: feeShip?.id,
        voucherId: voucher?.id,
        createdAt: formatDate(new Date()),
        shipAdress: inputAddress,
        phone: inputPhone,
      };
      createOrder(order);
      deleteAllCart();
      navigate("/sanpham");
    }
  }
};
