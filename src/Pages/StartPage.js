import React from "react"
import {
    useOutletContext,
    useNavigate
} from "react-router-dom"

export default function MainPage() {
    const {darkMode} = useOutletContext()
    const navigate = useNavigate()

    return (
        <div className={`main-content main-page ${darkMode ? "dark" : ""}`}>
            <h1 id='Home-Page-Title'>Quizzical</h1>
            <p id='Home-Page-Description'>This is a online random quiz website.</p>
            <button className="btn" onClick={() => navigate("/question")}>Start Quiz</button>
        </div>
    )
}