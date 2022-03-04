import Header from "../../../components/Header/Header"
import { Query } from '@apollo/client/react/components';
import { useQuery, useMutation } from '@apollo/client';
import {LOAD_CAMPAIGNS, LOAD_DISC_PRODUCTS, LOAD_CATEGORIES, PRODUCTS} from '../../../graphql/user/Queries'
import {CardProduct, CardCategory} from "../../../components/Card/Card";
import ImageCarousel from "../../../components/Carousel/ImageCarousel";
import React, { useState, useEffect } from 'react'
import { onError } from "@apollo/client/link/error";
import { Footer } from "../../../components/Footer/Footer";
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductQueryList } from "./ProductQueryList";

function HomePage(){

    // onError(({ graphQLErrors, networkError }) => {
    //   if (graphQLErrors)
    //     graphQLErrors.forEach(({ message, locations, path }) =>
    //       console.log(
    //         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
    //       )
    //     );
    //   if (networkError) console.log(`[Network error]: ${networkError}`);
    // });


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

    var fetchMoreData = () => {
        setTimeout(() => {
            if(limit <= 15){
                setLimit(limit+5)
            }
        }, 1500);
    };

    const [limit, setLimit] = useState(5)

    const {data: data2} = useQuery(PRODUCTS, {
        variables: {limit:limit, offset: 0}
    });
    var result2 = ''

    if(data2 != null){
        const productList2 = data2.products
        console.log(productList2)
        result2 = 
        <InfiniteScroll dataLength={productList2.length} next={fetchMoreData}
        hasMore={true} loader={<h4>Loading...</h4>}>
            <div className="card-content">
            {productList2?.map(product=>{
                return(
                    <CardProduct key={product.id} product={product}/>
                )
            })}
        </div>
        </InfiniteScroll> 
    }

    // const handleScroll = ({ currentTarget }, onLoadMore) => {
    //     if (
    //       currentTarget.scrollTop + currentTarget.clientHeight >=
    //       currentTarget.scrollHeight
    //     ) {
    //       onLoadMore();
    //     }
    // };
    
    // const ProductList = ({ products, onLoadMore }) => (
    //     <div>
    //       <ul
    //         onScroll={e => handleScroll(e, onLoadMore)}
    //       >
    //         {products?.map(product=>{
    //             return(
    //                 <CardProduct key={product.id} product={product}/>
    //             )
    //         })}
    //       </ul>
    //     </div>
    // );

    // const ProductQueryList = () => (
    //     <Query query={PRODUCTS}>
    //       {({ data2, fetchMore }) =>
    //         data2 && (
    //           <ProductList
    //             products={data2.products || []}
    //             onLoadMore={() =>
    //               fetchMore({
    //                 variables: {
    //                   offset: data2.products.length
    //                 },
    //                 updateQuery: (prev, { fetchMoreResult }) => {
    //                   if (!fetchMoreResult) return prev;
    //                   return Object.assign({}, prev, {
    //                     chapters: [...prev.products, ...fetchMoreResult.products]
    //                   });
    //                 }
    //               })
    //             }
    //           />
    //         )
    //       }
    //     </Query>
    //   );
        // }


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
                {result}
            </div>
            <div>
                <h4>Categories</h4>
                {result1}
            </div>
            <div>
            <h4>Products</h4>
                {/* <ProductQueryList/> */}
                {result2}
                <Footer/>
            </div>
        </div>
    )
}

export default HomePage