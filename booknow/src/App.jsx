import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage';


const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner");
  return (

    
    <div>
      
     {!isOwnerPath &&  <Navbar/>}

     <div className='min-h-[70vh]'>
      <Routes>
        <Route path='/' element={<HomePage/>} />
      </Routes>

     </div>
    </div>
  )
}

export default App