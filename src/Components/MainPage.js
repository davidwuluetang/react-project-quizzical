export default function MainPage(props) {
    return (
        <div className="main-content">
            <h1 id='Home-Page-Title'>Quizzical</h1>
            <p id='Home-Page-Description'>This is a online random quiz website.</p>
            <button className="btn" onClick={props.startQuiz}>Start Quiz</button>
        </div>
    )
}