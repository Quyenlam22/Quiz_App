import { Button, Flex, Form, Input, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { otpPassword } from '../../../services/usersService';

const rules = [{ required: true, message: 'Please fill in this field!' }]

function OtpPassword () {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  
  const [api, contextHolder] = message.useMessage();

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
        <h2>OTP Password</h2>
        <Form
          name="otp-password"
          wrapperCol={{ span: 18 }}
          labelCol={{ span: 6 }}
          initialValues={{email: email}}
          labelAlign='left'
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