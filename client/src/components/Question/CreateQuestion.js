import { Modal, Form, Input, Select, Radio, Space, message, Typography } from "antd";
import { useEffect, useState } from "react";

const { Text } = Typography;

function CreateQuestion({ isModalOpen, setIsModalOpen, onSuccess, data, onCancel, topics }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      // Logic gọi API
      setTimeout(() => {
        message.success(isEdit ? "Cập nhật thành công!" : "Thêm câu hỏi thành công!");
        setLoading(false);
        setIsModalOpen(false);
        if (onSuccess) onSuccess();
      }, 1000);
    } catch (err) { console.log(err); }
  };

  return (
    <Modal
      title={isEdit ? "Sửa câu hỏi" : "Thêm câu hỏi mới"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={() => { form.resetFields(); setIsModalOpen(false); onCancel(); }}
      confirmLoading={loading}
      width={700}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item name="topicId" label="Chủ đề" rules={[{ required: true }]}>
          <Select placeholder="Chọn chủ đề" options={topics} />
        </Form.Item>

        <Form.Item name="question" label="Nội dung câu hỏi" rules={[{ required: true }]}>
          <Input.TextArea rows={3} placeholder="Nhập câu hỏi..." />
        </Form.Item>

        <Text strong>Danh sách câu trả lời:</Text>
        <Form.Item name="correctAnswer" label="Chọn đáp án đúng" rules={[{ required: true }]}>
          <Radio.Group style={{ width: '100%' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              {[0, 1, 2, 3].map((index) => (
                <Space key={index} align="baseline">
                  <Radio value={index}>Đáp án {index + 1}</Radio>
                  <Form.Item 
                    name={['answers', index]} 
                    rules={[{ required: true, message: 'Không để trống' }]}
                    style={{ marginBottom: 0, width: 450 }}
                  >
                    <Input placeholder={`Nhập nội dung đáp án ${index + 1}`} />
                  </Form.Item>
                </Space>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateQuestion;