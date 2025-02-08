import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Login from "./components/landing-page/Login.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/landing" element={<LandingPage />} />

   </Routes>
    </>
  )
}

export default App
