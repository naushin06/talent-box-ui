import React from 'react'
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
<>
<div className="navbar">


  <div className="">
   <input className='h-text' type="text" placeholder='Search 8,0000 tutorials' />
  </div>
  <div className="center">
<img className='logo' src="https://www.freecodecamp.org/news/content/images/2022/07/fcc_primary_large.jpg" alt="height:" />
  </div>
  <div className="right">
  <nav>
  <ul className='btn'>
  <Link  className='btn-1' to="/register">
      Sign-In
    </Link >
    <Link className='btn-2' to="/Bye">
      Menu
    </Link>
    
  </ul>
</nav>

  </div>
</div>
 
</>
  )
}

export default Navbar