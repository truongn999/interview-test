import React, { useEffect, useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
const Header = ({title = null}) => {
  const [isMenu, setIsMenu] = useState(false)

  useEffect(() => {
    const pathName = window.location.pathname
    const temp = pathName.split('/')
    if (temp[1] === 'test') setIsMenu(true)
  }, [window.location.href])
  return (
    <header>
      <Link to='/'>
        <div className='logo'>
          <img src="/logo192.png" alt="Logo app" />
        </div>
      </Link>
      {
        !isMenu && (
          <ul className='menu'>
            <li className='menu-item'><Link to='/'>Tạo câu hỏi</Link></li>
            <li className='menu-item'><Link to='/issues'>DS đề thi</Link></li>
            <li className='menu-item'><Link to='/issuer'>Tạo đề thi</Link></li>
            <li className='menu-item'><Link to='/result'>Kết quả</Link></li>
          </ul>
        )
      }
      
    </header>
  )
}

export default Header