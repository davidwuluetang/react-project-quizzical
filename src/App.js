import './App.css';
import MainPage from './Components/MainPage';
import QuestionPage from './Components/QuestionPage';
import AnswerPage from './Components/AnswerPage';
import { useState } from 'react';
import {decodeEntity} from 'html-entities';

function App() {
  const [page, setPage] = useState("main-page")
  const [results, setResults] = useState([])
  
  
  function startQuiz() {

    async function fetchQuestions() {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")

        if (!res.ok)
          throw new Error(`Response status: ${res.status}`)

        const json = await res.json();

        setResults(() => {
          const dataSet = []

          json.results.forEach(res => {
            let temp = {
              question: decodeEntity(res.question),
              correct_answer: res.correct_answer,
              incorrect_answers: res.incorrect_answers
            }

            dataSet.push(temp)
          })
          return dataSet
        })
      } catch (error) {
        console.error(error.message);
      }
    }
    
    fetchQuestions()
    setPage("questions-page")
  }
  
  function checkAnswers() {
    setPage("answers-page")
  }
  
  return (
    <div className="App">
      {
        (page === "main-page" && <MainPage handleClick={startQuiz}/>) ||
        (page === "questions-page" && <QuestionPage 
                                          handleClick={checkAnswers}
                                          dataSet={results} />) ||
        (page === "answers-page" && <AnswerPage handleClick={startQuiz}/>)
      }
    </div>
  );
}

export default App;
