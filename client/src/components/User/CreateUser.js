import { Select, Modal, Form, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { createUser, updateUser } from "../../services/usersService";

// Sửa lại import Option đúng cách của Ant Design
const { Option } = Select;

function CreateUser({ isModalOpen, setIsModalOpen, onSuccess, data, onCancel }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { messageApi } = useContext(AppContext);
  const isEdit = !!data;

  useEffect(() => {
    if (isModalOpen) {
      if (data) {
        // Khi chỉnh sửa, thường ta xóa password cũ đi để user nhập mới nếu muốn
        const editData = { ...data };
        delete editData.password; 
        form.setFieldsValue(editData);
      } else {
        form.resetFields();
      }
    }
  }, [data, isModalOpen, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      const payload = {
        fullName: values.fullName,
        email: values.email,
        role: values.role,
        // Chỉ gửi password nếu có nhập (đối với Edit) hoặc bắt buộc (đối với Create)
        ...(values.password && { password: values.password })
      };

      const res = isEdit 
        ? await updateUser({ id: data._id, ...payload }) 
        : await createUser(payload);

      if (res.code === 200) {
        messageApi.success(isEdit ? "Cập nhật thành công!" : "Tạo mới thành công!");
        handleClose();
        if (onSuccess) onSuccess();
      } else {
        messageApi.error(res.message || "Có lỗi xảy ra!");
      }
    } catch (err) {
      console.error("Validate Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setIsModalOpen(false);
    if (onCancel) onCancel();
  };

  return (
    <Modal
      title={isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleClose}
      confirmLoading={loading}
      okText={isEdit ? "Cập nhật" : "Tạo mới"}
      destroyOnClose // Khuyên dùng thay vì destroyOnHidden
    >
      <Form form={form} layout="vertical">
        <Form.Item 
          name="fullName" 
          label="Họ tên" 
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
        >
          <Input placeholder="Nguyễn Văn A" />
        </Form.Item>

        <Form.Item 
          name="email" 
          label="Email" 
          rules={[{ required: true }, { type: "email", message: "Email không hợp lệ!" }]}
        >
          <Input disabled={isEdit} placeholder="example@gmail.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label={isEdit ? "Mật khẩu mới (để trống nếu không đổi)" : "Mật khẩu"}
          rules={!isEdit ? [{ required: true, message: "Vui lòng nhập mật khẩu!" }, { min: 6, message: "Tối thiểu 6 ký tự!" }] : []}
        >
          {/* Thêm autoComplete="new-password" để chặn trình duyệt tự điền 123456 */}
          <Input.Password autoComplete="new-password" placeholder="******" />
        </Form.Item>

        <Form.Item name="role" label="Quyền hạn" initialValue="user">
          <Select>
            <Option value="admin">ADMIN</Option>
            <Option value="user">USER</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateUser;