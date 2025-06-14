import { useEffect, useState } from "react";
import { getAnswer } from "../../services/answersService";
import { useNavigate, useParams } from 'react-router-dom';
import { getListQuestion } from "../../services/questionService";
import { Form, Button, Radio, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
function Result () {
  const params = useParams();
  const [data, setData] = useState([]);
  const [ form ] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAnswer(params.id);
      const dataQuestions = await getListQuestion(response.topicId);
      let result = [];

      for(let i = 0; i < dataQuestions.length; i++) {
        result.push({
          ...dataQuestions[i],
          ...response.answers.find(item => item.questionId == dataQuestions[i].id)
        })
      }
      
      setData(result);

      const values = {};
      result.forEach(item => {
        values[item.id] = item.answer;
      });
      form.setFieldsValue(values);
    }

    fetchApi();
  }, [])

  const handleSubmit = async () => {
    navigate(`/quiz/${data[0].topicId}`);
  }
    
  return (
    <>
      <h1>Test result</h1>
      <div className="form-answer">
        <Form 
          form={form}
          onFinish={handleSubmit}
        >
          {data && data.map((item, index) => (
            <div className="form-answer__item" key={item.id}>
              <p>
                Question {index + 1}: {item.question}
                {item.correctAnswer === item.answer ? (
                  <>
                    <Tag className="ml-20" icon={<CheckCircleOutlined />} color="success">True</Tag>
                  </>
                ) : (
                  <>
                    <Tag className="ml-20" icon={<CloseCircleOutlined />} color="error">False</Tag>
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

                  {/* 1h05 */}
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
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Result;