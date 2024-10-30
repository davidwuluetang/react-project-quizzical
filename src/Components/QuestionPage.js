import Question from "./Question"
import React from 'react';
import {decode} from 'html-entities';

export default function QuestionPage() {

    const [userInputs, setUserInputs] = React.useState({})
    const [formData, setFormData] = React.useState({})
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

    React.useEffect(() => {
        fetchQuestions()

        setFormData({
                score: 0,
                checkAnswers: false,
                playAgain: false
        })

    }, [])

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
            />)
    })

    function checkAnswers() {
        if(userInputs.length === fetchResult.length) {
            setFormData(prevData => {
                return {
                    ...prevData,
                    checkAnswers: true
                }
            })
        }
    }

    const check_answer_btn_style = {}

    if (Object.keys(userInputs).length !== fetchResult.length) {
        check_answer_btn_style.backgroundColor = "#808080de"
        check_answer_btn_style.cursor = "not-allowed"
    }


    return (
        <div className="question-page">
            {questionSet}
            
            {formData.checkAnswers &&
                <div className="bottom-container">
                    <p className="bottom-text">You scored {formData.score}/{fetchResult.length} correct answers</p>
                    <button className="btn" >Play Again</button>
                </div>
            }
            {!formData.checkAnswers &&
                <div className="bottom-container">
                    <button 
                        className="btn"
                        onClick={checkAnswers}
                        style={check_answer_btn_style}
                    >Check Answers</button>
                </div>
            }
        </div>
    )
}