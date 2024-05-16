import { Col, Form, Input, Button, Row, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutationLogin } from "@/pages/app.loader";
export const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate } = useMutationLogin();
  const onFinish = (values: any) => {
    mutate(values);
  };

  return (
    <div className="col-bgr">
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        className="form-complain-login"
      >
        <Row justify={"center"}>
          <div className="font-middle " style={{ paddingBottom: 50 }}>
            Log In
          </div>
        </Row>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input username !" }]}
        >
          <Input style={{ height: 40 }} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input password !" }]}
        >
          <Input.Password style={{ height: 40 }} placeholder="Password" />
        </Form.Item>
        <Row style={{ marginBottom: 30 }}>
          <Col span={8}>
            <Checkbox>Remember</Checkbox>
          </Col>
          <Col span={8} offset={8}>
            <Row justify={"end"}>
              <Row
                style={{
                  padding: 5,
                  color: "#ffb800",
                  fontSize: 17,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => handleClick("/sign-up")}
              >
                Sign Up
              </Row>
            </Row>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Form.Item>
            <Button
              className="button"
              htmlType="submit"
              style={{ width: 100 }}
              size="large"
            >
              LOG IN
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
  function handleClick(key: any) {
    navigate(key);
  }
};
