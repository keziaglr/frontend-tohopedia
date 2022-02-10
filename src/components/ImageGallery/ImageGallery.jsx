import React, {useCallback} from 'react'
import './ImageGallery.scss'

function ImageGallery (props) {
    const handleChange = useCallback(event => {
        props.onSrcChange(event.target.src)
    }, [props.src])

    return(
        <div className="column">
            <img key={props.image.id} id={props.image.id} src={props.image.url} alt={props.image.id} style={{width:"100%"}} onClick={handleChange}/>
        </div>
    )
}

export default ImageGallery