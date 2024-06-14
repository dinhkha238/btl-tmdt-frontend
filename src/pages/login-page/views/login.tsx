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
  const validatePassword = (_: any, value: any) => {
    if (!value) {
      return Promise.reject(new Error("Please input password!"));
    }
    if (value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters long!")
      );
    }
    if (!/[A-Z]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one uppercase letter!")
      );
    }
    if (!/[a-z]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one lowercase letter!")
      );
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one special character!")
      );
    }
    return Promise.resolve();
  };
  const validateGmail = (_: any, value: any) => {
    if (value && value.endsWith("@gmail.com")) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please input gmail!"));
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
        <Form.Item name="username" rules={[{ validator: validateGmail }]}>
          <Input style={{ height: 40 }} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ validator: validatePassword }]}>
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
