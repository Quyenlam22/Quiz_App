import { Modal, Form, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { createTopic, updateTopic } from "../../services/topicService";

function CreateTopic({ isModalOpen, setIsModalOpen, onSuccess, data, onCancel }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { messageApi } = useContext(AppContext);
  const isEdit = !!data;

  useEffect(() => {
    if (isModalOpen) {
      if (data) {
        form.setFieldsValue(data);
      } else {
        form.resetFields();
      }
    }
  }, [data, isModalOpen, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      const res = isEdit 
        ? await updateTopic(data._id, values) 
        : await createTopic(values);

      if (res.code === 200) {
        messageApi.success(isEdit ? "Cập nhật chủ đề thành công!" : "Tạo chủ đề mới thành công!");
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
      title={isEdit ? "Chỉnh sửa chủ đề" : "Thêm chủ đề mới"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleClose}
      confirmLoading={loading}
      okText={isEdit ? "Cập nhật" : "Tạo mới"}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item 
          name="name" 
          label="Tên chủ đề" 
          rules={[{ required: true, message: "Vui lòng nhập tên chủ đề!" }]}
        >
          <Input placeholder="Ví dụ: Lập trình Javascript" />
        </Form.Item>

        <Form.Item 
          name="thumbnail" 
          label="Link ảnh (Thumbnail)" 
          rules={[{ required: true, message: "Vui lòng nhập link ảnh đại diện!" }]}
        >
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateTopic;