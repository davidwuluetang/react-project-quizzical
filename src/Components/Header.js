import React from "react"

export default function Header(props) {

    return(
        <nav>
            <div className={`toggler ${props.darkMode ? "dark" : ""}`}>
                <span className="toggler--light">Light</span>
                <label>
                <input type="checkbox" checked={props.darkMode} onChange={props.btnOnclick} />
                <span className="slider round"></span>
                </label>
                <span className="toggler--dark">Dark</span>
            </div>
        </nav>
    )
}