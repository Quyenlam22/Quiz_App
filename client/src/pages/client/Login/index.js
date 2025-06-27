import { Button, Checkbox, Flex, Form, Input, message } from 'antd';
import { login } from '../../../services/usersService';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { checkLogin } from '../../../actions/login';

const rules = [{ required: true, message: 'Please fill in this field!' }]

function Login () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const options = { 
      email: values.email, 
      password: values.password,
      role: "CLIENT"
    };
    
    const response = await login(options);
    if(response.code === 200) {
      Cookies.set('id', response.user._id);
      Cookies.set('token', response.user.token);
      Cookies.set('fullName', response.user.fullName);
      dispatch(checkLogin(true));
      api.success(`Hello ${response.user.fullName}!`);
      setTimeout(() => {
        navigate("/");
      }, 500)
    }
 
    else {
      api.error(`Email or password is not correct!`,);
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
            <Button size='large' type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  )
}

export default Login;