import { Modal, Form, Input, Select, Radio, Space, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { createQuestion, updateQuestion } from "../../services/questionService";

const { Text } = Typography;

function CreateQuestion({ isModalOpen, setIsModalOpen, onSuccess, data, onCancel, topics }) {
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
        ? await updateQuestion(data._id, values)
        : await createQuestion(values);

      if (res.code === 200) {
        messageApi.success(isEdit ? "Cập nhật thành công!" : "Thêm câu hỏi thành công!");
        setIsModalOpen(false);
        form.resetFields(); // 🔥 Reset form ngay lập tức
        
        // Trả về topicId cho trang cha để filter lại dữ liệu
        if (onSuccess) onSuccess(values.topicId); 
      } else {
        messageApi.error(res.message || "Có lỗi xảy ra!");
      }
    } catch (err) {
      console.log("Validate Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    if (onCancel) onCancel();
  };

  return (
    <Modal
      title={isEdit ? "Sửa câu hỏi" : "Thêm câu hỏi mới"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      width={700}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item name="topicId" label="Chủ đề" rules={[{ required: true, message: "Vui lòng chọn chủ đề!" }]}>
          <Select 
            placeholder="Chọn chủ đề" 
            options={topics?.map(t => ({ label: t.name, value: t._id }))} 
          />
        </Form.Item>

        <Form.Item name="question" label="Nội dung câu hỏi" rules={[{ required: true, message: "Không để trống câu hỏi!" }]}>
          <Input.TextArea rows={3} placeholder="Nhập nội dung câu hỏi..." />
        </Form.Item>

        <Text strong>Danh sách câu trả lời:</Text>
        <Form.Item name="correctAnswer" label="Chọn đáp án đúng" rules={[{ required: true, message: "Vui lòng chọn đáp án đúng!" }]}>
          <Radio.Group style={{ width: '100%' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              {[0, 1, 2, 3].map((index) => (
                <Space key={index} align="baseline">
                  <Radio value={index}>Đáp án {index + 1}</Radio>
                  <Form.Item 
                    name={['answers', index]} 
                    rules={[{ required: true, message: 'Vui lòng nhập đáp án!' }]}
                    style={{ marginBottom: 12, width: 450 }}
                  >
                    <Input placeholder={`Nội dung đáp án ${index + 1}`} />
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