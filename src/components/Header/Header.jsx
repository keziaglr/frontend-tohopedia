import { Link, useNavigate } from 'react-router-dom'
import './Header.scss'
import {IoNotifications, IoCart, IoMail} from 'react-icons/io5'
import e from 'cors'

function Header(){
    var navigate = useNavigate()
    if(localStorage.getItem('userNow') == null){
        return(
            <NavbarAuth/>
        )
    }else{
        return(
            <NavbarCustomer/>
        )
    }
}

function NavbarAuth(){
    var navigate = useNavigate()
    return (
        <div className='navbar'>
            <div>
            <Link to={`/`}>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Logo-Tokopedia.png/1200px-Logo-Tokopedia.png' height={30} alt='logo'/>
            </Link>
            </div>
            <form>  
                <input type="text" name="search" id="search" />
                <input className='btn' type="button" value="Search" onClick={e =>{
                    var search = document.getElementById("search").value

                    if(search !== ""){
                        navigate('/search/'+search)
                    }
                }} />
            </form>
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

function NavbarCustomer(){
    var navigate = useNavigate()
    return(
        <div className='navbar'>
            <div>
            <Link to={`/`}>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Logo-Tokopedia.png/1200px-Logo-Tokopedia.png' height={30} alt='logo'/>
            </Link>
            </div>
            <form>  
                <input type="text" name="search" id="search" />
                <input className='btn' type="button" value="Search" onClick={e =>{
                    var search = document.getElementById("search").value

                    if(search !== ""){
                        navigate('/search/'+search)
                    }
                }} />
            </form>
            <div className='icon'>
                <Link to={`/cart`}>
                    <IoCart size={30}/>
                </Link>
                <Link to={`/notifications`}>
                    <IoNotifications size={30}/>
                </Link>
                <Link to={`/chat`}>
                    <IoMail size={30}/>
                </Link>
            </div>
            <div className='location'>
                Location : Jakarta
            </div>
            <ul>
                <li className="dropdown">
                    <a className="dropbtn">User</a>
                    <div className="dropdown-content">
                        <Link to={`/user/update`}>Update Profile</Link>
                        <Link to={`/wishlist`}>Wishlist</Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Header