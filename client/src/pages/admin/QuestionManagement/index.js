import { useState } from "react";
import { Table, Button, Select, Space, Typography, Popconfirm, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CreateQuestion from "../../../components/Question/CreateQuestion";

const { Title } = Typography;

// Mock Data Chủ đề
const MOCK_TOPICS = [
  { value: "t1", label: "Javascript" },
  { value: "t2", label: "HTML/CSS" }
];

// Mock Data Câu hỏi
const MOCK_QUESTIONS = [
  {
    _id: "q1",
    topicId: "t1",
    question: "Từ khóa nào dùng để khai báo biến không thể thay đổi giá trị?",
    answers: ["var", "let", "const", "set"],
    correctAnswer: 2,
    createdAt: "2026-03-26T10:00:00Z"
  },
  {
    _id: "q2",
    topicId: "t1",
    question: "Kết quả của 1 + '1' là gì?",
    answers: ["2", "11", "undefined", "NaN"],
    correctAnswer: 1,
    createdAt: "2026-03-26T11:00:00Z"
  }
];

function QuestionManagement() {
  const [questions, setQuestions] = useState(MOCK_QUESTIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const columns = [
    {
      title: "Câu hỏi",
      dataIndex: "question",
      width: "40%",
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>
    },
    {
      title: "Các đáp án",
      dataIndex: "answers",
      render: (answers, record) => (
        <ul style={{ paddingLeft: 16, margin: 0, fontSize: "13px" }}>
          {answers.map((ans, idx) => (
            <li key={idx} style={{ color: idx === record.correctAnswer ? "#52c41a" : "inherit", fontWeight: idx === record.correctAnswer ? "bold" : "normal" }}>
              {ans} {idx === record.correctAnswer && "(Đúng)"}
            </li>
          ))}
        </ul>
      )
    },
    {
      title: "Thao tác",
      width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="Sửa"><Button type="text" icon={<EditOutlined />} onClick={() => { setEditingData(record); setIsModalOpen(true); }} /></Tooltip>
          <Popconfirm title="Xóa câu hỏi này?"><Button danger type="text" icon={<DeleteOutlined />} /></Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <Title level={3}>Quản lý câu hỏi</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingData(null); setIsModalOpen(true); }}>
          Thêm câu hỏi
        </Button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <span style={{ marginRight: 10 }}>Lọc theo chủ đề:</span>
        <Select placeholder="Chọn chủ đề" style={{ width: 200 }} options={MOCK_TOPICS} allowClear />
      </div>

      <Table 
        rowKey="_id" 
        columns={columns} 
        dataSource={questions} 
        bordered 
        pagination={{ pageSize: 5 }} 
      />

      <CreateQuestion 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        topics={MOCK_TOPICS} 
        data={editingData}
        onCancel={() => setEditingData(null)}
      />
    </div>
  );
}

export default QuestionManagement;