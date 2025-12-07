import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import OrderTracking from './pages/OrderTracking/OrderTracking'
import Favourites from './pages/Favourites/Favourites'
import Donation from './pages/Donation/Donation'

const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/myorder' element={<MyOrders/>}/>
          <Route path='/order-tracking' element={<OrderTracking/>}/>
          <Route path='/favourites' element={<Favourites/>}/>
          <Route path='/donation' element={<Donation/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
