import {
  AndroidFilled,
  CustomerServiceFilled,
  EnvironmentFilled,
  PhoneFilled,
  TagFilled,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
export const Contact = () => {
  const [form] = Form.useForm();
  return (
    <div className="contact" style={{ width: 1450 }}>
      <Col className="room-main">
        <Row justify={"center"}>
          <span className="font-large">Contact Us</span>
        </Row>
        <Row justify={"center"}>
          <p style={{ width: 700, textAlign: "center" }} className="font-min2">
            Tempus amet, sit erat malesuada lorem purus dictum pretium, posuere
            sagittis ultricies enim massa nisi neque augue in condimentum diam
            commodo ornare.
          </p>
        </Row>

        <Row justify={"center"} style={{ marginTop: 150 }}>
          <Col span={1}>
            <EnvironmentFilled style={{ color: "#edb932", fontSize: 40 }} />
          </Col>
          <Col span={12}>
            <Row>
              <span className="font-min1-1 color-yellow">OUR STORE</span>
            </Row>
            <Row>
              <div
                className="font-min1-2"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                3538 Torrance Blvd, Torrance, CA 90503, USA
              </div>
            </Row>
            <Row style={{ width: 600 }}>
              <span className="font-min2">
                Posuere sagittis ultricies enim massa nisi neque augue in
                condimentum lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar
                dapibus leo.
              </span>
            </Row>
            <Row></Row>
          </Col>
          <Col span={6}>
            <Row className="select-about font-min2 color-yellow">
              <PhoneFilled className="minus-icon-room" /> CALL US
            </Row>
            <div
              style={{ paddingLeft: 28 }}
              className="font-min2-2 border-bottom "
            >
              +1 123 456 7890
            </div>
            <Row className="select-about font-min2 color-yellow ">
              <CustomerServiceFilled className="minus-icon-room" /> SUPPORT
            </Row>
            <div
              style={{ paddingLeft: 28 }}
              className="font-min2-2 border-bottom"
            >
              support@email.com
            </div>
            <Row className="select-about font-min2 color-yellow ">
              <TagFilled className="minus-icon-room" /> SALES
            </Row>
            <div
              style={{ paddingLeft: 28 }}
              className="font-min2-2 border-bottom"
            >
              sales@email.com
            </div>
            <Row className="select-about font-min2 color-yellow ">
              <AndroidFilled className="minus-icon-room" /> COMPLAINTS
            </Row>
            <div style={{ paddingLeft: 28 }} className="font-min2-2 ">
              complaints@email.com
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 100 }} justify={"center"}>
          <Col span={12}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d81362.87375478723!2d-74.08908483743923!3d40.72537110277965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2zVGjDoG5oIHBo4buRIE5ldyBZb3JrLCBUaeG7g3UgYmFuZyBOZXcgWW9yaywgSG9hIEvhu7M!5e0!3m2!1svi!2s!4v1681293799308!5m2!1svi!2s"
              width="650"
              height="450"
              loading="lazy"
              style={{ margin: 50 }}
            ></iframe>
          </Col>
          <Col span={8} className="form-complain">
            <Form form={form} layout="vertical" autoComplete="off">
              <div className="font-middle " style={{ paddingBottom: 20 }}>
                Send Us A Message
              </div>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="message"
                label="Message"
                rules={[
                  { required: true, message: "Please input your message!" },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button
                  className="button"
                  htmlType="submit"
                  style={{ width: 130, height: 40 }}
                >
                  SUBMIT
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </div>
  );
};
