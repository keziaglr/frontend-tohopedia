import Header from "../../../components/Header/Header"
import ImageGallery from "../../../components/ImageGallery/ImageGallery"
import { useMutation, useQuery } from '@apollo/client';
import {GET_SHOP_BY_PRODUCT, GET_VENDOR_BY_PRODUCT, GET_VOUCHER_BY_PRODUCT, GET_PRODUCT_BY_ID, GET_SHOP_BY_USER, GET_USER_BY_ID, GET_REVIEW_BY_TYPE, GET_REVIEW_DETAIL, GET_SHOP_BY_ID, GET_BADGE, GET_DISCUSSION, GET_DISCUSSION_DETAIL} from '../../../graphql/user/Queries'
import {CREATE_CART, CREATE_CHAT_HEADER, CREATE_DISCUSSION, CREATE_DISCUSSION_REPLY, CREATE_WISHLIST} from '../../../graphql/user/Mutations'
import {CardVoucher, CardShop} from "../../../components/Card/Card";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {IoChatbubbleEllipses, IoHeartSharp, IoShareSocialSharp, IoStar} from 'react-icons/io5'
import { DeleteProduct } from "../ManageProduct/ManageProduct";
import { Source } from "graphql";
import e from "cors";

function ProductDetail(){
    var {id} = useParams();
    var navigate = useNavigate()
    const [createCart] = useMutation(CREATE_CART)
    const [createWishlist] = useMutation(CREATE_WISHLIST)
    const [qty, setQty] = useState(1)
    const [filter, setFilter] = useState("")
    const [type, setType] = useState("")
    const {data: shop1} = useQuery(GET_SHOP_BY_USER,{
        variables:{userId: parseInt(localStorage.getItem('userNow'))}
    })
    const {data: shop} = useQuery(GET_SHOP_BY_PRODUCT, {
        variables: {productId: id}
    });

    const {data: review} = useQuery(GET_REVIEW_BY_TYPE, {
        variables: {productID: id, typeReview: type, filter: filter}
    });

    const {data: discussion} = useQuery(GET_DISCUSSION, {
        variables: {productId: id}
    });

    var result4 = '', btn = '', result6 = '', chatIcon = ''
    if(shop1 != null){
        chatIcon = <IoChatbubbleEllipses size={25} onClick={()=>{
            createHeaderChat({
                variables:{
                    shopId: shop1.getShopByUser.id,
                    userId: parseInt(localStorage.getItem("userNow")),
                }
            })
            alert('Success Insert Chat')
        }} />
        if(shop1.getShopByUser.user_id == localStorage.getItem('userNow')){
            btn =
            <div>
                <Link to={`/product/update/${id}`}>
                <input type="button" value="Update" className="btn" />
                </Link>
                <DeleteProduct product={id}/>
            </div>
        }
    }
    if(shop != null){
        result4 = 
        <div className="card-content">
            <CardShop key={shop.getShopByProduct.id} shop={shop.getShopByProduct}/>
        </div> 
    }

    const {data: product} = useQuery(GET_PRODUCT_BY_ID, {
        variables: {id: id}
    });

    var result1 = '', result5 = ''
    const [src, setSrc] = useState('');
    if(product != null){
        result1 = 
        <div className="card-content">
            <div className="container-img" style={{display: "block"}}>
                <img id="expandedImg" style={{width: "100%"}} src={src}/>
            </div>
            <div className="row">
            {product.getProductById?.images.map(image=>{        
                return(
                    <ImageGallery key={image.id} image={image} onSrcChange={setSrc} srcs={src} />
                )
            })}
            </div>
            <div>
                <h1>{product.getProductById.name}</h1>
                <h3>{product.getProductById.price}</h3>
                <h4>{product.getProductById.description}</h4>
                <p>Terjual : {product.getProductById.soldCount}</p>
                <p>Rating : {product.getProductById.rating}</p>
            </div>
        </div>

        var subtotal = product.getProductById.price* qty
        result5 = <div>
            Subtotal = {subtotal} 
        </div>
    }

    if(review != null){
        result6 = <div >
        <h3>Review</h3>
        <form action="formReview">
            <div>
                <select name="filter" id="filter">
                    <option value="">All</option>
                    <option value="5">5 stars</option>
                    <option value="4">4 stars</option>
                    <option value="3">3 stars</option>
                    <option value="2">2 stars</option>
                    <option value="1">1 stars</option>
                    <option value="img">With Image</option>
                </select>
            </div>
            <input type="button" value="Filter" className="btn" onClick={()=>{
                setFilter(document.getElementById('filter').value)
                
            }} />
        </form>
        {review.getReviewsByType.map(review=>{
            return(
                <div style={{margin: "50px 0px 0px 0px"}} >
                    <div className="container-wishlist">
                        <UserReview user={review.user_id} review={review}/>
                        <div>{review.createdAt}</div>
                    </div>
                    <ReviewReply id={review.id}/>
                </div>
            )
        })}
        </div> 
    }
    const [createHeaderChat] = useMutation(CREATE_CHAT_HEADER)
    const [createDiscussionReply] = useMutation(CREATE_DISCUSSION_REPLY)
    const [createDiscussion] = useMutation(CREATE_DISCUSSION)
    var result7 = ''
    if(discussion != null){
        if(shop1 != null){
            if(shop1.getShopByUser.id == id){
                result7=
                <div>
                        <h3>Discussion</h3>
                        <div>
                        <input type="text" name="discussion" id="discussion" placeholder="Input New Discussion"/>
                            <input type="button" className="btn" value="Create Discussion" onClick={()=>{
                                
                                if(document.getElementById('discussion').value != ""){
                                    createDiscussion({
                                        variables:{
                                            userId: parseInt(localStorage.getItem('userNow')),
                                            productId: id,
                                            content: document.getElementById('discussion1').value
                                        }
                                    })
                                    alert('Success Create Discussion')
                                }else{
                                    alert('All field must be filled')
                                }
                            }} />
                        </div>
                    {discussion.getDiscussion.map(discussion=>{
                    return(
                        <div style={{margin: "50px 0px 0px 0px"}} >
                            <div className="container-wishlist">
                                <UserDiscussion user={discussion.user_id} discussion={discussion}/>
                                <div>{discussion.createdAt}</div>
                                <div><input type="text" name="reply" id={"reply"+discussion.id} placeholder="Input Reply Discussion"/>
                                <input type="button" value="Reply" className="btn" onClick={()=>{
                                    var temp = 'reply'+discussion.id
                                    if(document.getElementById(temp).value != ""){
                                        createDiscussionReply({variables:
                                        {
                                            discussionId: discussion.id,
                                            sourceId: id,
                                            role: "Shop",
                                            messsage: document.getElementById(temp).value
                                        }})
                                        alert('Success Reply Discussion')
                                    }else{
                                        alert('All field must be filled')
                                    }
                                }} />
                                </div>
                            
                            </div>
                            <DiscussionReply key={discussion.id} id={discussion.id}/>
                        </div>
                    )
                })}
                </div>
        }else{
            result7=
            <div>
                <div>

                <h3>Discussion</h3>
                    <div>
                        <input type="text" name="discussion" id="discussion" placeholder="Input New Discussion"/>
                        <input type="button" className="btn" value="Create Discussion" onClick={()=>{
                            
                            if(document.getElementById('discussion').value != ""){
                                createDiscussion({
                                    variables:{
                                        userId: parseInt(localStorage.getItem('userNow')),
                                        productId: id,
                                        content: document.getElementById('discussion').value
                                    }
                                })
                                alert('Success Create Discussion')
                            }else{
                                alert('All field must be filled')
                            }
                        }} />
                    </div>
                </div>
                {discussion.getDiscussion.map(discussion=>{
                return(
                    <div style={{margin: "50px 0px 0px 0px"}} >
                        <div className="container-wishlist">
                            <UserDiscussion user={discussion.user_id} discussion={discussion}/>
                            <div>{discussion.createdAt}</div>
                            <div><input type="text" name="reply" id="reply" placeholder="Input Reply Discussion"/>
                            <input type="button" value="Reply" className="btn" onClick={()=>{
                               var temp = 'reply'+discussion.id
                               if(document.getElementById(temp).value != ""){
                                    createDiscussionReply({variables:
                                    {
                                        discussionId: discussion.id,
                                        sourceId: parseInt(localStorage.getItem('userNow')),
                                        role: "User",
                                        messsage: document.getElementById(temp).value
                                    }})
                                    alert('Success Reply Discussion!')
                                }else{
                                    alert('All field must be filled')
                                }
                            }} />
                            </div>
                        
                        </div>
                        <DiscussionReply id={discussion.id}/>
                    </div>
                )
            })}
            </div>            
        }
    }
    }


    var result2 = ''
    const {data: ship} = useQuery(GET_VENDOR_BY_PRODUCT, {
        variables: {productId: id}
    });
    if(ship != null){
        result2 =
        <div>
            {ship.getVendorByProduct?.map(vendor=>{
                return(

                    <div>
                        <p>Shipping Vendor : {vendor.name}</p>
                        <ul className="a">
                            <li>Arrival Time Estimation : {vendor.deliveryTime}</li>
                            <li>Price : {vendor.price}</li>
                        </ul>
                    </div>
                )
            })}
        </div> 
    }

    var result3 = ''
    const {data: vouchers} = useQuery(GET_VOUCHER_BY_PRODUCT, {
        variables: {productId: id}
    });
    if(vouchers != null){
        result3 =
        <div className="card-content">
            {vouchers.getVoucherByProduct?.map(voucher=>{
                return(
                    <CardVoucher key={voucher.id} voucher={voucher}/>
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
                {result1}
            </div>
                <div >
                    <form>
                        <h3>Purchase Form</h3>
                        <div>
                            <input type="button" className='btn2' value="-" id="minus" onClick={() => {
                                if(document.getElementById("qty").value > 1){
                                setQty(document.getElementById("qty").value--)}}} />
                            <input type="text" name="qty" id="qty" value={qty}/>
                            <input type="button" className='btn2' value="+" id="plus" onClick={() => setQty(document.getElementById("qty").value++)}/>
                        </div>
                        <div>
                            <input type="text" name="note" id="note" placeholder="Input Note" />
                        </div>
                        <div>
                            {result5}
                        </div>
                        <div>
                            <input type="button" className='btn' value="Add to cart" onClick={()=> {
                                if (document.getElementById("qty").value > 0){
                                    createCart({
                                        variables:{
                                            productId: id,
                                            userId: localStorage.getItem("userNow"),
                                            qty: document.getElementById("qty").value,
                                            note: document.getElementById("note").value
                                        }
                                    })
                                    alert('Success Insert Cart')
                                }
                            }} />
                            <input type="button" className='btn' value="Instant buy" onClick={()=>{
                                if (document.getElementById("qty").value > 0){
                                    createCart({
                                        variables:{
                                            productId: id,
                                            userId: localStorage.getItem("userNow"),
                                            qty: document.getElementById("qty").value,
                                            note: document.getElementById("note").value
                                        }
                                    })
                                    navigate('/checkout')
                                }
                            }}/>
                        </div>
                        <div className='icon'>
                            {/* <Link to={`/chat`}> */}
                                {chatIcon}
                            {/* </Link> */}
                            <IoHeartSharp size={25} onClick={()=>{
                                createWishlist({
                                    variables:{
                                        productId: id,
                                        userId: localStorage.getItem("userNow"),
                                    }
                                })
                                alert('Success Insert Wishlist')
                            }} />
                            <Link to={`/share`}>
                                <IoShareSocialSharp size={25}/>
                            </Link>
                        </div>
                    </form>
                </div>
            <div>
                <div>
                    <h3>Shop</h3>
                    {result4}
                </div>
                <div>
                    <h3>Shipping Vendor</h3>
                    {result2}
                </div>
                <div>
                    <h3>Voucher</h3>
                    {result3}
                </div>
                <div>
                    {btn}
                </div>
                <div>
                    {result6}
                </div>
                <div>
                    {result7}
                </div>
            </div>
        </div>
    )
}

function UserReview(props){
    const {data: user} = useQuery(GET_USER_BY_ID, {
        variables:{id: props.user}
    })

    var result = ''
    if(user != null){
        if(props.review.type != "Anonymous"){

        result = 
        <div>
        <img src={user.getUserByID.profilePicture} className="pp" width={50} height={50} alt="hai" />
        <div> 
            <div>
               <b>{user.getUserByID.name}</b>  
            </div>
            <div>
                 {props.review.description}
            </div>
            <div>
                 {props.review.score}
                 <IoStar/>
            </div>
            <img src={props.review.image} width={100} alt="" />
        </div>
    </div>
        }else{
            result = 
            <div>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="pp" width={50} height={50} alt="hai" />
            <div> 
                <div>
                   <b>Anonymous</b>  
                </div>
                <div>
                     {props.review.description}
                </div>
                <div>
                     {props.review.score}
                     <IoStar/>
                </div>
                <img src={props.review.image} width={100} alt="" />
            </div>
        </div>
        }

    }
    return result
}

function UserDiscussion(props){
    const {data: user} = useQuery(GET_USER_BY_ID, {
        variables:{id: props.user}
    })

    var result = ''
    if(user != null){

        result = 
            <div>
            <img src={user.getUserByID.profilePicture} className="pp" width={50} height={50} alt="hai" />
            <div> 
                <div>
                <b>{user.getUserByID.name}</b>  
                </div>
                <div>
                    {props.discussion.content}
                </div>
            </div>
        </div>
        }
    return result
}


function ReviewReply(props){
    const {data: review} = useQuery(GET_REVIEW_DETAIL, {
        variables:{reviewId: props.id}
    })
    
    var result = ''
    if(review != null){
        if(review.getReviewDetail.length != 0){
            result = 
        <div>
            {review.getReviewDetail?.map(r=>{  
                if(r.role == "Shop"){
                    return(
                        <div className="container-wishlist" style={{"margin-top": "10px"}}>
                            <div>
                                <div><b><ShopSource id={r.source_id}/></b></div>
                                <div>{r.messsage}</div></div>
                        </div>
                    )
                }else if(r.role == "User"){
                    return(
                        <div className="container-wishlist" style={{"margin-top": "10px"}}>
                            <div>
                                <div><b><UserSource id={r.source_id}/></b></div>
                                <div>{r.messsage}</div></div>
                        </div>
                    )
                }
            })}
        </div>
        }
    }
    return result
}

function UserSource(props){
    const {data: user} = useQuery(GET_USER_BY_ID, {
        variables:{
            id: props.id
        }
    })

    var result = ''
    if(user != null){
        result = user.getUserByID.name
    }
    return result
}

function ShopSource(props){
    const {data: shop} = useQuery(GET_SHOP_BY_ID, {
        variables:{
            shopId: props.id
        }
    })

    const {data: badge} = useQuery(GET_BADGE, {
        variables: {shopID: props.id}
    });

    var result = '', chatIcon = ''
    if(shop != null){
        if(badge != null){
            result = 
                <div>{shop.getShopByID.name} ({badge.getBadge.badge}) </div>
            
        }
    }
    return result
}


function DiscussionReply(props){
    const {data: review} = useQuery(GET_DISCUSSION_DETAIL, {
        variables:{discussionId: props.id}
    })
    
    var result = ''
    if(review != null){
        if(review.getDiscussionDetail.length != 0){
            result = 
            <div>
            {review.getDiscussionDetail?.map(r=>{  
                if(r.role == "Shop"){
                    return(
                        <div className="container-wishlist" style={{"margin-top": "10px"}}>
                            <div>
                                <div><b><ShopSource id={r.source_id}/></b></div>
                                <div>{r.messsage}</div></div>
                        </div>
                    )
                }else if(r.role == "User"){
                    return(
                        <div className="container-wishlist" style={{"margin-top": "10px"}}>
                            <div>
                                <div><b><UserSource id={r.source_id}/></b></div>
                                <div>{r.messsage}</div></div>
                        </div>
                    )
                }
            })}
        </div>
        }
    }
    return result
}

export default ProductDetail