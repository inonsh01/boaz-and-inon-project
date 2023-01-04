import React from 'react'
import {Link} from 'react-router-dom'
import '../style/homePage.css'
export default function homePage() {
  
  return (
    <div>
      <h1 className='welcome'>Welcome to the Fucking website</h1>
      <Link className='btn' to = "/login">login</Link>
    </div>
  )
}
