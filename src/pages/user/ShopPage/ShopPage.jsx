import Header from "../../../components/Header/Header"
import { useQuery, useMutation } from '@apollo/client';
import {GET_SHOP_BY_ID, GET_BEST_SELLING_PRODUCTS, GET_PRODUCTS_BY_SHOP, GET_BADGE, GET_SHOP_BY_USER} from '../../../graphql/user/Queries'
import {CardProduct, CardShop} from "../../../components/Card/Card";
import ImageCarousel from "../../../components/Carousel/ImageCarousel";
import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import YouTube from 'react-youtube';
import './ShopPage.scss'

function ShopPage(){
    var {id} = useParams();
    const [slideIndex, setIndex] = useState(1)
    // var result3 = ''
    // // useEffect(
    // //     () => {
    // //       let timer1 = setTimeout(() => setIndex(slideIndex+1), 10000);
    // //       if(slideIndex >= 15) setIndex(1) 
    // //       return () => {
    // //         clearTimeout(timer1);
    // //       };
    // //     },
    // // )

    const {data: shop1} = useQuery(GET_SHOP_BY_USER, {
        variables: {userId: parseInt(localStorage.getItem('userNow'))}
    });

    var btn = ''
    if(shop1 != null){
        btn = 
        <div>
            <Link to={`/product/insert`}>
                <input type="button" value="Insert Product" className="btn"  />
            </Link>
        </div>
    }

    const {data: shop} = useQuery(GET_SHOP_BY_ID, {
        variables: {shopId: id}
    });

    console.log(id)

    const {data: badge} = useQuery(GET_BADGE, {
        variables: {shopID: id}
    });

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };
    var result = '', result1 = '', result2 = '', result3 = ''

    if(shop != null){
        console.log(shop)
        result1 = 
        <div className="card-content">
            <CardShop key={shop.getShopByID.id} shop={shop.getShopByID}/>
        </div> 

        
        if(badge != null){
            result =             
            <h4 className="tooltip">{badge.getBadge.badge}
                <span className="tooltiptext"> {shop.getShopByID.points} Points</span>
            </h4>
        }

        result2 = 
        <div>
            <div className="slideshow-container" style={{width:"800px"}}>
            {shop.getShopByID.promo?.map(campaign=>{
                if(campaign.idx === slideIndex){
                    return(
                        <ImageCarousel key={campaign.id} campaign={campaign} style={{display:"block"}}/>
                    )
                }
                })}
            <a className="prev" onClick={() => setIndex(slideIndex - 1)}>&#10094;</a>
            <a className="next" onClick={() => setIndex(slideIndex + 1)}>&#10095;</a>
            </div>
        </div>

        if(shop.getShopByID.video != ''){
            result3 = <YouTube videoId={shop.getShopByID.video} opts={opts}  />;
        }
        
    }

    const {data: bestSelling} = useQuery(GET_BEST_SELLING_PRODUCTS, {
        variables: {shopId: id}
    });
    var result4 = ''
    if(bestSelling != null){
        const productList = bestSelling.getBestSellingProducts
        result4 = <div className="card-content">
            {productList?.map(product=>{
                return(
                    <CardProduct key={product.id} product={product}/>
                )
            })}
        </div>
    }

    const {data: products} = useQuery(GET_PRODUCTS_BY_SHOP, {
        variables: {shopID: id}
    });
    var result6 = ''
    if(products != null){
        const productList2 = products.getProductsByShop
        result6 = <div className="card-content">
            {productList2?.map(product=>{
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
            <div style={{display: "flex"}}>
                <div>
                    {result1}
                </div>
                <div>
                    {result}
                    <div>
                        {btn}
                    </div>
                </div>
                
            </div>
            <div>
                {result2}
            </div>
            <div>
                {result3}
            </div>
            <div>
                <h4>Best Selling Products</h4>
                {result4}
            </div>
            <div>
                <h4>Product Recommendations</h4>
                {result4}
            </div>
            <div>
                <h4>Products</h4>
                {result6}
            </div>
        </div>
    )
}

export default ShopPage