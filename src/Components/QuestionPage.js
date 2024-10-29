import Question from "./Question"


export default function QuestionPage(props) {

    const questionSet = props.dataSet.map((data, index) => {

        return (<Question key={index} data={data} />)
    })

    return (
        <div className="question-page">
            {questionSet}
            <button className="btn" onClick={props.handleClick}>Check Answers</button>
        </div>
    )
}