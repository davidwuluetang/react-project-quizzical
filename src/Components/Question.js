export default function Question({question_set, handleSelect, userInput}) {
    const inputElements = question_set.shuffled_answers.map((answer, index) => {
        return (<label key={index}>
                {answer}
                    <input 
                        type="radio"
                        name={question_set.question_id}
                        value={answer}
                        checked={userInput === answer}
                        onChange={handleSelect}
                    />
                </label>)
    })

    return (
        <div>
            <h3 className="question">{question_set.question}</h3>
            <div className='radio-input-container'>{inputElements}</div>
            <hr></hr>
        </div>
    )
}