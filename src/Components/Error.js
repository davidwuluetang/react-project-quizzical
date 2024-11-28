import React from "react"
import { useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError()
    console.log(error)
    return (
        <>
        <h2>Error - {error.status}: {error.statusText}</h2>
        </>
    )
}