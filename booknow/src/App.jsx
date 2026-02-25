import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage';
import AllRooms from './pages/AllRooms';


const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner");
  return (

    
    <div>
      
     {!isOwnerPath &&  <Navbar/>}

     <div className='min-h-[70vh]'>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/rooms' element={<AllRooms/>}/>
      </Routes>

     </div>
    </div>
  )
}

export default App