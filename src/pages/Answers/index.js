import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getListAnswersByUserId } from '../../services/answersService';
import Cookies from 'js-cookie';
import { getListTopic } from '../../services/topicService';

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
    title: 'Detail',
    dataIndex: 'detail',
    key: 'detail',
    width: 120,
    fixed: 'right'
  },
];

function Answers () {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const answersByUserId = await getListAnswersByUserId(Cookies.get("id"));
      const topics = await getListTopic();

      let result = [];
      for (let i = 0; i < answersByUserId.length; i++) {
        result.push({
          ...topics.find(item => item.id == answersByUserId[i].topicId),
          ...answersByUserId[i]
        })
      }
      setData(result.reverse());
    }
    fetchApi();
  }, [])

  const dataSource = data.map(item => {
    return {
      key: item.id,
      id: item.id,
      name: item.name,
      detail: (
        <>
          <Button>
            <Link to={`/result/${item.id}`}>Detail</Link>
          </Button>
        </>
      )
    }
  })

  return (
    <>
      <h2>List Answers</h2>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default Answers;