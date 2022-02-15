import { Link, useNavigate } from 'react-router-dom'
import './Header.scss'
import {IoNotifications, IoCart, IoMail} from 'react-icons/io5'
import e from 'cors'
import { useQuery } from '@apollo/client'
import { GET_SHOP_BY_USER, GET_USER_BY_ID } from '../../graphql/user/Queries'

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
    var userID = localStorage.getItem('userNow')
    var navigate = useNavigate()
    const {data: user} = useQuery(GET_USER_BY_ID, {
        variables:{id : parseInt(localStorage.getItem('userNow'))}
    });
    const {data: shop} = useQuery(GET_SHOP_BY_USER, {
        variables: {userId: parseInt(userID)}
    });
    var result = '', result2 = '', result3 =''
    if(user != null){
        result =
        <div className='location'>
                Location : {user.getUserByID.shippingAddress[0].address}
        </div>

        result2 = 
        <div>
            <img src={user.getUserByID.profilePicture} className="pp" width={25} alt="hai" />
            <a className="dropbtn"> 
                {user.getUserByID.name}
            </a>
        </div>
    }
    if(shop != null){
        result3 = 
        <div>
            <img src={shop.getShopByUser.image} className="pp" width={25} alt="hai" />
            <a className="dropbtn"> 
                {shop.getShopByUser.name}
            </a>
        </div>
    }
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
            {result}
            <ul>
                <li className="dropdown">
                    {result3}
                    <div className="dropdown-content">
                        <ShopSection/>
                    </div>
                </li>
            </ul>
            <ul>
                <li className="dropdown">
                    {result2}
                    <div className="dropdown-content">
                        <Link to={`/user/update`}>Update Profile</Link>
                        <Link to={`/wishlist`}>Wishlist</Link>
                        <Link to={`/transaction`}>Transaction</Link>
                        <Link to={`/logout`}>Logout</Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}

function ShopSection(){
    var userID = localStorage.getItem('userNow')
    const {data: shop} = useQuery(GET_SHOP_BY_USER, {
        variables: {userId: parseInt(userID)}
    });
    // console.log(shop)

    if(shop == null){
        return <Link to={`/shop/create`}>Create Shop</Link>
    }else{
        return <div>
            <Link to={`/shop/${shop.getShopByUser.id}`}>Shop</Link>
            <Link to={`/shop/update/${shop.getShopByUser.id}`}>Edit Shop</Link>
        </div>
    }
}

export default Header