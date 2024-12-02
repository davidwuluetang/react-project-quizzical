import React from "react"
import { useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError()
    return (
        <>
        <h2>Error occur - {error.name}: {error.message}</h2>
        </>
    )
}