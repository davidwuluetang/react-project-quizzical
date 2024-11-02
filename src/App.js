import './App.css';
import MainPage from './Components/MainPage';
import QuestionPage from './Components/QuestionPage';
import React from 'react';

function App() {
  const [page, setPage] = React.useState("main-page")
  const [darkMode, setDarkMode] = React.useState(false)

  function startQuiz() {
    setPage("questions-page")
  }

  function toggleDarkMode() {
    setDarkMode(prevMode => !prevMode)
  }

  return (
    <div className="App">
      <div className={`toggler ${darkMode ? "dark" : ""}`}>
          <span className="toggler--light">Light</span>
          <label>
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
          </label>
          <span className="toggler--dark">Dark</span>
      </div>
      {
        (page === "main-page" && <MainPage startQuiz={startQuiz} darkMode={darkMode} />)
        ||
        (page === "questions-page" && <QuestionPage darkMode={darkMode} />)
      }
      <div className={`bg-img ${darkMode ? "dark" : ""}`}></div>
    </div>
  );
}

export default App;
