import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Login from "./components/Login.jsx"
import LandingPage from "./components/LandingPage.jsx"
import Register from "./components/Register.jsx"
import Photos from "./components/Photos.jsx"
import Results from "./components/Results.jsx"
import { SessionProvider } from "./SessionProvider";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <SessionProvider>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/results" element={<Results/>}/>
    </Routes>
    </SessionProvider>
  )
}

export default App
