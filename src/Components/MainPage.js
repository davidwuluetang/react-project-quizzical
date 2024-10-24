export default function MainPage(props) {
    return (
        <div>
            <h1 id='Home-Page-Title'>Quizzical</h1>
            <p id='Home-Page-Description'>This is a online random quiz website.</p>
            <button className="btn" onClick={props.handleClick}>Start Quiz</button>
        </div>
    )
}