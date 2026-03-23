import { Button, Flex, Form, Input, message } from "antd";
import { createUser } from "../../../services/usersService";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const rules = [{ required: true, message: "Please fill in this field!" }];

function Register() {
  const navigate = useNavigate();
  const [api, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const res = await createUser({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        role: "user"
      });

      if (res.code === 200) {
        localStorage.setItem("isRegister", true);
        api.success("Register successfully!");
        navigate("/login");
      } else {
        api.error(res.message || "Register failed!");
      }

    } catch {
      api.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}

      <Flex vertical align="center" justify="center">
        <h2>Register</h2>

        <Form
          name="register"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign="left"
          onFinish={onFinish}
        >
          <Form.Item label="Full Name" name="fullName" rules={rules}>
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true },
              { type: "email", message: "Invalid email!" }
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true },
              { min: 6, message: "Min 6 characters!" }
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>

        <Link to="/login">Already have an account?</Link>
      </Flex>
    </>
  );
}

export default Register;