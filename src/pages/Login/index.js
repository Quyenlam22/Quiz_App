import { Button, Checkbox, Form, Input } from 'antd';
import { login } from '../../services/usersService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { checkLogin } from '../../actions/login';

const rules = [{ required: true, message: 'Please fill in this field!' }]

function Login () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { email, password } = values;
    const response = await login(email, password);
    if(response.length > 0) {
      Cookies.set('token', response[0].token);
      Cookies.set('fullName', response[0].fullName);
      dispatch(checkLogin(true));
      navigate("/");
    }
 
    else {
      alert("Error!");
    }
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <h2>Login</h2>
      <Form
        name="login"
        labelCol={{ span: 8 }}
        style={{ maxWidth: 600 }}
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Login;