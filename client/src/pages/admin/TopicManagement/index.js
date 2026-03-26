import { useEffect, useState, useRef, useContext } from "react";
import { Table, Space, Button, Tooltip, Typography, Popconfirm, Input, Image } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { formatDate } from "../../../utils/formatTime";
import CreateTopic from "../../../components/Topic/CreateTopic";
import { TopicContext } from "../../../Context/TopicContext";
import { AppContext } from "../../../Context/AppProvider";

const { Title, Text } = Typography;

function TopicManagement() {
  // Lấy dữ liệu và hàm từ Context
  const { topics, loading, refreshTopics, removeTopic } = useContext(TopicContext);
  const { messageApi } = useContext(AppContext);
  
  const isFirstRender = useRef(true);
  const [keyword, setKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  /**
   * 1. MOUNT EFFECT: 
   * Đảm bảo lấy data mới nhất khi vào trang và dọn dẹp khi thoát trang
   */
  useEffect(() => {
    refreshTopics(""); 

    return () => {
      setKeyword("");
      isFirstRender.current = true;
    };
  }, [refreshTopics]);

  /**
   * 2. SEARCH EFFECT: Debounce 500ms
   */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      refreshTopics(`?keyword=${keyword}`, false);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [keyword, refreshTopics]);

  // --- Handlers ---
  const handleAdd = () => { setEditingTopic(null); setIsModalOpen(true); };
  const handleEdit = (record) => { setEditingTopic(record); setIsModalOpen(true); };
  
  const handleDelete = async (id) => {
    const res = await removeTopic(id);
    if (res?.code === 200) {
      messageApi.success("Xóa chủ đề thành công!");
    } else {
      messageApi.error(res?.message || "Lỗi hệ thống!");
    }
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "thumbnail",
      width: 100,
      render: (src) => (
        <Image 
          src={src} 
          width={60} 
          style={{ borderRadius: 4, aspectRatio: '1/1', objectFit: "cover" }} 
          fallback="https://via.placeholder.com/60" 
        />
      )
    },
    {
      title: "Tên chủ đề",
      dataIndex: "name",
      sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 11 }}>Slug: {record.slug}</Text>
        </div>
      )
    },
    { 
      title: "Ngày tạo", 
      dataIndex: "createdAt", 
      render: (date) => formatDate(date, 'DD/MM/YYYY HH:mm') 
    },
    {
      title: "Hành động",
      width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="Sửa">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Popconfirm 
            title="Xóa chủ đề này?" 
            onConfirm={() => handleDelete(record._id)} 
            okText="Xóa" 
            cancelText="Hủy"
          >
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Title level={3}>Quản lý chủ đề</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm chủ đề
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Input 
          placeholder="Tìm kiếm tên chủ đề..." 
          value={keyword} 
          autoComplete="off"
          style={{ maxWidth: 400 }} 
          onChange={(e) => setKeyword(e.target.value)} 
        />
      </div>

      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={topics}
        bordered
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: topics.length,
          showSizeChanger: true,
          onChange: (p, s) => { setCurrentPage(p); setPageSize(s); }
        }}
      />

      <CreateTopic
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={editingTopic}
        onSuccess={() => refreshTopics(`?keyword=${keyword}`, true)}
        onCancel={() => { setEditingTopic(null); setIsModalOpen(false); }}
      />
    </div>
  );
}

export default TopicManagement;