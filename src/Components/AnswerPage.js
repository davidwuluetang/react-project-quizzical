export default function AnswerPage(props) {
    return (
        <div>
            <h1>Answer Page</h1>
            <button className="btn" onClick={props.handleClick}>Start Again</button>
        </div>
    )
}