import { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Spin, Typography } from "antd";
import { UserOutlined, BookOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Pie, Column } from "@ant-design/plots";
import { getStatistic } from "../../../services/dashboardService";

const { Title } = Typography;

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistic = async () => {
      try {
        const res = await getStatistic();
        if (res.code === 200) setData(res.data);
      } catch (error) {
        console.error("Fetch statistic error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistic();
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" tip="Đang tải dữ liệu thống kê..." />
    </div>
  );

  // Biểu đồ tròn: Thống kê lượt làm bài
  const pieConfig = {
    data: data?.answersByTopic || [],
    angleField: 'totalDone',
    colorField: 'topicName',
    radius: 0.8,
    // 🔥 Với v2.x, dùng cấu hình label đơn giản để tránh lỗi position
    label: {
      text: 'totalDone',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        position: 'bottom',
        layout: 'flex',
        justifyContent: 'center',
      },
    },
  };

  // Biểu đồ cột: Số câu hỏi theo chủ đề
  const columnConfig = {
    data: data?.questionsByTopic || [],
    xField: 'topicName',
    yField: 'count',
    // 🔥 Xóa hoàn toàn position: 'middle' để tránh lỗi crash
    label: {
      text: 'count',
      // style thay vì dùng position
      style: {
        textBaseline: 'bottom',
        dy: -2, // Đẩy nhãn lên trên đầu cột một chút
      },
    },
    // Fix lỗi hiển thị trục
    axis: {
      x: { title: 'Chủ đề' },
      y: { title: 'Số lượng' },
    },
    // Style cho cột
    style: {
      fill: '#1890ff',
      maxWidth: 50,
    },
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3} style={{ marginBottom: 24 }}>Tổng quan hệ thống</Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card variant={false} hoverable style={{ borderRadius: 8 }}>
            <Statistic 
              title="Tổng người dùng" 
              value={data?.total?.user || 0} 
              prefix={<UserOutlined style={{ color: '#1890ff' }} />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card variant={false} hoverable style={{ borderRadius: 8 }}>
            <Statistic 
              title="Tổng chủ đề" 
              value={data?.total?.topic || 0} 
              prefix={<BookOutlined style={{ color: '#eb2f96' }} />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card variant={false} hoverable style={{ borderRadius: 8 }}>
            <Statistic 
              title="Tổng câu hỏi" 
              value={data?.total?.question || 0} 
              prefix={<QuestionCircleOutlined style={{ color: '#52c41a' }} />} 
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={10}>
          <Card title="Thống kê lượt làm bài theo chủ đề" variant={false} style={{ borderRadius: 8 }}>
            <div style={{ height: 350 }}>
               <Pie {...pieConfig} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={14}>
          <Card title="Số câu hỏi của từng chủ đề" variant={false} style={{ borderRadius: 8 }}>
            <div style={{ height: 350 }}>
              <Column {...columnConfig} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;