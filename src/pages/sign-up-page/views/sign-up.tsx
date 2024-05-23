import { useMutationRegister } from "@/pages/app.loader";
import { Row, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

export const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate } = useMutationRegister();
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
  const validatePhoneNumber = (_: any, value: any) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!value) {
      return Promise.reject(new Error("Please input contact!"));
    }
    if (!phoneRegex.test(value)) {
      return Promise.reject(
        new Error("Please input a valid phone number with exactly 10 digits!")
      );
    }
    return Promise.resolve();
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
          <div className="font-middle " style={{ paddingBottom: 30 }}>
            Sign Up
          </div>
        </Row>
        <Form.Item
          name="fullname"
          rules={[{ required: true, message: "Please input fullname !" }]}
        >
          <Input style={{ height: 40 }} placeholder="Fullname" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input username !" }]}
        >
          <Input style={{ height: 40 }} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ validator: validatePassword }]}>
          <Input.Password style={{ height: 40 }} placeholder="Password" />
        </Form.Item>
        <Form.Item name="contact" rules={[{ validator: validatePhoneNumber }]}>
          <Input style={{ height: 40 }} placeholder="Contact" />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true, message: "Please input address !" }]}
        >
          <Input style={{ height: 40 }} placeholder="Address" />
        </Form.Item>
        <Row justify={"end"} style={{ marginBottom: 30 }}>
          <Row
            style={{
              padding: 5,
              color: "#ffb800",
              fontSize: 18,
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => handleClick("/login")}
          >
            Log In
          </Row>
        </Row>
        <Row justify={"center"}>
          <Form.Item>
            <Button
              className="button"
              htmlType="submit"
              style={{ width: 100 }}
              size="large"
            >
              CREATE
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
