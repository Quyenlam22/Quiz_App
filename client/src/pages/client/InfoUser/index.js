import { useEffect, useState } from "react";
import { infoUser, updateInfoUser } from "../../../services/usersService";
import Cookies from 'js-cookie';
import { Button, Flex, Form, Input, message } from "antd";

const rules = [{ required: true, message: 'Please fill in this field!' }];

function InfoUser() {
  const [data, setData] = useState({});
  const [api, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await infoUser(Cookies.get("id"));
      
      if(response.code === 200) {
        setData(response.data);
        form.setFieldsValue(response.data);
      }
      else {
        api.error('Fetch API failed!');
      }
    }

    fetchApi();
  }, [api, form])

  const onFinish = async (values) => {
    const options = {
      ...values,
      id: data._id,
      role: data.role
    }

    const response = await updateInfoUser(options);
    if(response.code === 200) {
      api.success(`Update account information successfully!`);
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
      <Flex justify="center" align="center" vertical="horizontal">
        <h2>Account Information</h2>
        <Form
          name="info-user"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign='left'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={rules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={rules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  )
}

export default InfoUser;