import { useContext, useEffect, useState } from "react";
import { Table, Button, Select, Space, Typography, Popconfirm, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CreateQuestion from "../../../components/Question/CreateQuestion";
import { QuestionContext } from "../../../Context/QuestionContext";
import { TopicContext } from "../../../Context/TopicContext";
import { AppContext } from "../../../Context/AppProvider";

const { Title } = Typography;

function QuestionManagement() {
  const { topics } = useContext(TopicContext);
  const { questions, loading, refreshQuestions, removeQuestion, clearQuestions } = useContext(QuestionContext);
  const { messageApi } = useContext(AppContext);

  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // Dọn dẹp dữ liệu khi rời trang
  useEffect(() => {
    return () => clearQuestions();
  }, [clearQuestions]);

  const handleTopicChange = (value) => {
    setSelectedTopicId(value);
    refreshQuestions(value);
  };

  const handleDelete = async (id) => {
    const res = await removeQuestion(id, selectedTopicId);
    if (res?.code === 200) {
      messageApi.success("Xóa câu hỏi thành công!");
    }
  };

  const columns = [
    {
      title: "Câu hỏi",
      dataIndex: "question",
      width: "45%",
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>
    },
    {
      title: "Đáp án",
      dataIndex: "answers",
      render: (answers, record) => (
        <ul style={{ paddingLeft: 16, margin: 0, fontSize: "13px" }}>
          {answers?.map((ans, idx) => (
            <li key={idx} style={{ 
              color: idx === record.correctAnswer ? "#52c41a" : "inherit", 
              fontWeight: idx === record.correctAnswer ? "bold" : "normal" 
            }}>
              {ans} {idx === record.correctAnswer && " (Đúng)"}
            </li>
          ))}
        </ul>
      )
    },
    {
      title: "Thao tác",
      width: 110,
      align: 'center',
      render: (_, record) => (
        <Space>
          <Tooltip title="Sửa">
            <Button type="text" icon={<EditOutlined />} onClick={() => { setEditingData(record); setIsModalOpen(true); }} />
          </Tooltip>
          <Popconfirm title="Xóa câu hỏi này?" onConfirm={() => handleDelete(record._id)}>
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <Title level={3}>Quản lý câu hỏi</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => { setEditingData(null); setIsModalOpen(true); }}
        >
          Thêm câu hỏi
        </Button>
      </div>

      <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span>Chọn chủ đề:</span>
        <Select 
          placeholder="-- Chọn chủ đề để xem câu hỏi --" 
          style={{ width: 250 }} 
          value={selectedTopicId} // 🔥 Liên kết value với state để đồng bộ
          options={topics?.map(t => ({ label: t.name, value: t._id }))} 
          onChange={handleTopicChange}
          allowClear
          onClear={() => {
            setSelectedTopicId(null);
            clearQuestions();
          }}
        />
      </div>

      <Table 
        rowKey="_id" 
        columns={columns} 
        dataSource={questions} 
        bordered 
        loading={loading}
        pagination={{ pageSize: 8 }} 
        locale={{ 
          emptyText: selectedTopicId 
            ? "Chưa có câu hỏi nào cho chủ đề này" 
            : "Vui lòng chọn một chủ đề phía trên" 
        }}
      />

      <CreateQuestion 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        topics={topics} 
        data={editingData}
        onSuccess={(topicId) => {
          // 🔥 Khi thành công, ép Select chuyển về Topic vừa tác động
          setSelectedTopicId(topicId);
          refreshQuestions(topicId);
          setEditingData(null);
        }}
        onCancel={() => setEditingData(null)}
      />
    </div>
  );
}

export default QuestionManagement;