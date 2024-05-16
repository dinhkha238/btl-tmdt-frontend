import { Button, Col, Row, Image, Popover } from "antd";
import "../components/room.css";
import { MinusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useAddToCart, useProducts } from "@/pages/app.loader";
import { ScrollToTop } from "@/app/components/scroll";
import { useNavigate } from "react-router-dom";
export const Room = () => {
  const { data: dataProducts } = useProducts({
    option: "All",
    filter: "",
  });
  const { mutate } = useAddToCart();
  const content = <span>Add to card</span>;
  const navigate = useNavigate();

  return (
    <div className="room-page">
      <ScrollToTop />

      <Col className="room-main">
        <Row justify={"center"}>
          <span className="font-large">Rooms</span>
        </Row>
        <Row justify={"center"}>
          <p style={{ width: 700, textAlign: "center" }} className="font-min2">
            Vestibulum, diam vulputate amet cras in diam quis turpis curabitur
            tellus aliquet tellus iaculis tempus, sollicitudin massa duis
            eleifend egestas turpis sit etiam.
          </p>
        </Row>
        <Row>
          <div className="img-room bgr-living-room">
            <div className="title-room ">
              <Row className="font-middle ">Living Room</Row>
              <Row className="font-min3">
                <p>
                  Massa cras egestas laoreet montes, dapibus eu sit etiam
                  curabitur faucibus habitasse lectus vestibulum leo, odio dolor
                  quis maecenas faucibus vulputate pharetra.
                </p>
              </Row>
              <Row className="select-room ">
                <MinusOutlined className="minus-icon-room" /> Nulla placerat
                viverra
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Cursus viverra
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Vitae interdum eget
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Risus tempus elementum
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Aliquet dignissim
              </Row>

              <Row>
                <Button
                  className="button-room"
                  onClick={() => handleClick("/sanpham")}
                >
                  SHOP LIVING ROOM
                </Button>
              </Row>
            </div>
          </div>
        </Row>
        <div className="product-room">
          <Row justify="center">
            {dataProducts?.slice(3, 7).map((item: any) => {
              return (
                <Col span={6} className="name-product-home">
                  <Row justify={"center"}>
                    <Image
                      preview={false}
                      src={item.url}
                      width={200}
                      style={{ height: 200 }}
                    />
                    <Popover content={content} placement="left">
                      <ShoppingCartOutlined
                        className="icon-add-cart"
                        onClick={handleAddToCart}
                      />
                    </Popover>
                  </Row>
                  <div className="infor-product">
                    <Row justify="center">{item.name}</Row>
                    <Row justify="center" className="color-borrow font">
                      {item.color}
                    </Row>
                    <Row justify="center">${item.price}</Row>
                  </div>
                </Col>
              );
              function handleAddToCart() {
                addToCart(item.id);
              }
            })}
          </Row>
        </div>
        <Row>
          <div className="img-room bgr-bedroom-room ">
            <div className="title-room ">
              <Row className="font-middle ">Bedroom</Row>
              <Row className="font-min3">
                <p>
                  Massa cras egestas laoreet montes, dapibus eu sit etiam
                  curabitur faucibus habitasse lectus vestibulum leo, odio dolor
                  quis maecenas faucibus vulputate pharetra.
                </p>
              </Row>
              <Row className="select-room ">
                <MinusOutlined className="minus-icon-room" /> Nulla placerat
                viverra
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Cursus viverra
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Vitae interdum eget
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Risus tempus elementum
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Aliquet dignissim
              </Row>

              <Row>
                <Button
                  className="button-room"
                  onClick={() => handleClick("/sanpham")}
                >
                  SHOP BEDROOM
                </Button>
              </Row>
            </div>
          </div>
        </Row>
        <div className="product-room">
          <Row justify="center">
            {dataProducts?.slice(2, 6).map((item: any) => {
              return (
                <Col span={6} className="name-product-home">
                  <Row justify={"center"}>
                    <Image
                      preview={false}
                      src={item.url}
                      width={200}
                      style={{ height: 200 }}
                    />
                    <Popover content={content} placement="left">
                      <ShoppingCartOutlined
                        className="icon-add-cart"
                        onClick={handleAddToCart}
                      />
                    </Popover>
                  </Row>
                  <div className="infor-product">
                    <Row justify="center">{item.name}</Row>
                    <Row justify="center" className="color-borrow font">
                      {item.color}
                    </Row>
                    <Row justify="center">${item.price}</Row>
                  </div>
                </Col>
              );
              function handleAddToCart() {
                addToCart(item.id);
              }
            })}
          </Row>
        </div>
        <Row>
          <div className="img-room bgr-kitchen-room">
            <div className="title-room ">
              <Row className="font-middle ">Kitchen</Row>
              <Row className="font-min3">
                <p>
                  Massa cras egestas laoreet montes, dapibus eu sit etiam
                  curabitur faucibus habitasse lectus vestibulum leo, odio dolor
                  quis maecenas faucibus vulputate pharetra.
                </p>
              </Row>
              <Row className="select-room ">
                <MinusOutlined className="minus-icon-room" /> Nulla placerat
                viverra
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Cursus viverra
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Vitae interdum eget
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Risus tempus elementum
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Aliquet dignissim
              </Row>

              <Row>
                <Button
                  className="button-room"
                  onClick={() => handleClick("/sanpham")}
                >
                  SHOP KITCHEN
                </Button>
              </Row>
            </div>
          </div>
        </Row>
        <div className="product-room">
          <Row justify="center">
            {dataProducts?.slice(5, 9).map((item: any) => {
              return (
                <Col span={6} className="name-product-home">
                  <Row justify={"center"}>
                    <Image
                      preview={false}
                      src={item.url}
                      width={200}
                      style={{ height: 200 }}
                    />
                    <Popover content={content} placement="left">
                      <ShoppingCartOutlined
                        className="icon-add-cart"
                        onClick={handleAddToCart}
                      />
                    </Popover>
                  </Row>
                  <div className="infor-product">
                    <Row justify="center">{item.name}</Row>
                    <Row justify="center" className="color-borrow font">
                      {item.color}
                    </Row>
                    <Row justify="center">${item.price}</Row>
                  </div>
                </Col>
              );
              function handleAddToCart() {
                addToCart(item.id);
              }
            })}
          </Row>
        </div>
        <Row>
          <div className="img-room bgr-bathroom-room">
            <div className="title-room ">
              <Row className="font-middle ">Bathroom</Row>
              <Row className="font-min3">
                <p>
                  Massa cras egestas laoreet montes, dapibus eu sit etiam
                  curabitur faucibus habitasse lectus vestibulum leo, odio dolor
                  quis maecenas faucibus vulputate pharetra.
                </p>
              </Row>
              <Row className="select-room ">
                <MinusOutlined className="minus-icon-room" /> Nulla placerat
                viverra
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Cursus viverra
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Vitae interdum eget
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Risus tempus elementum
              </Row>
              <Row className="select-room">
                <MinusOutlined className="minus-icon-room" />
                Aliquet dignissim
              </Row>

              <Row>
                <Button
                  className="button-room"
                  onClick={() => handleClick("/sanpham")}
                >
                  SHOP BATHROOM
                </Button>
              </Row>
            </div>
          </div>
        </Row>
        <div className="product-room">
          <Row justify="center">
            {dataProducts?.slice(0, 4).map((item: any) => {
              return (
                <Col span={6} className="name-product-home">
                  <Row justify={"center"}>
                    <Image
                      preview={false}
                      src={item.url}
                      width={200}
                      style={{ height: 200 }}
                    />
                    <Popover content={content} placement="left">
                      <ShoppingCartOutlined
                        className="icon-add-cart"
                        onClick={handleAddToCart}
                      />
                    </Popover>
                  </Row>
                  <div className="infor-product">
                    <Row justify="center">{item.name}</Row>
                    <Row justify="center" className="color-borrow font">
                      {item.color}
                    </Row>
                    <Row justify="center">${item.price}</Row>
                  </div>
                </Col>
              );
              function handleAddToCart() {
                addToCart(item.id);
              }
            })}
          </Row>
        </div>
      </Col>
    </div>
  );
  function addToCart(value: any) {
    mutate(value);
  }
  function handleClick(key: any) {
    navigate(key);
  }
};
