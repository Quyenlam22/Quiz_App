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
  const { users, loading, refreshUsers, removeUser, removeManyUsers } = useContext(UserContext);
  const { messageApi } = useContext(AppContext);
  const isFirstRender = useRef(true);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Debounce tìm kiếm
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Bỏ qua lần render đầu vì Provider đã load rồi
    }

    const timeout = setTimeout(() => {
      refreshUsers(`?keyword=${keyword}&role=${roleFilter}`, false);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [keyword, roleFilter, refreshUsers]);

  const filteredData = useMemo(() => users.filter(user => !user.deleted), [users]);

  const handleAdd = () => { setEditingUser(null); setIsModalOpen(true); };
  const handleEdit = (record) => { setEditingUser(record); setIsModalOpen(true); };

  const handleDelete = async (id) => {
    const res = await removeUser(id);
    if (res?.code === 200) messageApi.success("Xóa thành công!");
    else messageApi.error(res?.message || "Lỗi!");
  };

  const handleDeleteSelected = async () => {
    const res = await removeManyUsers(selectedRowKeys);
    if (res?.code === 200) {
      messageApi.success("Đã xóa các mục chọn!");
      setSelectedRowKeys([]);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      render: (text, record) => (
        <div><Text strong>{text}</Text><br /><Text type="secondary" style={{ fontSize: 11 }}>ID: {record._id}</Text></div>
      )
    },
    { title: "Email", dataIndex: "email" },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => <Tag color={role === "admin" ? "volcano" : "blue"}>{role?.toUpperCase()}</Tag>
    },
    { title: "Created At", dataIndex: "createdAt", render: (date) => formatDate(date, 'DD/MM/YYYY HH:mm') },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit"><Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} /></Tooltip>
          <Popconfirm title="Delete?" onConfirm={() => handleDelete(record._id)}><Button danger type="text" icon={<DeleteOutlined />} /></Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Title level={3}>User Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add User</Button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <Input placeholder="Search..." value={keyword} style={{ flex: 1 }} onChange={(e) => setKeyword(e.target.value)} />
        <Select placeholder="Role" style={{ width: 120 }} allowClear onChange={(v) => setRoleFilter(v || "")}>
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
        </Select>
        {selectedRowKeys.length > 0 && (
          <Popconfirm title="Delete selected?" onConfirm={handleDeleteSelected}>
            <Button danger type="primary">Delete ({selectedRowKeys.length})</Button>
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
          onChange: (p, s) => { setCurrentPage(p); setPageSize(s); }
        }}
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
      />

      <CreateUser
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={editingUser}
        onSuccess={() => refreshUsers(`?keyword=${keyword}&role=${roleFilter}`, true)}
        onCancel={() => { setEditingUser(null); setIsModalOpen(false); }}
      />
    </div>
  );
}

export default UserManagement;