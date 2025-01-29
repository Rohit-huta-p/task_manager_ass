
import { useContext, useEffect } from 'react'
import { GlobalContext, GlobalProvider } from './contexts/GlobalContext.jsx'
import './index.css'
import Login from './screens/auth/Login.jsx'
import Signup from './screens/auth/Signup.jsx'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './screens/Home.jsx'
import { checkAuthStatus } from './utils/checkAuthStatus.js'
import Navbar from './components/Navbar.jsx'
function App() {
  const {isLoggedIn, setIsLoggedIn, setErrorMessage} = useContext(GlobalContext);
  useEffect(() => {
    checkAuthStatus(setIsLoggedIn)
    setErrorMessage('')
  }, [])

  return (
    <div>
      <Navbar />
      {
        isLoggedIn ? 
          (
            <Routes>
              <Route path='/' element={<Home />}/>

              <Route path='*' element={<Navigate to="/" />}/>
          </Routes>
          ) 
          : (
          <Routes>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='*' element={<Navigate to="/signup" />}/>
          </Routes>
          )
      }

    </div>
  )
}

export default App
