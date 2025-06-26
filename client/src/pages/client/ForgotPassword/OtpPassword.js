import { Button, Flex, Form, Input, notification } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { otpPassword } from '../../../services/usersService';

const rules = [{ required: true, message: 'Please fill in this field!' }]

function OtpPassword () {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  console.log(email);
  
  
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    const response = await otpPassword(values);
    if(response.code === 200) {
      navigate("/user/reset-password", {
        state: {
          email: values.email
        }
      });
    }
 
    else {
      api['error']({
        message: 'Check otp failed!',
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
        <h2>OTP Password</h2>
        <Form
          name="login"
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 4 }}
          initialValues={{email: email}}
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
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="OTP"
            name="otp"
            rules={rules}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button size='large' type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  )
}

export default OtpPassword;