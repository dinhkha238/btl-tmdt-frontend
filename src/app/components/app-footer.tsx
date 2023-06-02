import { Row, Col, Image, Input, Button } from "antd";
import "../components/app-header.css";
export const AppFooter = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <Row>
            <Image
              preview={false}
              style={{ width: "120%", height: 300 }}
              src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/newsletter-banner-img.jpg"
            />
          </Row>
        </Col>
        <Col span={10} style={{ paddingTop: 10 }}>
          <Row>
            <span className="color-borrow">
              ----------- SUBSCRIBE TO OUR NEWSLETTER
            </span>
          </Row>
          <Row className="font-middle" style={{ paddingTop: 30 }}>
            See The Latest Collection & Get Special Offer
          </Row>
          <Row style={{ marginTop: 30 }}>
            <Col>
              <Input
                placeholder={"Email address"}
                style={{ width: 300 }}
              ></Input>
            </Col>
            <Col>
              <Button
                className="button"
                htmlType="submit"
                style={{ marginLeft: 10, width: 130 }}
              >
                SUBSCRIBE
              </Button>
            </Col>
          </Row>
          <Row>
            <p>Cras interdum lectus velit nibh senectus fringilla ut.</p>
          </Row>
        </Col>
      </Row>
      <Row justify={"center"} className="infor-footer">
        <Col span={7} className="col-footer">
          <Row style={{ paddingBottom: 40 }}>
            <span className="font-normal">H A Y Y A</span>
          </Row>
          <Row>
            <span className="padding-p">
              3538 Torrance Blvd, Torrance, CA 90503, USA
            </span>
          </Row>
          <Row>
            <span className="padding-p">+1 123 456 7890</span>
          </Row>
          <Row>
            <span className="padding-p">info@example.com</span>
          </Row>
          <Row>
            <span className="padding-p">Visit Our Store</span>
          </Row>
        </Col>
        <Col span={4} className="col-footer">
          <Row style={{ paddingBottom: 40 }}>
            <span className="font-normal">Useful Links</span>
          </Row>
          <Row>
            <span className="padding-p">Home</span>
          </Row>
          <Row>
            <span className="padding-p">Products</span>
          </Row>
          <Row>
            <span className="padding-p">Rooms</span>
          </Row>
          <Row>
            <span className="padding-p">About Us</span>
          </Row>
          <Row>
            <span className="padding-p">Contact</span>
          </Row>
        </Col>
        <Col span={4} className="col-footer">
          <Row style={{ paddingBottom: 40 }}>
            <span className="font-normal">Rooms</span>
          </Row>
          <Row>
            <span className="padding-p">Living Room</span>
          </Row>
          <Row>
            <span className="padding-p">Bedroom</span>
          </Row>
          <Row>
            <span className="padding-p">Kitchen</span>
          </Row>
          <Row>
            <span className="padding-p">Bath Room</span>
          </Row>
          <Row>
            <span className="padding-p">Home Office</span>
          </Row>
        </Col>
        <Col span={4} className="col-footer">
          <Row style={{ paddingBottom: 40 }}>
            <span className="font-normal">Stay In Touch</span>
          </Row>
          <Row>
            <span className="padding-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
          </Row>
          <Row>
            <span className="padding-p"></span>
          </Row>
        </Col>
      </Row>
      <Row
        justify={"center"}
        style={{ backgroundColor: "#1a1a1a", color: "#fff" }}
      >
        <Col span={8} className="col-footer-2 ">
          <Row justify={"center"} className="font-min3">
            Copyright © 2023 Online Furniture Store
          </Row>
        </Col>
        <Col span={6}></Col>
        <Col span={8} className="col-footer-2">
          <Row justify={"center"} className="font-min3">
            Powered by Online Furniture Store
          </Row>
        </Col>
      </Row>
    </>
  );
};
