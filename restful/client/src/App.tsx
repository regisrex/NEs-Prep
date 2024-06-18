

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../src/pages/Login'
import SignUp from "../src/pages/SignUp"
import Dashboard from './pages/Dashboard'
import Courses from "./components/courses/Courses"
import {Toaster} from "react-hot-toast"
function App() {
  return (
    <div className='font-poppins  text-sm'>
      <BrowserRouter>
      <Toaster />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
