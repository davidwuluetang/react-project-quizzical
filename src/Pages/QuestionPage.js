import React from 'react';
import {
    useOutletContext,
    useLoaderData,
    useRevalidator,
    useNavigate
} from "react-router"
import Question from "../Components/Question"
import ConfettiEffect from "../Components/Confetti";
import { fetchQuestions } from '../api';

export async function loader({request}) {
    const queryString = new URL(request.url).searchParams.toString()
    try {
        return await fetchQuestions(queryString)
    } catch(err) {
        if(err.status === 429)
            throw {
                name: err.status,
                message: "Too many requests, please wait for a couple seconds and refresh your page."
            }
    }
}

export default function QuestionPage() {
    const {darkMode} = useOutletContext()
    const navigate = useNavigate();
    const emptyAppState = {
        score: 0,
        checkAnswers: false,
        fullScore: false
    }
    const questions = useLoaderData()
    const [userInputs, setUserInputs] = React.useState({})
    const [appState, setAppState] = React.useState(emptyAppState)
    const revalidator = useRevalidator()

    function handleSelect(event) {
        const {value, name} = event.target
        setUserInputs(prevInputs => {
            return {
                ...prevInputs,
                [name]: value
            }
        })
    }

    const questionSet = questions.map((question_set, index) => {
        return (<Question
                key={index}
                question_set={question_set}
                handleSelect={handleSelect}
                userInput={userInputs[question_set.question_id]}
                checkAnswer={appState.checkAnswers}
                darkMode={darkMode}
            />)
    })

    const allAnswersSelected = Object.keys(userInputs).length === questions.length
    const check_answer_btn_style = {
        backgroundColor: allAnswersSelected ? "#4D5B9E" : "#808080de",
        cursor: allAnswersSelected ? "pointer" : "not-allowed"
    }
    
    function checkAnswers() {
        if(allAnswersSelected) {
            let total_score = 0
            questions.forEach(res => {
                if(userInputs[res.question_id] === res.correct_answer)
                    total_score++
            })

            setAppState(prevData => {
                return {...prevData,
                    score: total_score,
                    checkAnswers: true,
                    fullScore: total_score === questions.length ? true : false
                }
            })
        }
    }

    function playAgain() {
        setUserInputs({})
        setAppState(emptyAppState)
        revalidator.revalidate()
    }

    return (
        <div className={`main-content question-page ${darkMode ? "dark" : ""}`}>
            {questionSet}
            
            {appState.checkAnswers &&
                <div className="bottom-container">
                    <p className="bottom-text">You scored {appState.score}/{questions.length} correct answers</p>
                    <button className="btn" onClick={playAgain}>Play Again</button>
                    <button 
                        className="btn"
                        onClick={() => navigate("/")}
                    >Change Question</button>
                    {appState.fullScore && <ConfettiEffect numOfQues={questions.length} />}
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
                    <button 
                        className="btn"
                        onClick={() => navigate("/")}
                    >Change Question</button>
                </div>
            }
        </div>
    )
}