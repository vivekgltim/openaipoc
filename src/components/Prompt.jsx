import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Prompt = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/prompt', {
        prompt,
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      console.log(response.data);
      navigate('/result', { state: { result: response.data } });

    } catch (error) {
      console.error('Error fetching data from OpenAI API:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows="10" cols="50" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Prompt;