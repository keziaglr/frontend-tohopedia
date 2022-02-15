import Header from "../../../components/Header/Header"
import { useQuery } from '@apollo/client';
import { GET_BADGE, GET_PRODUCTS_BY_ID, GET_SHOP_BY_PRODUCT, GET_TRANSACTION_BY_ID, GET_TRANSACTION_DETAIL, GET_VENDOR_BY_ID, GET_VENDOR_BY_USER, GET_VOUCHER_CART} from '../../../graphql/user/Queries'
import './TransactionPage.scss'
import { useParams } from "react-router-dom";

function TransactionDetailPage(){
    var {id} = useParams();
    var userID =  localStorage.getItem("userNow")
    const {data: headers} = useQuery(GET_TRANSACTION_BY_ID, {
        variables: {userId: parseInt(userID), id: id}
    });
    var result1 = ''
    if(headers != null){
        var header = headers.getTransactionByID
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