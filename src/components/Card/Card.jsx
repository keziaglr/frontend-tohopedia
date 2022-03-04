import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { CREATE_CART } from '../../graphql/user/Mutations'
import './Card.scss'


  

export function CardProduct(props){
    return(
        <Link to={`/product/${props.product.id}`} className='card-product'>
            <img src={props.product.images[0].url} alt="image" style={{width:"100%"}}></img>
            <div className="card-container">
                <h4><b>{props.product.name}</b></h4>
                <p>{props.product.price}</p>
            </div>
        </Link>
    )
}

export function CardProductWishlist(props){
    var userID =  localStorage.getItem("userNow")
    const [createCart] = useMutation(CREATE_CART)
    return(
        <Link to={`/product/${props.product.id}`} className='card-product'>
            <img src={props.product.images[0].url} alt="image" style={{width:"100%"}}></img>
            <div className="card-container">
                <h4><b>{props.product.name}</b></h4>
                <p>{props.product.price}</p>
            </div>
            <input type="button" className='btn' value="Buy" onClick={()=>{
                createCart({
                    variables:{
                        productId: props.product.id,
                        userId: parseInt(userID),
                        qty: 1,
                        note: 'null'
                    }
                })
            }} />
        </Link>
    )
}

export function CardProductWishlist2(props){
    return(
        <div className='card-product'>
            <img src={props.product.images[0].url} alt="image" style={{width:"100%"}}></img>
            <div className="card-container">
                <h4><b>{props.product.name}</b></h4>
                <p>{props.product.price}</p>
            </div>
            <div>
                <Link to={`/buy`}><input type="button" className='btn' value="Buy" /></Link>
                <input type="checkbox" value={props.product.id} name="cbWishlistForm" />
            </div>
        </div>
    )
}

export function CardCategory(props){
    return(
        <Link to={`/category/${props.category.id}`} className='card-product'>
            <div className="card-container">
                <h4><b>{props.category.name}</b></h4>
            </div>
        </Link>
    )
}

export function CardVoucher(props){
    // console.log(props)
    return(
        <Link to={`/voucher/${props.voucher.id}`} className='card-product'>
            <div className="card-container">
                <h4><b>{props.voucher.name}</b></h4>
                <p>
                    {props.voucher.discountRate} %
                </p>
            </div>
        </Link>
    )
}

export function CardShop(props){
    return(
        <Link to={`/shop/${props.shop.id}`} className='card-product'>
            <img src={props.shop.image} alt="image" style={{width:"100%"}}></img>
            <div className="card-container">
                <h4><b>{props.shop.name}</b></h4>
            </div>
        </Link>
    )
}