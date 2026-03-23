import { useEffect, useState } from "react";
import { infoUser, updateUser } from "../../../services/usersService";
import Cookies from "js-cookie";
import { Button, Flex, Form, Input, message } from "antd";

const rules = [{ required: true, message: "Please fill in this field!" }];

function InfoUser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // 🔥 LOAD USER
  const fetchUser = async () => {
    try {
      const res = await infoUser(Cookies.get("id"));

      if (res.code === 200) {
        setData(res.data);
        form.setFieldsValue(res.data);
      } else {
        api.error("Fetch user failed!");
      }
    } catch {
      api.error("Server error!");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 🔥 UPDATE
  const onFinish = async (values) => {
    try {
      setLoading(true);

      const res = await updateUser({
        id: data._id,
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        role: data.role
      });

      if (res.code === 200) {
        api.success("Update successfully!");
      } else {
        api.error(res.message || "Update failed!");
      }

    } catch {
      api.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}

      <Flex justify="center">
        <div style={{ width: 500 }}>
          <h2>Account Information</h2>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
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
              rules={[
                { required: true },
                { type: "email", message: "Invalid email!" }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="password"
            >
              <Input.Password placeholder="Leave blank if not change" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Update
            </Button>
          </Form>
        </div>
      </Flex>
    </>
  );
}

export default InfoUser;