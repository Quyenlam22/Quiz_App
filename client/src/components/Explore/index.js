import { Button, Carousel, Flex, message } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListTopic } from "../../services/topicService";

function Explore () {
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTopic();
      if(response.code === 200) {
        setData(response.data);
      } else {
        messageApi.open({
          type: 'error',
          content: "An error occurred during Fetch API!",
        });
      }
    }
    fetchApi();
  }, [messageApi])

  return (
    <>
      {contextHolder}
      <Flex vertical justify="center" className="explore">
        <h2 className="explore__title">Explore More Quiz Categories</h2>
        <Carousel 
          className="explore__carousel"
          autoplay={{ dotDuration: true }} 
          autoplaySpeed={3000}
          pauseOnHover={false}
        >
          {data.length > 0 && (
            data.map(item => (
              <div className="explore__item" key={item._id}>
                <div className="explore__image">
                  <img alt={item.name} src={item.thumbnail}/>
                </div>
                <div className="explore__content">
                  <Button className="explore__topic button__practice" size="large">
                    <Link to={`/quiz/${item.slug}`}>Practice</Link>
                  </Button>
                </div>
              </div>
            ))
          )}
        </Carousel>
      </Flex>
    </>
  )
}

export default Explore;