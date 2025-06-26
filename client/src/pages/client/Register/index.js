import { Button, Flex, Form, Input, notification } from 'antd';
import { createNewUser } from '../../../services/usersService';
import { useNavigate } from 'react-router-dom';
import { generateRandomString } from '../../../utils/generate';

const rules = [{ required: true, message: 'Please fill in this field!' }]

function Register () {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    const options = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      role: 'CLIENT',
      token: generateRandomString(30),
    }
    const response = await createNewUser(options);
    if(response.code === 200) {
      api['success']({
        message: 'Register successfully!',
        duration: 1.5,
        description:
          'Please login to continue the experience!',
      });
      setTimeout(() => {
        navigate("/login");
      }, 500)
    }
    else {
      api['error']({
        message: 'Register fail!',
        duration: 1.5,
        description: response.message,
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
        <h2>Register</h2>
        <Form
          name="register"
          labelCol={{ span: 4 }}
          // wrapperCol={{ span: 20 }}
          style={{ minWidth: 500 }}
          labelAlign='left'
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
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  )
}

export default Register;