import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Prompt from './components/Prompt';
import Result from './components/Result';

const App = () => {
  return (
    <Router>
      <div style={{ backgroundColor: 'blue', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header>
          <h1>OpenAI Prompt App</h1>
        </header>
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/prompt" element={<Prompt />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2025 OpenAI Prompt App</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;