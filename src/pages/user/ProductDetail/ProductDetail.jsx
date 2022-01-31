import Header from "../../../components/Header/Header"
import { useQuery, useMutation } from '@apollo/client';
import {GET_SHOP_BY_PRODUCT, GET_VENDOR_BY_SHOP, GET_VOUCHER_BY_SHOP, GET_PRODUCT_BY_ID} from '../../../graphql/user/Queries'
import {CardVoucher} from "../../../components/Card/Card";
import { useParams } from "react-router-dom";

function ProductDetail(){
    let {id} = useParams();
    
    const {data: shop} = useQuery(GET_SHOP_BY_PRODUCT, {
        variables: {productId: id}
    });
    console.log(shop)
    // var shopId = shop.getShopByProduct.id
    const {data: product} = useQuery(GET_PRODUCT_BY_ID, {
        variables: {id: id}
    });

    var result1 = ''
    if(product != null){
        result1 = 
        <div className="card-content">
            {product.getProductById.images?.map(image=>{
                return(
                    <img key={image.id} width={500} src={image.url}/>
                )
            })}
        </div>
    }

    var result2 = ''
    const {data: ship} = useQuery(GET_VENDOR_BY_SHOP, {
        variables: {shopId: shop.getShopByProduct.id}
    });
    if(ship != null){
        result2 =
        <div>
            {ship.getVendorByShop?.map(vendor=>{
                return(
                    <p>
                        Shipping Vendor : {vendor.name}
                        Arrival Time Estimation : {vendor.deliveryTime}
                        Price : {vendor.price}
                    </p>
                )
            })}
        </div> 
    }

    var result3 = ''
    const {data: voucher} = useQuery(GET_VOUCHER_BY_SHOP, {
        variables: {shopId: shop.getShopByProduct.id}
    });
    if(voucher != null){
        result3 =
        <div className="card-content">
            {voucher.getVoucherByShop?.map(voucher=>{
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
            <div>
                <h3>{product.getProductById.name}</h3>
                <h5>{product.getProductById.price}</h5>
                <h6>{product.getProductById.description}</h6>
                <p>Terjual {product.getProductById.soldCount}</p>
                <p>Rating {product.getProductById.rating}</p>
            </div>
            <div>
                <img src={shop.getShopByProduct.image}/>
                <p>{shop.getShopByProduct.name}</p>
            </div>
            <div>
                {result2}
            </div>
            <div>
                {result3}
            </div>
        </div>
    )
}

export default ProductDetail