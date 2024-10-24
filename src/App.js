import './App.css';
import MainPage from './Components/MainPage';
import QuestionPage from './Components/QuestionPage';
import AnswerPage from './Components/AnswerPage';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState("main-page")
  
  function startQuiz() {
    setPage("questions-page")
  }

  function checkAnswers() {
    setPage("answers-page")
  }

  return (
    <div className="App">
      {
        (page === "main-page" && <MainPage handleClick={startQuiz}/>) ||
        (page === "questions-page" && <QuestionPage handleClick={checkAnswers}/>) ||
        (page === "answers-page" && <AnswerPage handleClick={startQuiz}/>)
      }
    </div>
  );
}

export default App;
