import Header from "../../../components/Header/Header"
import { useQuery } from '@apollo/client';
import { GET_BADGE, GET_PRODUCTS_BY_ID, GET_SHOP_BY_PRODUCT, GET_TRANSACTION_BY_USER, GET_TRANSACTION_DETAIL, GET_USER_BY_ID, GET_VENDOR_BY_USER, GET_VOUCHER_CART} from '../../../graphql/user/Queries'
import './TransactionPage.scss'
import { useState } from "react";
import { Link } from "react-router-dom";

function TransactionPage(){
    const [keyword, setKeyword] = useState(null);
    const [date, setDate] = useState(null)
    const [status, setStatus] = useState(null)
    var userID =  localStorage.getItem("userNow")
    const {data: headers} = useQuery(GET_TRANSACTION_BY_USER, {
        variables: {userId: parseInt(userID), keyword: keyword, status: status, date: date}
    });
    var result1 = ''
    if(headers != null){
        result1 =
        <div>
            {headers.getTransactionByUser?.map(header=>{
                return(
                    <Link to={`/transaction/${header.id}`}>
                    <div style={{margin: "50px 0px"}} className="container2">
                        <div>Transaction Type : {header.transactionType}</div>
                        <div>Transaction Date : {header.transactionDate}</div>
                        <div>Transaction Status : {header.status}</div>
                        <div>Invoice Number : {header.invoiceNumber}</div>
                        <DetailSection  detail={header} />
                        <div> <b>Total : {header.total}</b> </div>
                    </div>
                    </Link>
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
                <h3>Transaction List</h3>
            </div>
            <form id="formTransaction">
                <div>
                    <input type="text" name="keyword" id="keyword" />
                </div>
                <div>
                    <select name="status" id="status">
                        <option value="">Semua</option>
                        <option value="Berlangsung">Berlangsung</option>
                        <option value="Berhasil">Berhasil</option>
                        <option value="Tidak Berhasil">Tidak Berhasil</option>
                    </select>
                </div>
                <div>
                    <input type="date" name="date" id="date" />
                </div>
                <input type="button" value="Filter" className="btn" onClick={()=>{
                    setKeyword(getValue('keyword'))
                    setStatus(getValue('status'))
                    setDate(getValue('date'))
                }} />
            </form>
            <div>
                {result1}
            </div>
        </div>
    )

    function getValue(name){
        var value = document.getElementById(name).value
        if(value === "") return null
        return value;
    }
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
                        <ProductSection product={detail.product_id}/>
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

export default TransactionPage