import './App.css';
import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import StartPage from './Pages/StartPage';
import QuestionPage from './Pages/QuestionPage';
import Layout from './Components/Layout';
import Error from './Components/Error';
import {loader as questionLoader} from './Pages/QuestionPage'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<StartPage />}/>
    <Route
      path="question"
      element={<QuestionPage />}
      errorElement={<Error />}
      loader={questionLoader}
    />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
