import { Button, Form, Input } from 'antd';
import { checkExits, register } from '../../services/usersService';
import { useNavigate } from 'react-router-dom';
import { generateRandomString } from '../../utils/generate';

const rules = [{ required: true, message: 'Please fill in this field!' }]

function Register () {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const checkExitsEmail = await checkExits('email', values.email);
    console.log(checkExitsEmail);
    if(checkExitsEmail.length > 0) {
      alert("Email existed!");
    }
    else {
      const options = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        token: generateRandomString(30),
      }
      const response = await register(options);
      if(response) {
        navigate("/login");
      }
      else {
        alert("Register fail!");
      }
    }
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <h2>Register</h2>
      <Form
        name="register"
        labelCol={{ span: 8 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={rules}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Register;