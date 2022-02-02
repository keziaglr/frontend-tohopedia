import Header from "../../../components/Header/Header"
import { useQuery, useMutation } from '@apollo/client';
import {LOAD_CAMPAIGNS, LOAD_DISC_PRODUCTS, LOAD_CATEGORIES} from '../../../graphql/user/Queries'
import {CardProduct, CardCategory} from "../../../components/Card/Card";
import ImageCarousel from "../../../components/Carousel/ImageCarousel";
import React, { useState, useEffect } from 'react'

function HomePage(){
    const {data: data3} = useQuery(LOAD_CAMPAIGNS);
    const [slideIndex, setIndex] = useState(1)
    var result3 = ''
    // useEffect(
    //     () => {
    //       let timer1 = setTimeout(() => setIndex(slideIndex+1), 10000);
    //       if(slideIndex >= 15) setIndex(1) 
    //       return () => {
    //         clearTimeout(timer1);
    //       };
    //     },
    // )

    if(data3 != null){
        result3 = 
        <div>
            <div className="slideshow-container" style={{width:"800px"}}>
            {data3.campaigns?.map(campaign=>{
                if(campaign.id === slideIndex){
                    return(
                        <ImageCarousel key={campaign.id} campaign={campaign} style={{display:"block"}}/>
                    )
                }
                })}
            <a className="prev" onClick={() => setIndex(slideIndex - 1)}>&#10094;</a>
            <a className="next" onClick={() => setIndex(slideIndex + 1)}>&#10095;</a>
            </div>
        </div>
    }


    const {data} = useQuery(LOAD_DISC_PRODUCTS);
    var result = ''
    if(data != null){
        const productList = data.getProductsTopDisc
        result = <div className="card-content">
            {productList?.map(product=>{
                return(
                    <CardProduct key={product.id} product={product}/>
                )
            })}
        </div>
    }

    var result1 = ''
    const {data: data1} = useQuery(LOAD_CATEGORIES);
    if(data1 != null){
        const categoriesList = data1.categories;
        result1 = <div className="card-content">
            {categoriesList?.map(category=>{
                return(
                    <CardCategory key={category.id} category={category}/>
                )
            })}
        </div>
    }

    const {data: data2} = useQuery(LOAD_DISC_PRODUCTS);
    var result2 = ''
    if(data2 != null){
        const productList2 = data2.getProductsTopDisc
        result2 = <div className="card-content">
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
            <div>
                {result3}
            </div>
            <div>
                <h4>Top 15 Discount Items</h4>
                {result}
            </div>
            <div>
                <h4>Recommended For You</h4>
                {result2}
            </div>
            <div>
                <h4>Categories</h4>
                {result1}
            </div>
        </div>
    )
}

export default HomePage