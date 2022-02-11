import Header from "../../../components/Header/Header"
import { useMutation, useQuery } from '@apollo/client';
import {CARTS, GET_USER_WISHLIST} from '../../../graphql/user/Queries'
import {CREATE_CART, DELETE_WISHLIST} from '../../../graphql/user/Mutations'
import {CardProduct} from "../../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillDelete, AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

function CartPage(){
    var userID =  localStorage.getItem("userNow")
    const [deleteWishlist] = useMutation(DELETE_WISHLIST)
    const [createCart] = useMutation(CREATE_CART)
    var navigate = useNavigate();
    const {data} = useQuery(CARTS, {
        variables: {userId: parseInt(userID)}
    });
    var result = '', result1 = ''
    if(data != null){
        const productList = data.carts
        result = <div className="card-content">
            {productList?.map(product=>{
                return(
                    <tr style={{background:"white"}}>
                        <td><input type="checkbox" name="" id="" /></td>
                        <td><CardProduct key={product.id} product={product}/></td>
                        <td> <AiFillDelete size={20}/> </td>
                        <td><AiFillPlusCircle size={20}/></td>
                        <td></td>
                        <td><AiFillMinusCircle size={20}/></td>
                    </tr>
                )
            })}
        </div>
    }

    const {data: wishlist} = useQuery(GET_USER_WISHLIST, {
        variables: {userId: parseInt(userID)}
    });

    if(wishlist != null){
        const wishlistList = wishlist.getUserWishlist
        result1 = <div className="card-content">
            {wishlistList?.map(product=>{
                return(
                    <tr style={{background:"white"}}>
                        <td><CardProduct key={product.id} product={product}/></td>
                        <td> 
                            <div>
                                <AiFillDelete className="icon" size={20} onClick={()=>{
                                    deleteWishlist({
                                        variables:{
                                            userId: parseInt(userID),
                                            productId: product.id
                                        }
                                    })
                                }}/>
                                <input type="button" className="btn" value="Add to Cart" onClick={()=>{
                                    createCart({
                                        variables:{
                                            productId: product.id,
                                            userId: parseInt(userID),
                                            qty: 1,
                                            note: ''
                                        }
                                    })
                                    alert('Success insert Cart')
                                }} />
                            </div>
                        </td>
                              
                    </tr>
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
            <table>
                <tbody>
                    {result}
                </tbody>
            </table>
            </div>
            <div>
                <h3>Wishlist</h3>
            </div>
            <div>
            <table>
                <tbody>
                    {result1}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default CartPage