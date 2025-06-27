import { Button, Flex, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../../services/usersService';

const rules = [{ required: true, message: 'Please fill in this field!' }]

function ForgotPassword () {
  const navigate = useNavigate();
  const [api, contextHolder] = message.useMessage();

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
      api.error(response.message);
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
          name="forgot-password"
          wrapperCol={{ span: 18 }}
          labelCol={{ span: 6 }}
          labelAlign='left'
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