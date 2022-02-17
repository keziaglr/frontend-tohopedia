import Header from "../../../components/Header/Header"
import { useMutation, useQuery } from '@apollo/client';
import {CARTS, CARTS2, GET_USER_BY_ID, GET_VENDOR_BY_USER, GET_VOUCHER_CART} from '../../../graphql/user/Queries'
import {CardProduct} from "../../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CHECKOUT } from "../../../graphql/user/Mutations";

function CheckoutPage(){
    var userID =  localStorage.getItem("userNow")
    const [totalPrice, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0)
    const [discount1, setDiscount1] = useState(0)
    const [checkout] = useMutation(CHECKOUT)
    var navigate = useNavigate();
    const {data} = useQuery(CARTS, {
        variables: {userId: parseInt(userID)}
    });

    const {data: cart2} = useQuery(CARTS2, {
        variables: {userId: parseInt(userID)}
    });

    const {data: user} = useQuery(GET_USER_BY_ID, {
        variables: {id: parseInt(userID)}
    });


    var result3 = '', result4 = '', arrQty = [], arrProductId = []
    var result = '', result1 = '', arrCart = [], arrProduct = [], arrDisc = [], arrVendor = [],idx = 0
    if(user != null){
        result1 =
        <select name="address" id="address">
            {user.getUserByID.shippingAddress?.map(address=>{
                return(
                    <option value={address.address}>{address.address}</option>
                )
            })}
        </select>
    }

    const {data: vouchers} = useQuery(GET_VOUCHER_CART, {
        variables: {userId: parseInt(userID)}
    });
    if(vouchers != null){
        result3 =
        <select id="voucherId">
            <option value="0">Choose</option>
            {vouchers.getVoucherCart?.map(voucher=>{
                arrDisc.push(voucher)
                return(
                    <option value={voucher.id}>{voucher.name}</option>
                )
            })}
        </select>
    }

    const {data: ships} = useQuery(GET_VENDOR_BY_USER, {
        variables: {userId: parseInt(userID)}
    });
    if(ships != null){
        result4 =
        <select id="shipsId">
            <option value="">Choose</option>
            {ships.getVendorByUser?.map(vendor=>{
                arrVendor.push(vendor)
                return(
                    <option value={vendor.id}>{vendor.name} - {vendor.price}</option>
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
                arrQty.push(cart.qty)
            })}
            result = 
            <form className="container-wishlist" id="checkOutForm">
                {productList?.map(product=>{
                    arrProduct.push(product)
                    arrProductId.push(product.id)
                        return(
                            <div style={{background:"white"}}>
                                <div><img src={product.images[0].url} width={100} alt="" /></div>
                                <div>{product.name}</div>
                                <div>{arrCart[idx++].qty} item</div>
                                <div style={{ textDecorationLine: 'line-through' }}>IDR {product.price}</div>
                                <div> <b>IDR {product.price-(discount1*product.price)-product.discount}</b></div>
                            </div>
                        )        
                    })}
                    <input type="button" className="btn" value="Refresh" onClick={()=>{
                        var total = 0, disc = 0
                        var flag
                        if(document.getElementById('voucherId').value != ""){
                            for (let i = 0; i < arrDisc.length; i++) {
                                if(document.getElementById('voucherId').value == arrDisc[i].id){
                                    flag = arrDisc[i].discountRate/100
                                    for (let index = 0; index < arrProduct.length; index++) {
                                        disc += (arrProduct[index].price * (arrDisc[i].discountRate/100)) + arrProduct[index].discount
                                    }
                                }
                            }
                        }else{
                            flag = 0
                            for (let index = 0; index < arrProduct.length; index++) {
                                disc += arrProduct[index].discount
                            }
                        }
                        
                        for (let index = 0; index < arrProduct.length; index++) {
                            total += arrProduct[index].price * arrCart[index].qty
                        }
                        var temp
                        
                        if(document.getElementById('shipsId').value == ""){
                            temp = total
                        }else{
                            for (let index = 0; index < arrVendor.length; index++) {
                                if(arrVendor[index].id == document.getElementById('shipsId').value){
                                    temp = total+ arrVendor[index].price
                                }
                            }
                            
                        }
                        
                        setTotal(temp)
                        setDiscount1(flag)
                        setDiscount(disc)

                    }} />
            </form>
        }
        }

    return(
        <div>
            <div>
                <Header/>
            </div>
            <div>
                <h3>Checkout</h3>
            </div>
            <div>
                <div>Shipping Address</div>
                <div>{result1}</div>
            <div>
                <div>
                    {result}
                </div>
            </div>
            <div>
                <div>Shipping Vendor</div>
                <div>
                    {result4}
                </div>
            </div>
            <div>
                <div>Payment Type</div>
                <div>
                    <select name="payment" id="payment">
                        <option value="OVO">OVO</option>
                        <option value="GoPay">GoPay</option>
                    </select>
                </div>
            </div>
            </div>
            <div>
                <h4>Shopping Summary</h4>
                {result3}
                <li>Total Price (Item) : IDR {totalPrice}</li>
                <li>Total Discount Item(s) : IDR -{discount}</li>
                <li> <b>Grand Total : IDR {totalPrice - discount}</b> </li>
                <input type="button" value="Checkout" className="btn" onClick={()=>{
                    if( document.getElementById('address').value != "" || document.getElementById('shipsId').value != "" || document.getElementById('voucherId').value != "" || document.getElementById('payment').value != ""){
                        checkout({
                            variables:{
                                userId: parseInt(userID),
                                transactionType: "Belanja",
                                paymentMethod: document.getElementById('payment').value,
                                shippingId: document.getElementById('shipsId').value,
                                shippingAddress: document.getElementById('address').value,
                                paymentDiscount: discount,
                                voucherId: document.getElementById('voucherId').value,
                                productId: arrProductId,
                                qty: arrQty,
                                total: totalPrice
                            }
                        })
                        alert('Success Checkout')
                    }else{
                        alert('All field must be filled')
                    }
                }}/>
            </div>
        </div>
    )
}

export default CheckoutPage