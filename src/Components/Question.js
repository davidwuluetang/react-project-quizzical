export default function Question({question_set, handleSelect, userInput, checkAnswer, darkMode}) {
    const inputElements = question_set.shuffled_answers.map((answer, index) => {
        let style = {
            color: darkMode ? "#F5F7FB" : "",
            border: darkMode ? "#F5F7FB solid 1.5px" : ""
        }
    
        if(checkAnswer) {
            // Style for inputs that neither correct nor incorrect
            style = {
                color: "#878787",
                border: "#878787 solid 1.5px"
            }
            // Style for correct input
            if(answer === question_set.correct_answer) {
                style = {
                    backgroundColor: "#94D7A2",
                    border: "none"
                }
            } else {
                // Style for incorrect input
                if (userInput === answer) {
                    style = {
                        backgroundColor: "#F8BCBC",
                        border: "none"
                    }
                }
            }
        }
        return (<label 
                    key={index}
                    style={style}
                >
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
        <div className={`question ${darkMode ? "dark" : ""}`}>
            <h3 className="question-title">{question_set.question}</h3>
            <div className='radio-input-container'>{inputElements}</div>
            <hr></hr>
        </div>
    )
}