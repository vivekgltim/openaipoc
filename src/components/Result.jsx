import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { result } = location.state || { result: 'No result available' };

  return (
    <div>
      <h1>Result</h1>
      <p>{result}</p>
    </div>
  );
};

export default Result;