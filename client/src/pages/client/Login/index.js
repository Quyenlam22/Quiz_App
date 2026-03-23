import { Button, Checkbox, Flex, Form, Input, message } from 'antd';
import { login } from '../../../services/usersService';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

const rules = [{ required: true, message: 'Please fill in this field!' }];

function Login () {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const [api, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const options = { 
      email: values.email, 
      password: values.password,
      role: "CLIENT"
    };
    
    const response = await login(options);

    if(response.code === 200) {
      // 🔥 lưu cookie
      Cookies.set('id', response.user._id);
      Cookies.set('token', response.user.token);
      Cookies.set('fullName', response.user.fullName);

      // 🔥 trigger UI (thay Redux)
      handleLogin();

      // 🔥 message + flag
      localStorage.setItem("isLogin", true);
      api.success(`Hello ${response.user.fullName}!`);

      navigate("/");
    }
    else {
      api.error(`Email or password is not correct!`);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Flex vertical align='center' justify='center'>
        <h2>Login</h2>

        <Form
          name="login"
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 8 }}
          labelAlign='left'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >

          <Form.Item
            label="Email"
            name="email"
            rules={rules}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={rules}
          >
            <Input.Password placeholder='Enter your password' />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ span: 24 }}
          >
            <Flex justify="space-between" align="center">
              <Checkbox>Remember me</Checkbox>
              <Link to="/user/forgot-password">Forgot password?</Link>
            </Flex>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>

        </Form>

        <div>
          You don't have account?
          <Link to={"/register"}> Register now!</Link>
        </div>
      </Flex>
    </>
  );
}

export default Login;