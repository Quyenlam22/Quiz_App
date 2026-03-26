import { useContext, useEffect, useMemo, useState, useRef } from "react";
import { Table, Tag, Space, Button, Tooltip, Typography, Popconfirm, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import CreateUser from "../../../components/User/CreateUser";
import { UserContext } from "../../../Context/UserContext";
import { AppContext } from "../../../Context/AppProvider";
import { formatDate } from "../../../utils/formatTime";

const { Title, Text } = Typography;
const { Option } = Select;

function UserManagement() {
  // 🔥 Lấy dữ liệu từ Context
  const { users, loading, refreshUsers, removeUser, removeManyUsers } = useContext(UserContext);
  const { messageApi } = useContext(AppContext);
  
  // 🔥 Refs & States
  const isFirstRender = useRef(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  /**
   * 1. MOUNT EFFECT: 
   * Chạy duy nhất 1 lần khi vào trang để đảm bảo dữ liệu luôn mới (Xóa bỏ lưu vết tìm kiếm cũ)
   */
  useEffect(() => {
    // Ép fetch lại toàn bộ danh sách (không lọc) ngay khi vừa vào trang
    refreshUsers(""); 

    return () => {
      // CLEANUP: Reset mọi thông số tìm kiếm khi thoát trang hoặc logout
      setKeyword("");
      setRoleFilter("");
      setSelectedRowKeys([]);
      isFirstRender.current = true; 
    };
  }, [refreshUsers]); // refreshUsers được bọc useCallback trong Provider nên an toàn

  /**
   * 2. DEBOUNCE SEARCH EFFECT:
   * Chỉ chạy từ lần render thứ 2 trở đi khi người dùng nhập liệu
   */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; 
    }

    const timeout = setTimeout(() => {
      refreshUsers(`?keyword=${keyword}&role=${roleFilter}`, false);
      setCurrentPage(1); 
    }, 500);

    return () => clearTimeout(timeout);
  }, [keyword, roleFilter, refreshUsers]);

  const filteredData = useMemo(() => {
    return users.filter(user => !user.deleted);
  }, [users]);

  // --- Handlers ---
  const handleAdd = () => { 
    setEditingUser(null); 
    setIsModalOpen(true); 
  };

  const handleEdit = (record) => { 
    setEditingUser(record); 
    setIsModalOpen(true); 
  };

  const handleDelete = async (id) => {
    const res = await removeUser(id);
    if (res?.code === 200) {
      messageApi.success("Xóa người dùng thành công!");
    } else {
      messageApi.error(res?.message || "Lỗi khi xóa người dùng!");
    }
  };

  const handleDeleteSelected = async () => {
    const res = await removeManyUsers(selectedRowKeys);
    if (res?.code === 200) {
      messageApi.success(`Đã xóa thành công ${selectedRowKeys.length} người dùng!`);
      setSelectedRowKeys([]);
    } else {
      messageApi.error("Xóa nhiều thất bại!");
    }
  };

  // --- Table Columns ---
  const columns = [
    {
      title: "Họ tên",
      dataIndex: "fullName",
      sorter: (a, b) => (a.fullName || "").localeCompare(b.fullName || ""),
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 11 }}>ID: {record._id}</Text>
        </div>
      )
    },
    { title: "Email", dataIndex: "email" },
    {
      title: "Quyền",
      dataIndex: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "volcano" : "blue"}>
          {role?.toUpperCase()}
        </Tag>
      )
    },
    { 
      title: "Ngày tạo", 
      dataIndex: "createdAt", 
      render: (date) => formatDate(date, 'DD/MM/YYYY HH:mm') 
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Tooltip title="Sửa">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Popconfirm 
            title="Bạn có chắc chắn muốn xóa?" 
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
        <Title level={3}>Quản lý người dùng</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm người dùng
        </Button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <Input 
          placeholder="Tìm theo tên hoặc email..." 
          value={keyword} 
          autoComplete="off" 
          style={{ flex: 1 }} 
          onChange={(e) => setKeyword(e.target.value)} 
        />
        
        <Select 
          placeholder="Lọc theo quyền" 
          style={{ width: 160 }} 
          allowClear 
          onChange={(v) => setRoleFilter(v || "")}
        >
          <Option value="admin">Quản trị viên (Admin)</Option>
          <Option value="user">Người dùng (User)</Option>
        </Select>

        {selectedRowKeys.length > 0 && (
          <Popconfirm title="Xóa các mục đã chọn?" onConfirm={handleDeleteSelected}>
            <Button danger type="primary">
              Xóa đã chọn ({selectedRowKeys.length})
            </Button>
          </Popconfirm>
        )}
      </div>

      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={filteredData}
        bordered
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredData.length,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50],
          onChange: (p, s) => { 
            setCurrentPage(p); 
            setPageSize(s); 
          }
        }}
        rowSelection={{ 
          selectedRowKeys, 
          onChange: setSelectedRowKeys 
        }}
        locale={{ emptyText: "Không tìm thấy người dùng nào." }}
      />

      <CreateUser
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={editingUser}
        onSuccess={() => refreshUsers(`?keyword=${keyword}&role=${roleFilter}`, true)}
        onCancel={() => { 
          setEditingUser(null); 
          setIsModalOpen(false); 
        }}
      />
    </div>
  );
}

export default UserManagement;