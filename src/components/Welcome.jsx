import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to the OpenAI Prompt App</h1>
      <Link to="/prompt"><button style={{ marginBottom: '30px' }}>Go to Prompt</button></Link>
      <br></br>
      <Link to="/questionnaire" >
        <button>Go to Questionnaire</button>
      </Link>
    </div>
  );
};

export default Welcome;