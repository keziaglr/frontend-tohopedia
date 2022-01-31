import { Link } from 'react-router-dom'
import './Header.scss'
import {IoNotifications, IoCart, IoMail} from 'react-icons/io5'

function Header(){
    return(
        <div className='navbar'>
            <div>
                <input type="text" name="search" id="search" />
                <input className='btn' type="button" value="Search" />
            </div>
            <div className='icon'>
                <Link to={`/cart`}>
                    <IoCart size={30}/>
                </Link>
                <Link to={`/notifications`}>
                    <IoNotifications size={30}/>
                </Link>
                <Link to={`/mail`}>
                    <IoMail size={30}/>
                </Link>
            </div>
            <div>
                <Link to={`/login`}>
                    <input className='btn' type="button" value="Login" />
                </Link>
                <Link to={`/register`}>
                    <input id='registerBtn' className='btn' type="button" value="Register" />
                </Link>
            </div>
            <div className='location'>
                Location : Jakarta
            </div>
        </div>
    )
}

export default Header