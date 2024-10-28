import React from 'react';

export default function Question(props) {
    const inputId = React.useId()
    const [input, setInput] = React.useState("")

    const inputElements = props.data.shuffled_answers.map((answer, index) => {
        return (<label key={index}>
                {answer}
                <input 
                    type="radio"
                    name={inputId}
                    value={answer}
                    checked={input === answer}
                    onChange={handleChange} />
                </label>)
    })

    function handleChange(event) {
        const {value} = event.target
        setInput(value)
    }

    return (
        <div>
            <h3 className="question">{props.data.question}</h3>
            <div className='radio-input-container'>{inputElements}</div>
            <hr></hr>
        </div>
    )
}