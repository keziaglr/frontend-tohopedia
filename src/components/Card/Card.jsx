import { Link } from 'react-router-dom'

function Card(props){
    // const product = props.getProductsTopDisc
    // console.log("di props")
    // console.log(props)
    // console.log(props.product.images[0].id)
    return(
        <Link to={`product/${props.product.id}`} className='card-product'>
            <img src={props.product.images[0].url} alt="image" style={{width:"50%"}}></img>
            <div class="container">
                <h4><b>{props.product.name}</b></h4>
                <p>{props.product.price}</p>
            </div>
        </Link>
    )
}

export default Card