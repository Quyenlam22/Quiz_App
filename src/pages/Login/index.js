import { Button, Checkbox, Flex, Form, Input, notification } from 'antd';
import { login } from '../../services/usersService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { checkLogin } from '../../actions/login';

const rules = [{ required: true, message: 'Please fill in this field!' }]

function Login () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    const { email, password } = values;
    const response = await login(email, password);
    if(response.length > 0) {
      Cookies.set('id', response[0].id);
      Cookies.set('token', response[0].token);
      Cookies.set('fullName', response[0].fullName);
      dispatch(checkLogin(true));
      api['success']({
        message: 'Login successfully!',
        duration: 1.5,
        description:
          `Hello ${response[0].fullName}!`,
      });
      setTimeout(() => {
        navigate("/");
      }, 500)
    }
 
    else {
      api['error']({
        message: 'Login failed!',
        duration: 1.5,
        description:
          `Email or password is not correct!`,
      });
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
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 4 }}
          labelAlign='left'
          style={{ minWidth: 500 }}
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
          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
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