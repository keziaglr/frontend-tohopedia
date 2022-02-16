import Header from "../../../components/Header/Header"
import { useMutation, useQuery } from '@apollo/client';
import { GET_BADGE, GET_PRODUCTS_BY_ID, GET_SHOP_BY_PRODUCT, GET_TRANSACTION_BY_ID, GET_TRANSACTION_DETAIL, GET_VENDOR_BY_ID, GET_VENDOR_BY_USER, GET_VOUCHER_CART} from '../../../graphql/user/Queries'
import './TransactionPage.scss'
import { useParams } from "react-router-dom";
import { CREATE_REVIEW } from "../../../graphql/user/Mutations";
import { Footer } from "../../../components/Footer/Footer";

function TransactionDetailPage(){
    var {id} = useParams();
    var userID =  localStorage.getItem("userNow")
    const {data: headers} = useQuery(GET_TRANSACTION_BY_ID, {
        variables: {userId: parseInt(userID), id: id}
    });

    const [createReview] = useMutation(CREATE_REVIEW)
    var result1 = ''
    if(headers != null){
        var header = headers.getTransactionByID
//$userId: Int!, $transactionId: Int!, $score: Int!, $description: String!, $image: String!, $typeReview: String!
        var form = ''
        if(header.status == "Selesai"){
            form = <form className="container" style={{"margin":"0px 500px"}}>
                <div><h3>Review</h3></div>
                
                <div>
                    <label htmlFor="desc">Description</label>
                    <input type="text" name="desc" id="desc" />
                </div>
                <div>
                    <label htmlFor="score">Score</label>
                    <input type="number" max={5} name="score" id="score" />
                </div><div>
                    <label htmlFor="image">Image</label>
                    <input type="text" name="image" id="image" />
                </div>
                <div>
                    <select name="type" id="type">
                        <option value="">Public</option>
                        <option value="Anonymous">Anonymous</option>
                    </select>
                </div>
                <div>
                <input type="button" value="Submit" className="btn" onClick={()=>{
                    if(document.getElementById('score').value == "" || document.getElementById('desc').value == ""){
                        alert('All fields must be filled')
                    }else{
                        if(document.getElementById('image').value != "") {
                            createReview({
                                variables:{
                                    userId: parseInt(userID),
                                    transactionId: id,
                                    score: document.getElementById('score').value,
                                    description: document.getElementById('desc').value,
                                    image: document.getElementById('image').value,
                                    typeReview: document.getElementById('type').value
                                }
                            })
                        }else if(document.getElementById('image').value == "") {
                            createReview({
                                variables:{
                                    userId: parseInt(userID),
                                    transactionId: id,
                                    score: document.getElementById('score').value,
                                    description: document.getElementById('desc').value,
                                    image: "null",
                                    typeReview: document.getElementById('type').value
                                }
                            })
                        }

                        alert('Success Insert Review')
                    }
                }}/>
                </div>
            </form>
        }

        result1 =
        <div>
            <div style={{margin: "50px 0px"}} className="container2">
                <div>Transaction Status : {header.status}</div>
                <div>Invoice Number : {header.invoiceNumber}</div>
                <div>Transaction Date : {header.transactionDate}</div>
                <DetailSection  detail={header} />
                <VendorSection vendor={header.shipping_id} />
                <div>Shipping Address : {header.shippingAddress} </div>
                <div>Payment Method : {header.paymentMethod}</div>
                <div>Payment Discounts : {header.paymentDiscount}</div>
            </div>
        </div>
    }

    return(
        <div>
            <div>
                <Header/>
            </div>
            <div>
                <h3>Transaction Detail</h3>
            </div>
            <div>
                {result1}
            </div>
            {form}
            <Footer/>
        </div>
    )
}

function DetailSection(props){
    var userID =  localStorage.getItem("userNow")
    const {data: details} = useQuery(GET_TRANSACTION_DETAIL, {
        variables: {userId: parseInt(userID), transactionId: props.detail.id}
    });
    var result = ''
    if(details != null){
        result =
        <div id="detail-transaction">
            {details.getTransactionDetail?.map(detail=>{
                return(
                    <div className="container2">
                        <ProductSection product={detail.product_id} qty={detail.qty}/>
                    </div>
                )
            })}
        </div>
    }

    return result
}

function ProductSection(props){
    const {data: products} = useQuery(GET_PRODUCTS_BY_ID, {
        variables: {id: props.product}
    });

    const {data: shop} = useQuery(GET_SHOP_BY_PRODUCT, {
        variables: {productId: props.product}
    });
    var result = ''
    if(products != null){
        if(shop != null){
        result =
            <div>
                <ShopSection shop={shop.getShopByProduct.id} />
                <div>{shop.getShopByProduct.name}</div>
                <img src={products.getProductById.images[0].url}  width={100} alt="" />
                <div>{products.getProductById.name}</div>
                <div>{props.qty} item(s)</div>
                <div>IDR {products.getProductById.price}</div>
                <div>Subtotal : IDR {props.qty * products.getProductById.price}</div>
            </div>
        }
    }

    return result
}

function ShopSection(props){
    const {data: badge} = useQuery(GET_BADGE, {
        variables: {shopID: props.shop}
    });
    var result = ''
    if(badge != null){
        result = 
        <div>{badge.getBadge.badge}</div>
    }

    return result
}

function VendorSection(props){
    const {data: vendor} = useQuery(GET_VENDOR_BY_ID, {
        variables: {id: props.vendor}
    });
    console.log(vendor)
    var result = ''
    if(vendor != null){
        result = 
        <div>Shipping Vendor : {vendor.getVendorByID.name}</div>
    }

    return result
}

export default TransactionDetailPage