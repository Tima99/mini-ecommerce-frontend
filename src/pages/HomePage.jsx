import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Nav } from '../components/Nav'

export const HomePage = () => {
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState(null);

  
  return (
    <div>
        <Nav></Nav>
        <Outlet context={{products, setProducts, cart, setCart}}/>
    </div>
  )
}
