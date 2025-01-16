import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ImageResult from './pages/ImageResult'
import BuyCredit from './pages/BuyCredit'
import Header from './component/Header'
import Footer from './component/Footer'
import Login from './component/Login'
import { AppContext } from './context/AppContext'
import { Toaster } from "react-hot-toast"

const App = () => {
  const { toggle } = useContext(AppContext)


  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <Header />
      {toggle && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/image-result' element={<ImageResult />} />
        <Route path='/purchase-credit' element={<BuyCredit />} />
      </Routes>
      <Toaster position='top-left' duration='4000' />
      <Footer />
    </div>
  )
}

export default App
