import React, { useContext } from 'react'
import TopBar from './components/TopBar/TopBar'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import SinglePost from './components/SinglePost/SinglePost'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import Write from './pages/Write/Write'
import Settings from './pages/Settings/Settings'
import axios from 'axios'
import { UserContext } from './context/Context'

function App() {

  const { user } = useContext(UserContext)
  //protected routes
  return (
    <div className="App">


      <Routes>

        <Route path='/' element={<TopBar />}>
          <Route index element={<Home />} />
          <Route path='/post/:id' element={<SinglePost />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='write' element={<Write />} />
          <Route path='settings' element={<Settings />} />
        </Route>

      </Routes>

    </div>
  )
}

export default App
