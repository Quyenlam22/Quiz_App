import { Button, Carousel, Flex } from "antd";
import './Home.scss';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListTopic } from "../../services/topicService";

function Home () {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTopic();
      if(response) {
        setData(response);
      }
    }
    fetchApi();
  }, [])

  return (
    <>
      <div className="welcome">
        <div className="welcome__content">
          <h1>Test Your Programming Knowledge</h1>
          <p className="welcome__desc">Challenge yourself with our curated collection of puzzles about programming languages. From basic to advanced, test your knowledge and discover new insights along this journey.</p>
          <Button className="button__practice" size="large">
            <Link to={'/topics'}>Start Quiz</Link>
          </Button>
        </div>
      </div>

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
              <div className="explore__item" key={item.id}>
                <div className="explore__image">
                  <img alt={item.name} src={item.thumbnail}/>
                </div>
                <div className="explore__content">
                  <Button className="explore__topic button__practice" size="large">
                    <Link to={`/quiz/${item.id}`}>Practice</Link>
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

export default Home;