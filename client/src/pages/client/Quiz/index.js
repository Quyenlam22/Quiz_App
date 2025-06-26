import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../../services/topicService";
import { getListQuestion } from "../../../services/questionService";
import { Button, Flex, Form, message, Modal, Radio, Statistic } from "antd";
import Cookies from 'js-cookie';
import { createAnswer } from "../../../services/quizService";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Timer } = Statistic;
function Quiz () {
  const params = useParams();
  const [data, setData] = useState();
  const [questions, setQuestions] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const deadline = Date.now() + 1000 * 60 * 10;
  // const deadline = Date.now() + 1000 * 3;

  const [open, setOpen] = useState(true);
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
    navigate(-1);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTopic(params.slug);
      if(response.code === 200) {
        setData(response.data);
        const dataQuestions = await getListQuestion(response.data._id);
        if(dataQuestions.code === 200) {
          setQuestions(dataQuestions.data);
        }
      }
    }
    fetchApi();
    
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; 
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [params.slug])
  
  const handleSubmit = async (values) => {
    const answers = Object.entries(values).map(([questionId, answerIndex]) => ({
      questionId: questionId,
      answer: answerIndex
    }));

    const options = {
      userId: Cookies.get('id'),
      topicId: data._id,
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

  const onFinish = () => {
    form.submit();
  };

  return (
    <>
      <Modal
        open={open}
        title={<>
          <ExclamationCircleOutlined/> Instructions
        </>}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Start"       
        cancelText="Go back"
      >
        <ol>
          <li>You will have to answer 10 questions in 10 minutes.</li>
          <li>After you finish, click the "Submit" button to submit your test.</li>
          <li>If you exceed the time limit, the system will automatically submit your test.</li>
          <li>Click "Start" to begin. Good luck!</li>
        </ol>
      </Modal>

      {!open && (
        <>
          {contextHolder}
          <Flex justify="space-between">
            <h2>Quiz Topic: {data && (<>{data.name}</>)} </h2>
            <Timer type="countdown" value={deadline} onFinish={onFinish} />
          </Flex>
          <div className="form-quiz">
            <Form 
              onFinish={handleSubmit}
              form={form}
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
      )}
    </>
  )
}

export default Quiz;