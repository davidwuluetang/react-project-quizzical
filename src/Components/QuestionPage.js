import Question from "./Question"
import React from 'react';
import {decode} from 'html-entities';

export default function QuestionPage() {
    const emptyAppState = {
        score: 0,
        checkAnswers: false
    }

    const [userInputs, setUserInputs] = React.useState({})
    const [appState, setAppState] = React.useState(emptyAppState)
    const [fetchResult, setFetchResult] = React.useState([])

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
    
    async function fetchQuestions() {
        try {
          const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
  
          if (!res.ok)
            throw new Error(`Response status: ${res.status}`)
  
          const json = await res.json();
  
          setFetchResult(() => {
            const resultSet = []
  
            json.results.forEach((res, index) => {
              let answersArr = []
              res.incorrect_answers.forEach(ans => answersArr.push(decode(ans, {level: 'html5'})))
              answersArr.push(decode(res.correct_answer, {level: 'html5'}))
  
              let tempSet = {
                question_id: `question_${index + 1}`,
                question: decode(res.question, {level: 'html5'}),
                correct_answer: decode(res.correct_answer, {level: 'html5'}),
                shuffled_answers: shuffle(answersArr)
              }
  
              resultSet.push(tempSet)
            })
            return resultSet
          })
        } catch (error) {
          console.error(error.message);
        }
    }

    React.useEffect(() => {fetchQuestions()}, [])

    function handleSelect(event) {
        const {value, name} = event.target
        setUserInputs(prevInputs => {
            return {
                ...prevInputs,
                [name]: value
            }
        })
    }

    const questionSet = fetchResult.map((question_set, index) => {
        return (<Question
                key={index}
                question_set={question_set}
                handleSelect={handleSelect}
                userInput={userInputs[question_set.question_id]}
                checkAnswer={appState.checkAnswers}
            />)
    })

    const allAnswersSelected = Object.keys(userInputs).length === fetchResult.length
    const check_answer_btn_style = {
        backgroundColor: allAnswersSelected ? "#4D5B9E" : "#808080de",
        cursor: allAnswersSelected ? "pointer" : "not-allowed"
    }
    
    function checkAnswers() {
        if(allAnswersSelected) {
            let total_score = 0
            fetchResult.forEach(res => {
                if(userInputs[res.question_id] === res.correct_answer)
                    total_score++
            })

            setAppState(prevData => {
                return {...prevData,
                    score: total_score,
                    checkAnswers: true,
                }
            })
        }
    }

    function playAgain() {
        setUserInputs({})
        setAppState(emptyAppState)
        fetchQuestions()
    }

    return (
        <div className="main-content">
            {questionSet}
            
            {appState.checkAnswers &&
                <div className="bottom-container">
                    <p className="bottom-text">You scored {appState.score}/{fetchResult.length} correct answers</p>
                    <button className="btn" onClick={playAgain}>Play Again</button>
                </div>
            }
            {!appState.checkAnswers &&
                <div className="bottom-container">
                    <button 
                        className="btn"
                        onClick={checkAnswers}
                        style={check_answer_btn_style}
                        disabled={!allAnswersSelected}
                    >Check Answers</button>
                </div>
            }
        </div>
    )
}