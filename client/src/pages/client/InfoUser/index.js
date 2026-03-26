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
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = Cookies.get("id");
        if (!userId) return;

        const res = await infoUser(userId);

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

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]); 

  // 🔥 UPDATE
  const onFinish = async (values) => {
    try {
      if (!data?._id) return;
      
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

      <Flex justify="center" style={{ marginTop: "50px" }}>
        <div style={{ width: 500 }}>
          <h2 style={{ textAlign: "center" }}>Account Information</h2>

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
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true },
                { type: "email", message: "Invalid email!" }
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="password"
            >
              <Input.Password 
                autoComplete="new-password" 
                placeholder="Leave blank if not change" 
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
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