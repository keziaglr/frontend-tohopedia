import Header from "../../../components/Header/Header"
import { useMutation, useQuery } from '@apollo/client';
import {GET_USER_WISHLIST} from '../../../graphql/user/Queries'
import {DELETE_WISHLIST} from '../../../graphql/user/Mutations'
import {CardProductWishlist, CardProductWishlist2} from "../../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function WishlistPage(){
    var userID =  localStorage.getItem("userNow")
    var navigate = useNavigate();
    const {data} = useQuery(GET_USER_WISHLIST, {
        variables: {userId: parseInt(userID)}
    });
    var result = ''
    if(data != null){
        const productList = data.getUserWishlist
        result = <div className="card-content">
            {productList?.map(product=>{
                return(
                    <CardProductWishlist key={product.id} product={product}/>
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
                <h3>Wishlist</h3>
                <input type="button" value="Change Wishlist" className="btn" onClick={
                    () => {
                        
                        navigate('/wishlist2')
                    }
                } />
            </div>
            <div>
                {result}
            </div>
        </div>
    )
}

function WishlistPage2(){
    var userID =  localStorage.getItem("userNow")
    var navigate = useNavigate();
    const [productId, setProductId] = useState([]);
    const [deleteWishlist] = useMutation(DELETE_WISHLIST)
    const {data} = useQuery(GET_USER_WISHLIST, {
        variables: {userId: parseInt(userID)}
    });


    function getValue(name) {
        var form = document.getElementById("wishlistForm");
        var inputs = form.getElementsByTagName("input");
        var values = [];
        for (var i = 0; i < inputs.length; ++i) {
            if (inputs[i].type === "checkbox" && 
                inputs[i].name === name &&
                inputs[i].checked) 
            {
                values.push(inputs[i].value);
            }
        }
        if(values.length === 0) return null
        return values;
    }

    var result = ''
    if(data != null){
        const productList = data.getUserWishlist
        result = <div className="card-content">
            {productList?.map(product=>{
                return(
                    <CardProductWishlist2 key={product.id} product={product} productId={productId}/>
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
                <h3>Wishlist</h3>
                <input type="button" value="Delete Wishlist" className="btn" onClick={
                    ()=>{
                        // setProductId(getValue("cbWishlistForm"))
                        // console.log(getValue("cbWishlistForm"))
                        deleteWishlist({
                            variables:{
                                userId: parseInt(userID),
                                productId: getValue("cbWishlistForm")
                            }
                        })
                        alert('Success Delete Wishlist')
                    }
                } />
                <input type="button" value="Cancel" className="btn" onClick={
                    ()=>{
                        navigate('/wishlist')
                    }
                }/>
            </div>
            <div>
                <form id="wishlistForm">
                    {result}
                </form>
            </div>
        </div>
    )
}

export {WishlistPage, WishlistPage2}