import {
  ArrowRightOutlined,
  CarOutlined,
  CreditCardOutlined,
  EnvironmentOutlined,
  PercentageOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Image, Popover } from "antd";
import "../components/trang-chu.css";
import { useAddToCart, useProducts } from "@/pages/app.loader";
import { useNavigate } from "react-router-dom";

export const TrangChu = () => {
  const { data: dataProducts } = useProducts({
    option: "All",
    filter: "",
  });
  const navigate = useNavigate();
  const { mutate } = useAddToCart();
  const content = <span>Add to card</span>;

  return (
    <div className="trang-chu">
      <div className="img-home"></div>
      <div className="title-home">
        <span className="name-shop">HAYYA FURNITURE STORE</span>
        <h1 className="color-white font-large">Make Yourself At Home</h1>
        <p className="color-white" style={{ width: 600 }}>
          Vestibulum, diam vulputate amet cras in diam quis turpis curabitur
          tellus aliquet tellus iaculis tempus, sollicitudin massa duis eleifend
          egestas turpis sit etiam commodo viverra lacinia ipsum convallis sed
          augue purus scelerisque non vestibulum elementum mi, pellentesque leo
          tincidunt integer.
        </p>
        <Button className="button" onClick={() => handleClick("/sanpham")}>
          SHOP NOW
        </Button>
      </div>
      <div className="new-collection">
        <Row justify="center" align="top" className="row-collection">
          <Col span={9}>
            <Image src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/new-collection-furniture-img-768x513.jpg" />
          </Col>
          <Col span={9}>
            <div className="collection">
              <span className="color-borrow">----------- NEW COLLECTION</span>
              <h1 className="font-middle">
                A Perfect Set For Your Living Room
              </h1>
              <p className="">
                Massa cras egestas laoreet montes, dapibus eu sit etiam
                curabitur faucibus habitasse lectus vestibulum leo, odio dolor
                quis maecenas faucibus vulputate pharetra nunc sed maecenas diam
                quisque habitasse.
              </p>
              <Button
                className="button"
                onClick={() => handleClick("/sanpham")}
              >
                SHOP THIS COLLECTION
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="product-home">
        <Row justify="center">
          {dataProducts?.slice(0, 4).map((item: any) => {
            return (
              <Col span={5} className="name-product-home">
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
      <div className="list-room">
        <Row justify="center">
          <Col span={6}>
            <Row className="room-home img-1"></Row>
            <Row className="router-room" onClick={() => handleClick("/room")}>
              <Col className="font-normal">Living Room </Col>
              <Col push={3} className="icon-arrow">
                <ArrowRightOutlined className="font-min" />
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row className="room-home img-2"></Row>
            <Row className="router-room" onClick={() => handleClick("/room")}>
              <Col className="font-normal">Bedroom </Col>
              <Col push={3} className="icon-arrow">
                <ArrowRightOutlined className="font-min" />
              </Col>
            </Row>
          </Col>

          <Col span={6}>
            <Row className="room-home img-3"></Row>
            <Row className="router-room" onClick={() => handleClick("/room")}>
              <Col className="font-normal">Kitchen </Col>
              <Col push={3} className="icon-arrow">
                <ArrowRightOutlined className="font-min" />
              </Col>
            </Row>
          </Col>

          <Col span={6}>
            <Row className="room-home img-4"></Row>
            <Row className="router-room" onClick={() => handleClick("/room")}>
              <Col className="font-normal">Bath Room </Col>
              <Col push={3} className="icon-arrow">
                <ArrowRightOutlined className="font-min" />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="best-seller">
        <Row justify="center">
          <Col span={9}>
            <Row>
              <span className="color-borrow">----------- BEST SELLER</span>
            </Row>
            <Row className="font-middle" style={{ paddingTop: 30 }}>
              Discover Our Most Selling Products
            </Row>
          </Col>
          <Col span={9} style={{ paddingTop: 70 }}>
            <Button
              className="button"
              style={{ height: 40, fontSize: 16, marginLeft: 350 }}
              onClick={() => handleClick("/sanpham")}
            >
              VIEW ALL BEST SELLER
            </Button>
          </Col>
        </Row>
      </div>
      <div className="product-home ">
        <Row justify="center">
          {dataProducts?.slice(4, 8).map((item: any) => {
            return (
              <Col span={4} className="name-product-home">
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
        <Row justify="center">
          {dataProducts?.slice(8, 12).map((item: any) => {
            return (
              <Col span={4} className="name-product-home">
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
      <div className="sale-off">
        <Row justify="center">
          <Col span={9}>
            <Row>
              <span className="color-borrow">----------- TESTIMONIALS</span>
            </Row>
            <Row className="font-middle" style={{ paddingTop: 30 }}>
              What People Say
            </Row>
          </Col>
          <Col span={9} style={{ paddingTop: 70 }}>
            <Button
              className="button"
              style={{ height: 40, fontSize: 16, marginLeft: 350 }}
            >
              VIEW ALL TESTIMONIAL
            </Button>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: 70 }}>
          <Col span={4}>
            <Image
              preview={false}
              src={
                "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/woman-with-black-jacket-avatar.jpg"
              }
              className="img-testimonial"
            />
          </Col>
          <Col span={5} style={{ paddingTop: 150, paddingRight: 70 }}>
            <i className="quote-people">
              " Enim, interdum vulputate netus quis sapien malesuada neque, nec
              enim at urna gravida accumsan nunc, mi eu ullamcorper amet commodo
              pulvinar tortor, augue donec placerat "
            </i>
            <h4>Anna Cynthia</h4>
          </Col>
          <Col span={4}>
            <Image
              preview={false}
              src={
                "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/man-wearing-glasses-avatar.jpg"
              }
              className="img-testimonial"
            />
          </Col>
          <Col span={5} style={{ paddingTop: 150, paddingRight: 70 }}>
            <i className="quote-people">
              " Porttitor diam porta eu, id et vestibulum quam vestibulum
              facilisis nulla ornare eu pretium dictum quam pharetra, nisl
              maecenas pretium sed eget interdum auctor et, aliquam sem lectus "
            </i>
            <h4>Jim Taylor</h4>
          </Col>
        </Row>
      </div>
      <div className="choose-us ">
        <Row justify="center">
          <Col span={9}>
            <Row>
              <span className="color-borrow">----------- IF YOU WONDER</span>
            </Row>
            <Row className="font-middle" style={{ paddingTop: 30 }}>
              Why Choose Us
            </Row>
          </Col>
          <Col span={9}></Col>
        </Row>
        <Row justify="center" className="part-why"></Row>
        <Row justify="center" style={{ padding: 80 }}>
          <Col span={5}>
            <Row>
              <PercentageOutlined style={{ fontSize: 50 }} />
            </Row>
            <Row>
              <h5 style={{ fontSize: 19 }}>Big Discounts</h5>
            </Row>
            <Row style={{ fontSize: 18, width: 240 }}>
              Integer euismod blandit nunc sit amet sollicitudin. Fusce quis
              orci viverra, cursus justo.
            </Row>
          </Col>
          <Col span={5}>
            <Row>
              <CarOutlined style={{ fontSize: 50 }} />
            </Row>
            <Row>
              <h5 style={{ fontSize: 19 }}>Free Shipping</h5>
            </Row>
            <Row style={{ fontSize: 18, width: 240 }}>
              Integer euismod blandit nunc sit amet sollicitudin. Fusce quis
              orci viverra, cursus justo.
            </Row>
          </Col>
          <Col span={5}>
            <Row>
              <CreditCardOutlined style={{ fontSize: 50 }} />
            </Row>
            <Row>
              <h5 style={{ fontSize: 19 }}>Secure Payments</h5>
            </Row>
            <Row style={{ fontSize: 18, width: 240 }}>
              Integer euismod blandit nunc sit amet sollicitudin. Fusce quis
              orci viverra, cursus justo.
            </Row>
          </Col>
          <Col span={5}>
            <Row>
              <EnvironmentOutlined style={{ fontSize: 50 }} />
            </Row>
            <Row>
              <h5 style={{ fontSize: 19 }}>Order Tracking</h5>
            </Row>
            <Row style={{ fontSize: 18, width: 240 }}>
              Integer euismod blandit nunc sit amet sollicitudin. Fusce quis
              orci viverra, cursus justo.
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
  function handleClick(key: any) {
    navigate(key);
  }
  function addToCart(value: any) {
    mutate(value);
  }
};
