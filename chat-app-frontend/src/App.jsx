
import './App.css'
import Signup from './features/signup/signup'
import Login from './features/login/login'
import { Routes,Route } from 'react-router-dom'
import Home from './features/home/home'
import RoomsList from './features/chat-rooms/chat-rooms-list/rooms-list'

function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='*' element={<h1>PAGE NOT FOUND</h1>}/>
      <Route path='/rooms' element={<RoomsList/>}/>
    </Routes>
  )
}

export default App
