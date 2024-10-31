import './App.css';
import MainPage from './Components/MainPage';
import QuestionPage from './Components/QuestionPage';
import React from 'react';

function App() {
  const [page, setPage] = React.useState("main-page")

  function startQuiz() {
    setPage("questions-page")
  }

  return (
    <div className="App">
      {
        (page === "main-page" && <MainPage startQuiz={startQuiz}/>)
        ||
        (page === "questions-page" && <QuestionPage/>)
      }
      <div className='bg-img'></div>
    </div>
  );
}

export default App;
