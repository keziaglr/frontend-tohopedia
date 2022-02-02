import React, {useEffect} from 'react'
import './ImageCarousel.scss'

function ImageCarousel (props) {
    return(
        <div className="mySlides fade">
            <img src={props.campaign.url} style={{width:"100%"}}/>
        </div>
    )
}

export default ImageCarousel