export default function Question(props) {
    return (
        <div>
            <h3 className="question">{props.data.question}</h3>
            <h4>answers</h4>
            <hr></hr>
        </div>
    )
}