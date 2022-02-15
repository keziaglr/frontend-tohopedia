import Header from "../../../components/Header/Header"
import { useMutation, useQuery } from '@apollo/client';
import {CARTS, CARTS2, GET_USER_WISHLIST, GET_VOUCHER_CART} from '../../../graphql/user/Queries'
import {CREATE_CART, DELETE_WISHLIST, DELETE_CART} from '../../../graphql/user/Mutations'
import {CardProduct} from "../../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillDelete, AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

function CartPage(){
    var userID =  localStorage.getItem("userNow")
    const [totalPrice, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0)
    const [deleteWishlist] = useMutation(DELETE_WISHLIST)
    const [deleteCart] = useMutation(DELETE_CART)
    const [createCart] = useMutation(CREATE_CART)
    var navigate = useNavigate();
    const {data} = useQuery(CARTS, {
        variables: {userId: parseInt(userID)}
    });

    const {data: cart2} = useQuery(CARTS2, {
        variables: {userId: parseInt(userID)}
    });

    var result3 = ''
    var result = '', result1 = '', arrCart = [], arrProduct = [], arrDisc = [], idx = 0
    const {data: vouchers} = useQuery(GET_VOUCHER_CART, {
        variables: {userId: parseInt(userID)}
    });
    if(vouchers != null){
        result3 =
        <select id="voucherId">
            <option value="">Choose</option>
            {vouchers.getVoucherCart?.map(voucher=>{
                arrDisc.push(voucher)
                return(
                    <option value={voucher.id}>{voucher.name}</option>
                )
            })}
        </select>
    }
    if(data != null){
        if(cart2 != null){
            const productList = data.carts
            const cartList = cart2.carts2
            {cartList?.map(cart=>{ 
                arrCart.push(cart)
            })}
            result = 
            <form className="container-wishlist" id="checkOutForm">
                {productList?.map(product=>{
                    arrProduct.push(product)
                        return(
                            <div style={{background:"white"}}>
                                {/* <div><input type="checkbox" name="cbCheckout" id="cbCheckout" value={idx} /></div> */}
                                <div><img src={product.images[0].url} width={100} alt="" /></div>
                                <div>{product.name}</div>
                                <div>IDR {product.price}</div>
                                <div> <AiFillDelete size={20} onClick={
                                    ()=>{
                                        deleteCart({
                                            variables:{
                                                productId: product.id,
                                                userId: parseInt(userID)
                                            }
                                        })
                                        alert('Success Delete Cart')
                                    }
                                } /> </div>
                                <div><AiFillMinusCircle size={20} onClick={()=>{
                                    createCart({
                                        variables:{
                                            productId: product.id,
                                            userId: parseInt(userID),
                                            qty: -1,
                                            note: 'null'
                                        }
                                    })
                                    alert('Success decrease qty Cart')                            
                                }} /></div>
                                <div>{arrCart[idx++].qty}</div>
                                <div><AiFillPlusCircle size={20} onClick={()=>{
                                    createCart({
                                        variables:{
                                            productId: product.id,
                                            userId: parseInt(userID),
                                            qty: 1,
                                            note: 'null'
                                        }
                                    })
                                    alert('Success increase qty Cart')                            
                                }} /></div>
                            </div>
                        )        
                    })}
                    <input type="button" className="btn" value="Refresh" onClick={()=>{
                        var total = 0, disc = 0
                        for (let i = 0; i < arrDisc.length; i++) {
                            if(document.getElementById('voucherId').value == arrDisc[i].id){
                                for (let index = 0; index < arrProduct.length; index++) {
                                    disc += arrProduct[index].price * (arrDisc[i].discountRate/100)
                                }
                            }
                        }

                        for (let index = 0; index < arrProduct.length; index++) {
                            total += arrProduct[index].price * arrCart[index].qty
                        }

                        setTotal(total)
                        setDiscount(disc)

                    }} />
            </form>
        }
        }
    const {data: wishlist} = useQuery(GET_USER_WISHLIST, {
        variables: {userId: parseInt(userID)}
    });

    if(wishlist != null){
        const wishlistList = wishlist.getUserWishlist
        result1 = <div className="container-wishlist">
            {wishlistList?.map(product1=>{
                return(
                    <div key={product1.id} >
                        <div><img src={product1.images[0].url} width={100} alt="" /></div>
                        <div>
                            <div>
                                {product1.name}
                            </div>
                            <div>
                                {product1.price}
                            </div>
                        </div>
                        <div></div>
                        <div> 
                            <div>
                                <AiFillDelete className="icon" size={20} onClick={()=>{
                                    var num  = []
                                    num.push(product1.id)
                                    deleteWishlist({
                                        variables:{
                                            userId: parseInt(userID),
                                            productId: num
                                        }
                                    })
                                    alert('Success Delete Wishlist')
                                }}/>
                                <input type="button" className="btn" value="Add to Cart" onClick={()=>{
                                    createCart({
                                        variables:{
                                            productId: product1.id,
                                            userId: parseInt(userID),
                                            qty: 1,
                                            note: 'null'
                                        }
                                    })
                                    alert('Success insert Cart')
                                }} />
                            </div>
                        </div> 
                    </div>
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
                <h3>Cart</h3>
            </div>
            <div>
            <div>
                <div>
                    {result}
                </div>
            </div>
            </div>
            <div>
                <h3>Wishlist</h3>
            </div>
            <div>
            <div>
                <div>
                    {result1}
                </div>
            </div>
            </div>
            <div>
                <h4>Shopping Summary</h4>
                {result3}
                <li>Total Price (Item) : IDR {totalPrice}</li>
                <li>Total Discount Item(s) : IDR -{discount}</li>
                <li> <b>Grand Total : IDR {totalPrice - discount}</b> </li>
                <input type="button" value="Buy" className="btn" onClick={()=>navigate('/checkout')} />
            </div>
        </div>
    )
}

export default CartPage