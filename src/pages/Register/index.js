import { Button, Flex, Form, Input, notification } from 'antd';
import { checkExits, register } from '../../services/usersService';
import { useNavigate } from 'react-router-dom';
import { generateRandomString } from '../../utils/generate';

const rules = [{ required: true, message: 'Please fill in this field!' }]

function Register () {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    const checkExitsEmail = await checkExits('email', values.email);

    if(checkExitsEmail.length > 0) {
      api['error']({
        message: 'Email exists!',
        duration: 1.5,
        description:
          'Email already exists in the system!',
      });
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
          description:
            'There was an error during registration!',
        });
      }
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