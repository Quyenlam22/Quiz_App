import { Button, Flex, Form, Input, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../../services/usersService';

const rules = [{ required: true, message: 'Please fill in this field!' }]

function ResetPassword () {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  
  const [api, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const response = await resetPassword(values);
    if(response.code === 200) {
      api.success('Reset password successfully!');
      setTimeout(() => {
        navigate("/login");
      }, 500);
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
        <h2>Reset Password</h2>
        <Form
          name="reset-password"
          wrapperCol={{ span: 14 }}
          labelCol={{ span: 10 }}
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
            label="Password"
            name="password"
            rules={rules}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={rules}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label={null}>
            <Button size='large' type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  )
}

export default ResetPassword;