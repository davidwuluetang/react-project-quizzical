import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"

export default function Layout() {
    const [darkMode, setDarkMode] = React.useState(false)

    function toggleDarkMode() {
        setDarkMode(prevMode => !prevMode)
    }

    return (
        <div className="site-wrapper">
            <Header darkMode={darkMode} btnOnclick={toggleDarkMode} />
            <main>
                <Outlet context={{darkMode}} />
            </main>
            <div className={`bg-img ${darkMode ? "dark" : ""}`}></div>
        </div>
    )
}