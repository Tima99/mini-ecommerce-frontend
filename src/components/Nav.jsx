import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import req from '../api/request'
import style from "./Nav.module.css"
import logo from "../assets/logo.png"

export const Nav = () => {
    const {pathname} = useLocation()
    const isCheckoutCart = pathname.includes("cart")
    const navigate = useNavigate()
    
  return (
    <div className={style['nav-container']}>

        <div className={`${style['brand']} flex r-v-center gap-05`}>
          <img src={logo} alt="logo" width={"37px"}/>
        </div>
        
        <Link to={'/home'} className={ !isCheckoutCart ? style['active'] : ''}>Home</Link>
        <Link to={'/home/cart'} className={  isCheckoutCart ? style['active'] : ''}>Cart</Link>   

        <div style={{
          justifySelf: "flex-end",
          color: 'white',
          fontSize: '.85rem',
          cursor: 'pointer'
        }}
          onClick={
            async() => {
              try {
                const res = await req.get('/logout')
                navigate('/', {replace: true})
              } catch (error) {
                  console.log(error);
                  alert("We are unable to log out you. Try again.")
              }
            }
          }
        >Logout</div>
    </div>
  )
}
