import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Login from "./components/Login.jsx"
import LandingPage from "./components/LandingPage.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/photos" element={<Photos />} />

   </Routes>
    </>
  )
}

export default App
