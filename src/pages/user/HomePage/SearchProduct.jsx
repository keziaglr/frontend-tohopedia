import Header from "../../../components/Header/Header"
import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import {LOAD_PRODUCTS_SEARCH, GET_SHOP_MATCH, GET_PRODUCTS_MATCH} from '../../../graphql/user/Queries'
import {CardProduct, CardShop} from "../../../components/Card/Card";
import { useParams } from "react-router-dom";

function SearchProduct(){
    let {q} = useParams();
    const [sort, setSort] = useState('suitable')
    const [filter, setFilter] = useState('')

    const {data: products} = useQuery(LOAD_PRODUCTS_SEARCH, {
        variables: {search: q, sort: sort, filter: filter}
    });

    const {data: shop} = useQuery(GET_SHOP_MATCH, {
        variables: {search: q}
    });

    const {data: productsMatch} = useQuery(GET_PRODUCTS_MATCH, {
        variables: {search: q}
    });

    var result = ''
    var productList = ''
    if(products != null){
        productList = products.getProductsSearch
        result = <div className="card-content">
            {productList?.map(product=>{
                return(
                    <CardProduct key={product.id} product={product}/>
                )
            })}
        </div>
    }

    var result1 = ''
    if(productsMatch != null){
        const productList1 = productsMatch.getProductsMatch
        result1 = <div className="card-content">
            {productList1?.map(product=>{
                return(
                    <CardProduct key={product.id} product={product}/>
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
                <label>Sort</label>
                <select style={{margin: "30px"}} name="sort" id="sort">
                    <option value="suitable">Suitable</option>
                    <option value="rating">Rating</option>
                    <option value="latest">Latest</option>
                    <option value="highPrice">Highest Price</option>
                    <option value="lowPrice">Lowest Price</option>
                </select>
                <input type="button" value="Sort" onClick={e=>{
                    alert('halo')
                    setSort(document.getElementById('sort').value)
                }}/>
            </div>
            <div style={{display:"flex"}}>
                <div>
                    <h4>Recommended Shop</h4>
                    <div className="card-content">
                        <CardShop key={shop.getShopMatch.id} shop={shop.getShopMatch}/>
                    </div> 
                </div>
                <div>
                    <h4>Recommended Products</h4>
                    {result1}
                </div>
            </div>
            <div>
                <h4>Related Products</h4>
                {result}
            </div>
        </div>
    )
}

export default SearchProduct