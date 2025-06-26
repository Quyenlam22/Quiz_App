import { Button } from "antd";
import { Link } from "react-router-dom";

function Welcome() {
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
    </>
  )
}

export default Welcome;