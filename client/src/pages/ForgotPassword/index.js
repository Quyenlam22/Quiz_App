import { Button, Flex, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/usersService';

const rules = [{ required: true, message: 'Please fill in this field!' }]

function ForgotPassword () {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    const options = { 
      email: values.email, 
      role: "CLIENT"
    };
    
    const response = await forgotPassword(options);
    
    if(response.code === 200) {
      navigate("/user/otp-password", {
        state: { email: values.email }
      });
    }
 
    else {
      api['error']({
        message: 'Check email failed!',
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
        <h2>Forgot Password</h2>
        <Form
          name="login"
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 4 }}
          labelAlign='left'
          style={{ minWidth: 500 }}
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
          <Form.Item label={null}>
            <Button size='large' type="primary" htmlType="submit">
              Check Email
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  )
}

export default ForgotPassword;