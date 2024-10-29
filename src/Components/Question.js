import React from 'react';

export default function Question(props) {
    const [input, setInput] = React.useState("")
    // console.log(input)
    
    function handleChange(event) {
        const {value} = event.target
        setInput(value)
    }

    const inputElements = props.data.shuffled_answers.map((answer, index) => {
        return (<label key={index}>
                {answer}
                    <input 
                        type="radio"
                        name={props.data.name}
                        value={answer}
                        checked={input === answer}
                        onChange={handleChange}
                    />
                </label>)
    })

    return (
        <div>
            <h3 className="question">{props.data.question}</h3>
            <div className='radio-input-container'>{inputElements}</div>
            <hr></hr>
        </div>
    )
}