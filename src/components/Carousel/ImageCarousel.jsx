import Carousel from 'flat-carousel';
import { useQuery } from '@apollo/client';
import React, {useEffect} from 'react'
import {LOAD_CAMPAIGNS} from '../../graphql/user/Queries'


export default function ImageCarousel () {
    const {loading, error, data} = useQuery(LOAD_CAMPAIGNS);

    console.log(data)
    return(
        <Carousel>
            {data.campaigns.map((image, index) => (
                <div
                    key={index}
                    className="demo-item"
                    style={{ backgroundImage: 'url(' + image.url + ')' }}
                />
            ))}
        </Carousel>
    )
}