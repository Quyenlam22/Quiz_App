import { useEffect, useState } from "react";
import { getAnswer } from "../../../services/answersService";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getListQuestion } from "../../../services/questionService";
import { Form, Button, Radio, Tag, Statistic, Flex } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { getTopicById } from "../../../services/topicService";
function Result () {
  const params = useParams();
  const [data, setData] = useState([]);
  const [topic, setTopic] = useState({});
  const [ form ] = Form.useForm();
  const navigate = useNavigate();
  const [correctAnswer, setCorrectAnswer] = useState(0);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAnswer(params.id);
      if(response.code === 200){
        const dataTopic = await getTopicById(response.data.topicId);
        if(dataTopic.code === 200) {
          setTopic(dataTopic.data);
        }

        const dataQuestions = await getListQuestion(response.data.topicId);
        let result = [];
        
        if(dataQuestions.code === 200) {
          for(let i = 0; i < dataQuestions.data.length; i++) {
            result.push({
              ...dataQuestions.data[i],
              ...response.data.answers.find(item => item.questionId === dataQuestions.data[i]._id)
            })
          }
          
          const values = {};
          result.forEach(item => {
            values[item.id] = item.answer;
          });
          form.setFieldsValue(values);

          setData(result);
        }
      }
    }

    fetchApi();
  }, [params.id, form])
  
  useEffect(() => {
    if (data.length === 0) return;

    let cnt = 0;
    for (let item of data) {
      if (item.correctAnswer === item.answer) {
        cnt++;
      }
    }
    setCorrectAnswer(cnt);
  }, [data]);  

  const handleSubmit = async () => {
    navigate(`/quiz/${topic.slug}`);
  }
    
  return (
    <>
      <h1>Test result</h1>
      <Flex gap={"large"}>
        <Statistic
          value={correctAnswer}
          valueStyle={{ color: '#3f8600', fontSize: 22 }}
          prefix={(
            <>
              Correct: 
            </>
          )}
          suffix={<CheckCircleOutlined />}
        />

        <Statistic
            value={(correctAnswer / data.length) * 100}
            valueStyle={{ color: '#3f8600', fontSize: 22 }}
            prefix={(
              <>
                Correct ratio: 
              </>
            )}
            suffix={'%'}
        />
      </Flex>
      <div className="form-answer">
        <Form 
          form={form}
          onFinish={handleSubmit}
        >
          {data && data.map((item, index) => (
            <div className="form-answer__item" key={item._id}>
              <p>
                Question {index + 1}: {item.question}
                {item.correctAnswer === item.answer ? (
                  <>
                    <Tag className="ml-10" icon={<CheckCircleOutlined />} color="success">True</Tag>
                  </>
                ) : (
                  <>
                    <Tag className="ml-10" icon={<CloseCircleOutlined />} color="error">False</Tag>
                  </>
                )}
              </p>
                <Form.Item 
                  name={`${item.id}`}
                >
                  {/* <Radio.Group
                    options={item.answers.map((ans, idx) => ({ label: ans, value: idx }))}
                    disabled
                    style={{ display: "flex", gap: "16px", flexDirection: "column" }}
                  /> */}
                  <Radio.Group disabled value={item.answer}>
                    {item.answers.map((ans, idx) => {
                      let style = {};
                      if (idx === item.correctAnswer) {
                        style = { color: "green", fontWeight: "bold" };
                      } else if (idx === item.answer && item.answer !== item.correctAnswer) {
                        style = { color: "red" };
                      }

                      return (
                        <Radio 
                          key={idx} 
                          value={idx} 
                          style={{ display: "block", ...style }}
                        >
                          {ans}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </Form.Item>
            </div>
            )
          )}
          <Form.Item>
            <Button size="large" variant="solid" color="purple" htmlType="submit">Practice Again</Button>
            <Button className="ml-20" size="large" type="primary">
              <Link to="/">Home</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Result;