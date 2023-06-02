import { Col, Row, Image } from "antd";
import "../components/about.css";
import {
  AndroidOutlined,
  CarOutlined,
  EuroCircleOutlined,
} from "@ant-design/icons";
export const AboutUs = () => {
  return (
    <div className="about-us">
      <Col className="room-main">
        <Row justify={"center"}>
          <span className="font-large">About Us</span>
        </Row>
        <Row justify={"center"}>
          <p style={{ width: 700, textAlign: "center" }} className="font-min2">
            Tempus amet, sit erat malesuada lorem purus dictum pretium, posuere
            sagittis ultricies enim massa nisi neque augue in condimentum diam
            commodo ornare.
          </p>
        </Row>
        <Row justify={"center"} style={{ marginTop: 100 }}>
          <Col span={10} style={{ marginTop: 100 }}>
            <Image
              preview={false}
              src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/furniture-store-about-product-img.jpg"
            />
          </Col>
          <Col span={9}>
            <Row>
              <Image
                preview={false}
                src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/furniture-store-photo-of-founder.jpg"
              />
            </Row>
            <Row style={{ marginTop: 80 }}>
              <i className="font-min2">
                " Eu egestas felis et viverra amet dictum ornare turpis gravida
                orci bibendum odio sit volutpat proin at enim ultrices dolor
                nullam tortor ornare cursus nibh sit adipiscing adipiscing enim
                erat nunc donec tellus, egestas commodo netus adipiscing
                ultrices at phasellus ut vitae nunc malesuada id nec suspen
                disse sit turpis mauris biben dum amet dignissim in sit duis
                pharetra vehicula eget suspen disse at vitae integer gravida
                sagittis. "
              </i>
            </Row>
            <Row>
              <h4>HARVEY D. GEORGE</h4>
            </Row>
            <Row>
              <span>Founder of KAYUU</span>
            </Row>
          </Col>
        </Row>
        <Row justify={"center"} className="statistics">
          <Row justify={"center"} className="data-about">
            <Col span={6}>
              <Row justify={"center"}>
                <span className="font-large"> 1982</span>
              </Row>
              <Row justify={"center"}>
                <div className="font-min2">FOUNDED</div>
              </Row>
            </Col>
            <Col span={6}>
              <Row justify={"center"}>
                <span className="font-large"> 400</span>
              </Row>
              <Row justify={"center"}>
                <div className="font-min2">EMPLOYEE</div>
              </Row>
            </Col>
            <Col span={6}>
              <Row justify={"center"}>
                <span className="font-large"> 1000+</span>
              </Row>
              <Row justify={"center"}>
                <div className="font-min2">PRODUCTS</div>
              </Row>
            </Col>
            <Col span={6}>
              <Row justify={"center"}>
                <span className="font-large"> 5</span>
              </Row>
              <Row justify={"center"}>
                <div className="font-min2">STORES</div>
              </Row>
            </Col>
          </Row>
        </Row>
        <Row justify={"center"} style={{ marginTop: 100 }}>
          <Col span={20}>
            <h3>
              Faucibus etiam lacus sollicitudin sed amet, sit vitae lorem ornare
              egestas nisi, diam cursus non mattis etiam sodales vestibulum arcu
              a, aliquam at leo condimentum etiam dui eget arcu nunc, vivamus
              vel facilisi auctor aliquet eu mollis accumsan fermentum ipsum
              ornare viverra proin eleifend ultricies est, aliquet felis vivamus
              praesent.
            </h3>
          </Col>
        </Row>
        <Row justify={"center"} style={{ marginTop: 0 }}>
          <Col span={10}>
            <p className="font-min2" style={{ width: 500 }}>
              Sit ipsum elit nisl commodo cursus diam massa nunc, commodo amet,
              viverra lobortis aliquam leo vitae in dictum sagittis, dui est
              pellentesque non est nunc aliquet magna malesuada diam nunc quis
              duis id nunc id ultrices cursus lorem consequat tincidunt
              pharetra, risus quam facilisis lectus ipsum ut mattis pretium eros
              tincidunt neque.
            </p>
          </Col>

          <Col span={10}>
            <p className="font-min2" style={{ width: 500 }}>
              Aliquet magna malesuada diam nunc quis duis id nunc id ultrices
              cursus lorem consequat tincidunt pharetra, risus quam facilisis
              lectus ipsum ut mattis pretium eros tincidunt neque, faucibus
              volutpat accumsan pretium arcu in donec et, rhoncus in sed
              eleifend odio gravida vitae quam donec faucibus molestie bibendum.
            </p>
          </Col>
        </Row>
        <div className="new-collection">
          <Row justify="center" align="top" className="row-collection">
            <Col span={10}>
              <div style={{ width: 530 }}>
                <h1 className="font-middle">
                  The Best Quality Furniture Store in Town
                </h1>
                <p className="font-min2">
                  Sagittis enim, auctor ultrices dui etiam viverra nulla
                  scelerisque in semper porttitor pharetra, tortor amet lorem
                  cursus velit posuere tristique tempus, tincidunt non velit
                  quis congue lectus a ullamcorper iaculis.
                </p>
                <Row className="select-about font-min2 ">
                  <AndroidOutlined className="minus-icon-room" /> Huge Selection
                </Row>
                <div style={{ paddingLeft: 28 }}>
                  Sagittis enim, auctor ultrices dui etiam viverra nulla.
                </div>
                <Row className="select-about font-min2 ">
                  <EuroCircleOutlined className="minus-icon-room" /> Low Price
                  Everyday
                </Row>
                <div style={{ paddingLeft: 28 }}>
                  Tincidunt sed eget nunc tellus viverra sapien massa cursus.
                </div>
                <Row className="select-about font-min2 ">
                  <CarOutlined className="minus-icon-room" /> Same Day Delivery
                </Row>
                <div style={{ paddingLeft: 28 }}>
                  Pretium, tempus ultricies lacus eleifend scelerisque sem.
                </div>
              </div>
            </Col>
            <Col span={10}>
              <Image
                preview={false}
                src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/furniture-store-about-store-img.jpg"
              />
            </Col>
          </Row>
        </div>
      </Col>
    </div>
  );
};
