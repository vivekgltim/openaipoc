import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  "What is the level of custom development required in your project?",
  "How complex are the data processing needs of your project?",
  "What is the expected volume of content generation (e.g., reports, marketing materials)?",
  "How critical is real-time customer interaction for your project?",
  "What is the level of automation currently in your workflow?",
  "How much time do team members spend on repetitive tasks?",
  "What is the level of expertise within your team regarding AI technologies?",
  "How important is innovation in your project deliverables?",
  "What is the anticipated impact of GenAI on customer satisfaction in your project?",
  "How likely are you to recommend using GenAI based on current project needs?",
];

const inputs = [
  "analyse response on these parameters CUSTOM DEVELOPMENT, DATA_COMPLEXITY, CONTENT VOLUME, REALTIME INTERACTION, CURRENT AUTOMATION, REPETITIVE TASKS, AI EXPERTISE, INNOVATION IMPORTANCE, CUSTOMER SATISFACTION, RECOMMENDATION LIKELIHOOD"
];

const Questionnaire = () => {
  const [answers, setAnswers] = useState(Array(10).fill(3));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const prompt = questions.map((question, index) => `${question}\nScore: ${answers[index]}`).join('\n\n') + '\n\n' + inputs.join('\n');

    try {
      const res = await fetch('http://127.0.0.1:5000/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      navigate('/result', { state: { result: data.response } });
    } catch (error) {
      console.error('Error sending prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question, index) => (
        <div key={index}>
          <label>{question}</label>
          <div>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={value}
                  checked={answers[index] === value}
                  onChange={() => handleAnswerChange(index, value)}
                />
                {value}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default Questionnaire;