import './App.css';
import MainPage from './Components/MainPage';
import QuestionPage from './Components/QuestionPage';
import AnswerPage from './Components/AnswerPage';
import React from 'react';
import {decode} from 'html-entities';

function App() {
  const [page, setPage] = React.useState("main-page")
  const [results, setResults] = React.useState([])

  function shuffle(array) {
    var m = array.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
  }
  
  function startQuiz() {

    async function fetchQuestions() {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")

        if (!res.ok)
          throw new Error(`Response status: ${res.status}`)

        const json = await res.json();

        setResults(() => {
          const dataSet = []

          json.results.forEach((res, index) => {
            let answersArr = []
            res.incorrect_answers.forEach(ans => answersArr.push(decode(ans, {level: 'html5'})))
            answersArr.push(decode(res.correct_answer, {level: 'html5'}))

            let tempSet = {
              name: `question_${index + 1}`,
              question: decode(res.question, {level: 'html5'}),
              correct_answer: decode(res.correct_answer, {level: 'html5'}),
              shuffled_answers: shuffle(answersArr)
            }

            dataSet.push(tempSet)
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
