import { Link, useNavigate } from 'react-router-dom'
import './Header.scss'
import {IoNotifications, IoCart, IoMail} from 'react-icons/io5'

function Header(){
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