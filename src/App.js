import './App.css';
import MainPage from './Components/MainPage';
import QuestionPage from './Components/QuestionPage';
import AnswerPage from './Components/AnswerPage';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState("main-page")
  
  return (
    <div className="App">

      <MainPage />

    </div>
  );
}

export default App;
