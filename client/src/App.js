import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

/* component imports */
import { Navbar, Sidebar, Footer } from './components'

/* pages imports */
import {
  Home,
  SingleProduct,
  Cart,
  About,
  Products,
  Error,
  Checkout,
  Return,
  Contact,
} from './pages'

/* once i actually deploy the full site remember to change the homepage thing to actual domain */
export default function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <div className='page-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<SingleProduct />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/return' element={<Return />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}
