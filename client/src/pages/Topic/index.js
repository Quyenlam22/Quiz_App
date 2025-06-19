import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { getListTopic } from "../../services/topicService";
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    width: 120,
    fixed: 'right'
  },
];

function Topic () {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTopic();
      setData(response);
    }
    fetchApi();
  }, [])

  const dataSource = data.map(item => {
    return {
      key: item.id,
      id: item.id,
      name: item.name,
      actions: (
        <>
          <Button className="button__practice">
            <Link to={`/quiz/${item.id}`}>Practice</Link>
          </Button>
        </>
      )
    }
  })

  return (
    <>
      <h2>List Topics</h2>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default Topic;