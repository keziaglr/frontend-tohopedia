import Header from "../../../components/Header/Header"
import { useMutation, useQuery } from '@apollo/client';
import {CARTS, GET_USER_WISHLIST} from '../../../graphql/user/Queries'
import {CREATE_CART, DELETE_WISHLIST, DELETE_CART} from '../../../graphql/user/Mutations'
import {CardProduct} from "../../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillDelete, AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

function CartPage(){
    var userID =  localStorage.getItem("userNow")
    const [deleteWishlist] = useMutation(DELETE_WISHLIST)
    const [deleteCart] = useMutation(DELETE_CART)
    const [createCart] = useMutation(CREATE_CART)
    var navigate = useNavigate();
    const {data} = useQuery(CARTS, {
        variables: {userId: parseInt(userID)}
    });
    var result = '', result1 = ''
    if(data != null){
        const productList = data.carts
        result = 
        <div className="container-wishlist">
            {productList?.map(product=>{
                return(
                    <div style={{background:"white"}}>
                        <div><input type="checkbox" name="" id="" /></div>
                        <div><img src={product.images[0].url} width={100} alt="" /></div>
                        <div>{product.name}</div>
                        <div>{product.price}</div>
                        {/* <div><CardProduct key={product.id} product={product}/></div> */}
                        <div> <AiFillDelete size={20} onClick={
                            ()=>{
                                deleteCart({
                                    variables:{
                                        productId: product.id,
                                        userId: parseInt(userID)
                                    }
                                })
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
                        <div></div>
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
        </div>
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
        </div>
    )
}

export default CartPage