import Header from "../../../components/Header/Header"
import ImageGallery from "../../../components/ImageGallery/ImageGallery"
import { useMutation, useQuery } from '@apollo/client';
import {GET_SHOP_BY_PRODUCT, GET_VENDOR_BY_PRODUCT, GET_VOUCHER_BY_PRODUCT, GET_PRODUCT_BY_ID} from '../../../graphql/user/Queries'
import {CREATE_CART, CREATE_WISHLIST} from '../../../graphql/user/Mutations'
import {CardVoucher, CardShop} from "../../../components/Card/Card";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {IoChatbubbleEllipses, IoHeartSharp, IoShareSocialSharp} from 'react-icons/io5'

function ProductDetail(){
    var {id} = useParams();
    const [createCart] = useMutation(CREATE_CART)
    const [createWishlist] = useMutation(CREATE_WISHLIST)
    const [qty, setQty] = useState(1)
    
    const {data: shop} = useQuery(GET_SHOP_BY_PRODUCT, {
        variables: {productId: id}
    });
    var result4 = ''
    if(shop != null){
        result4 = 
        <div className="card-content">
            <CardShop key={shop.getShopByProduct.id} shop={shop.getShopByProduct}/>
        </div> 
    }

    const {data: product} = useQuery(GET_PRODUCT_BY_ID, {
        variables: {id: id}
    });

    var result1 = '', result5 = ''
    const [src, setSrc] = useState('');
    if(product != null){
        result1 = 
        <div className="card-content">
            <div className="container-img" style={{display: "block"}}>
                <img id="expandedImg" style={{width: "100%"}} src={src}/>
            </div>
            <div className="row">
            {product.getProductById?.images.map(image=>{        
                return(
                    <ImageGallery key={image.id} image={image} onSrcChange={setSrc} srcs={src} />
                )
            })}
            </div>
            <div>
                <h1>{product.getProductById.name}</h1>
                <h3>{product.getProductById.price}</h3>
                <h4>{product.getProductById.description}</h4>
                <p>Terjual : {product.getProductById.soldCount}</p>
                <p>Rating : {product.getProductById.rating}</p>
            </div>
        </div>

        var subtotal = product.getProductById.price* qty
        result5 = <div>
            Subtotal = {subtotal} 
        </div>
    }

    var result2 = ''
    const {data: ship} = useQuery(GET_VENDOR_BY_PRODUCT, {
        variables: {productId: id}
    });
    if(ship != null){
        result2 =
        <div>
            {ship.getVendorByProduct?.map(vendor=>{
                return(

                    <div>
                        <p>Shipping Vendor : {vendor.name}</p>
                        <ul className="a">
                            <li>Arrival Time Estimation : {vendor.deliveryTime}</li>
                            <li>Price : {vendor.price}</li>
                        </ul>
                    </div>
                )
            })}
        </div> 
    }

    var result3 = ''
    const {data: vouchers} = useQuery(GET_VOUCHER_BY_PRODUCT, {
        variables: {productId: id}
    });
    if(vouchers != null){
        result3 =
        <div className="card-content">
            {vouchers.getVoucherByProduct?.map(voucher=>{
                return(
                    <CardVoucher key={voucher.id} voucher={voucher}/>
                )
            })}
        </div> 
    }

    return(
        <div>
            <div>
                <Header/>
            </div>
            <div>
                {result1}
            </div>
                <div >
                    <form>
                        <h3>Purchase Form</h3>
                        <div>
                            <input type="button" className='btn2' value="-" id="minus" onClick={() => {
                                if(document.getElementById("qty").value > 1){
                                setQty(document.getElementById("qty").value--)}}} />
                            <input type="text" name="qty" id="qty" value={qty}/>
                            <input type="button" className='btn2' value="+" id="plus" onClick={() => setQty(document.getElementById("qty").value++)}/>
                        </div>
                        <div>
                            <input type="text" name="note" id="note" placeholder="Input Note" />
                        </div>
                        <div>
                            {result5}
                        </div>
                        <div>
                            <input type="button" className='btn' value="Add to cart" onClick={()=> {
                                if (document.getElementById("qty").value > 0){
                                    createCart({
                                        variables:{
                                            productId: id,
                                            userId: localStorage.getItem("userNow"),
                                            qty: document.getElementById("qty").value,
                                            note: document.getElementById("note").value
                                        }
                                    })
                                    alert('Success Insert Cart')
                                }
                            }} />
                            <input type="button" className='btn' value="Instant buy" />
                        </div>
                        <div className='icon'>
                            <Link to={`/chat`}>
                                <IoChatbubbleEllipses size={25}/>
                            </Link>
                            <IoHeartSharp size={25} onClick={()=>{
                                createWishlist({
                                    variables:{
                                        productId: id,
                                        userId: localStorage.getItem("userNow"),
                                    }
                                })
                                alert('Success Insert Wishlist')
                            }} />
                            <Link to={`/share`}>
                                <IoShareSocialSharp size={25}/>
                            </Link>
                        </div>
                    </form>
                </div>
            <div>
                <div>
                    <h3>Shop</h3>
                    {result4}
                </div>
                <div>
                    <h3>Shipping Vendor</h3>
                    {result2}
                </div>
                <div>
                    <h3>Voucher</h3>
                    {result3}
                </div>
                
            </div>
        </div>
    )
}

export default ProductDetail