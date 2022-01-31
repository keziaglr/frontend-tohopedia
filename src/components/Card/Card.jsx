import { Link } from 'react-router-dom'
import './Card.scss'

export function CardProduct(props){
    return(
        <Link to={`product/${props.product.id}`} className='card-product'>
            <img src={props.product.images[0].url} alt="image" style={{width:"100%"}}></img>
            <div className="card-container">
                <h4><b>{props.product.name}</b></h4>
                <p>{props.product.price}</p>
            </div>

        </Link>
    )
}

export function CardCategory(props){
    return(
        <Link to={`category/${props.category.id}`} className='card-product'>
            <div className="card-container">
                <h4><b>{props.category.name}</b></h4>
            </div>
        </Link>
    )
}

export function CardVoucher(props){
    console.log(props)
    return(
        <Link to={`voucher/${props.voucher.id}`} className='card-product'>
            <div className="card-container">
                <h4><b>{props.voucher.name}</b></h4>
                <p>
                    {props.voucher.discountRate} %
                </p>
            </div>
        </Link>
    )
}