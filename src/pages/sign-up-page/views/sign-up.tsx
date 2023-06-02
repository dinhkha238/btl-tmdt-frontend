import { useMutationRegister } from "@/pages/app.loader";
import { Row, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

export const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutationRegister();
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
          name="user"
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
