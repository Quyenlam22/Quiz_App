import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionService";
import { Button, Form, message, Radio } from "antd";
import Cookies from 'js-cookie';
import { createAnswer } from "../../services/quizService";

function Quiz () {
  const params = useParams();
  const [data, setData] = useState();
  const [questions, setQuestions] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTopic(params.id);
      if(response.code === 200) {
        setData(response.data);
      }
    }
    fetchApi();
  }, [params.id])

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListQuestion(params.id);
      if(response.code === 200) {
        setQuestions(response.data);
      }
    }
    fetchApi();
  }, [params.id])

  const handleSubmit = async (values) => {
    const answers = Object.entries(values).map(([questionId, answerIndex]) => ({
      questionId: questionId,
      answer: answerIndex
    }));

    const options = {
      userId: Cookies.get('id'),
      topicId: params.id,
      answers: answers
    }

    const response = await createAnswer(options);
    if(response.code === 200) {
      messageApi.open({
        type: 'success',
        content: 'Submitted successfully!',
      });
      setTimeout(() => {
        navigate(`/result/${response.data._id}`);
      }, 1000);
    }
    else {
      messageApi.open({
        type: 'error',
        content: 'There was an error during submission!',
      });
    }
    
  }

  return (
    <>
      {contextHolder}
      <h2>Quiz Topic: {data && (<>{data.name}</>)} </h2>
      <div className="form-quiz">
        <Form 
          onFinish={handleSubmit}
        >
          {questions && questions.map((item, index) => (
            <div className="form-quiz__item" key={item._id}>
              <p>Question {index + 1}: {item.question}</p>
                <Form.Item 
                  name={`${item._id}`}
                  // rules={[{ required: true, message: "Please select an answer!" }]}
                >
                  <Radio.Group
                    options={item.answers.map((ans, idx) => ({ label: ans, value: idx }))}
                    values={index}
                    style={{ display: "flex", gap: "16px", flexDirection: "column" }}
                  />
                  {/* <Radio.Group>
                    {item.answers.map((itemAns, indexAns) => (
                      <>
                        <Radio value="a">{itemAns}</Radio>
                      </>  
                    )
                    )}
                  </Radio.Group> */}
                </Form.Item>
            </div>
            )
          )}
          <Form.Item>
            <Button size="large" variant="solid" color="purple" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Quiz;