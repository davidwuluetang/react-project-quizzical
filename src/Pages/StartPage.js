import React from "react"
import {
    useOutletContext,
    Form,
    redirect
} from "react-router"

export async function action({request}) {
    const formData = await request.formData()
    if (formData.get("category") === "any")
        formData.delete("category")
    if(formData.get("difficulty") === "any")
        formData.delete("difficulty")
    const queryString = new URLSearchParams(formData).toString()
    return redirect(`question?${queryString}`)
}

export default function MainPage() {
    const {darkMode} = useOutletContext()

    return (
        <div className={`main-content main-page ${darkMode ? "dark" : ""}`}>
            <h1 id='Home-Page-Title'>Quizzical</h1>
            <p id='Home-Page-Description'>This is a online random quiz website.</p>
            <Form
                method="post" 
                className="question-form" 
            >
                <label htmlFor="amount">Number of Questions:</label>
                <input 
                    type="number"
                    name="amount"
                    id="amount"
                    min="1"
                    max="10"
                    defaultValue="5"
                />

                <br></br>

                <label htmlFor="category">Select Category: </label>
                <select id="category" name="category">
                    <option value="any">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals &amp; Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science &amp; Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                    <option value="32">Entertainment: Cartoon &amp; Animations</option>
                </select>

                <br></br>

                <label htmlFor="difficulty">Select Difficulty: </label>
                <select id="difficulty" name="difficulty">
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <br></br>

                <button className="btn">Start Quiz</button>
            </Form>
        </div>
    )
}