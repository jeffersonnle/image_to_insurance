import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Login from "./components/Login.jsx"
import LandingPage from "./components/LandingPage.jsx"
import Register from "./components/Register.jsx"
import Photos from "./components/Photos.jsx"
import Results from "./components/Results.jsx"
import { SessionProvider } from "./components/SessionProvider";
import Processing from './components/Processing.jsx'

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
        <Route path="/processing" element={<Processing/>}/>
      </Routes>
    </SessionProvider>
  )
}

export default App
