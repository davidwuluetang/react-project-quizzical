export default function QuestionPage(props) {
    return (
        <div>
            <h1>Question Page</h1>
            <button className="btn" onClick={props.handleClick}>Check Answers</button>
        </div>
    )
}