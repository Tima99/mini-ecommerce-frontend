import React from 'react'
import { useLayoutEffect } from 'react'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import req from "../api/request"

export const EntryPage = () => {
  const [authUser, setAuthUser] = useState(null)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    (async()=>{
       try {
          const res = await req.get('/auth')
          // console.log(res.data);

          setAuthUser(res.data)
          navigate('/home', {replace: true})
       } catch (error) {
          setAuthUser(false)
       }
    })()
  }, [])

  if(authUser === null){
    return (
      <div className='full-display center'>
        <h2>Loading...</h2>
      </div>
    )
  }
  
  return (
    <div className='full-display center'>
        <section className="container">
            <Outlet />
        </section>
    </div>
  )
}
