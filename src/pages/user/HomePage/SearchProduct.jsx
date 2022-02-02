import Header from "../../../components/Header/Header"
import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import {LOAD_PRODUCTS_SEARCH, GET_SHOP_MATCH, GET_PRODUCTS_MATCH, LOAD_COURIERS} from '../../../graphql/user/Queries'
import {CardProduct, CardShop} from "../../../components/Card/Card";
import { useParams } from "react-router-dom";

function SearchProduct(){
    let {q} = useParams();
    const [sort, setSort] = useState('suitable')
    const [shopType, setShopType] = useState(null)
    const [location, setLocation] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [courier, setCourier] = useState(null)
    const [rating, setRating] = useState(null)
    const [duration, setDuration] = useState(null)
    const [productAdded, setProductAdded] = useState(null)

    console.log(shopType)
    function getValue(name) {
        var form = document.getElementById("searchForm");
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

    function getValue1(name) {
        var value = document.getElementById(name).value
        if(value === "") return null
        return value;
    } 
    const {data: products} = useQuery(LOAD_PRODUCTS_SEARCH, {
        variables: {search: q, sort: sort, type: shopType, location: location, maxPrice: maxPrice, minPrice: minPrice, courier: courier, rating: rating, shippingTime: duration, productAdded: productAdded}
    });

    const {data: couriers} = useQuery(LOAD_COURIERS)

    const {data: shop} = useQuery(GET_SHOP_MATCH, {
        variables: {search: q}
    });

    const {data: productsMatch} = useQuery(GET_PRODUCTS_MATCH, {
        variables: {search: q}
    });
    // console.log(products)
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

    var courierRes = ''
    if(couriers != null){
        const courierList = couriers.vendors
        courierRes = 
        <div>
            <label>Courier</label>
            {courierList?.map(courier=>{
                return(
                    <div key={courier.id}>
                        <input type="checkbox" name="couriers" id="" value={courier.id} />
                        <label>{courier.name}</label>
                    </div>
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
                <form name="searchForm" id="searchForm" style={{display:"flex"}}>
                    <div>
                        <label>Sort</label>
                        <select style={{margin: "30px"}} name="sort" id="sort">
                            <option value="suitable">Suitable</option>
                            <option value="rating">Rating</option>
                            <option value="latest">Latest</option>
                            <option value="highPrice">Highest Price</option>
                            <option value="lowPrice">Lowest Price</option>
                        </select>
                    </div>
                    <div>
                        <label>Filter</label>
                        <div style={{display:"flex"}}>
                            <div>
                                <label>Shop Type</label>
                                <div>
                                    <div>
                                        <input type="checkbox" name="shopType" id="type1" value="1" />
                                        <label>Official Store</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="shopType" id="type2" value="2" />
                                        <label>Power Merchant Pro</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="shopType" id="type3" value="3" />
                                        <label>Power Merchant</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>Location</label>
                                    <div>
                                        <input type="checkbox" name="location" id="" value="jawa" />
                                        <label>Jawa</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="location" id="" value="kalimantan" />
                                        <label>Kalimantan</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="location" id="" value="maluku" />
                                        <label>Kepulauan Maluku</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="location" id="" value="nusa tenggara" />
                                        <label>Kepulauan Nusa Tenggara</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="location" id="" value="papua" />
                                        <label>Papua</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="location" id="" value="sumatra" />
                                        <label>Sumatra</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="location" id="" value="sulawesi" />
                                        <label>Sulawesi</label>
                                    </div>
                            </div>
                            <div>
                                <label>Price</label>
                                <div>
                                <input type="number" name="minPrice" placeholder="Minimum Price" id="minPrice" />
                                <input type="number" name="maxPrice" placeholder="Maximum Price" id="maxPrice" />
                                </div>
                            </div>
                            {courierRes}
                            <div>
                            <div>
                                <label>Rating</label>
                                <div>
                                <select name="rating" id="rating">
                                    <option value="">Select</option>
                                    <option value="5">More than equal to 5</option>
                                    <option value="4">More than equal to 4</option>
                                    <option value="3">More than equal to 3</option>
                                    <option value="2">More than equal to 2</option>
                                    <option value="1">More than equal to 1</option>
                                </select>
                                </div>
                            </div>
                            <div>
                                <label>Delivery Duration</label>
                                <div>
                                    <input type="number" name="duration" id="duration" />
                                </div>
                            </div>
                            <div>
                                <label>Last Added</label>
                                <div>
                                    <input type="number" name="added" id="added" />
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="button" value="Submit" onClick={e=>{
                            setShopType(getValue("shopType"))
                            setLocation(getValue("location"))
                            setCourier(getValue("couriers"))
                            setMinPrice(getValue1('minPrice'))
                            setMaxPrice(getValue1('maxPrice'))
                            setRating(getValue1('rating'))
                            setDuration(getValue1('duration'))
                            setProductAdded(getValue1('added'))
                            setSort(document.getElementById('sort').value)
                        }}/>
                    </div>
                </form>
            </div>
            <div style={{display:"flex"}}>
                <div>
                    <h4>Recommended Shop</h4>
                    <div className="card-content">
                        {/* <CardShop key={shop.getShopMatch.id} shop={shop.getShopMatch}/> */}
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