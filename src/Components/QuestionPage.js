import Question from "./Question"


export default function QuestionPage(props) {
    console.log(props.dataSet)
    const questionSet = props.dataSet.map((data, index) => <Question key={index} data={data} />)

    return (
        <div className="question-page">
            {questionSet}
            <button className="btn" onClick={props.handleClick}>Check Answers</button>
        </div>
    )
}