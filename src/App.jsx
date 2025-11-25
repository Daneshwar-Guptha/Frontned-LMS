
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Dashboard from './components/Dashboard/Dashboard'
import ProtectRoutes from './components/ProtectRoutes/ProtectedRoutes'
import Profile from './components/Profile/profile'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<ProtectRoutes />}>

          <Route path='/Dashboard' element={<Dashboard/>} />
          <Route path ='/Profile' element={<Profile/>} />

        </Route>
      </Routes>
      <div>

      </div>
    </>
  )
}

export default App
