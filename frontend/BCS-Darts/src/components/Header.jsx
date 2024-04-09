import Nav from './Nav'
import { Link } from 'react-router-dom'

export default function Header () {
  return(
    <div className='header'>
      This is the header.
      <Nav/>
      <Link to="/signup">
        <img style={{ width: '65px', height: '40px'}}
        src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
        alt="login_img" />
      </Link>
    </div>
  )
}