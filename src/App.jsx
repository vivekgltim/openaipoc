import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Prompt from './components/Prompt';
import Result from './components/Result';
import Questionnaire from './components/Questionnaire';
import Welcome from './components/Welcome';

const App = () => {
  return (
    <div style={{ backgroundColor: 'blue', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header>
        <h1>OpenAI Prompt App</h1>
      </header>
      <main style={{ flex: 1 }}>
        <Router>
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/prompt" element={<Prompt />} />
            <Route path="/result" element={<Result />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
          </Routes>
        </Router>
      </main>
      <footer>
        <p>&copy; 2025 OpenAI Prompt App</p>
      </footer>
    </div>
  );
};

export default App;