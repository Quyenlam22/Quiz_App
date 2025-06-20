import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getListAnswersByUserId } from '../../services/answersService';
import Cookies from 'js-cookie';
import { getListTopic } from '../../services/topicService';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    key: 'key',
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

      if(answersByUserId.code === 200 && topics.code === 200){
        let result = [];
        for (let i = 0; i < answersByUserId.data.length; i++) {
          result.push({
            ...topics.data.find(item => item._id === answersByUserId.data[i].topicId),
            ...answersByUserId.data[i]
          })
        }
        setData(result.reverse());
      }
      
    }
    fetchApi();
  }, [])

  const dataSource = data.map((item, index) => {
    return {
      key: (index + 1),
      id: item._id,
      name: item.name,
      detail: (
        <>
          <Button className="button__practice">
            <Link to={`/result/${item._id}`}>Detail</Link>
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