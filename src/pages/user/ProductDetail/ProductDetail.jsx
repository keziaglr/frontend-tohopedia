import Header from "../../../components/Header/Header"
import { useQuery } from '@apollo/client';
import {GET_SHOP_BY_PRODUCT, GET_VENDOR_BY_PRODUCT, GET_VOUCHER_BY_PRODUCT, GET_PRODUCT_BY_ID} from '../../../graphql/user/Queries'
import {CardVoucher} from "../../../components/Card/Card";
import { useParams } from "react-router-dom";

function ProductDetail(){
    var {id} = useParams();
    
    const {data: shop} = useQuery(GET_SHOP_BY_PRODUCT, {
        variables: {productId: id}
    });
    // console.log(shop)
    const {data: product} = useQuery(GET_PRODUCT_BY_ID, {
        variables: {id: id}
    });
    console.log(product)

    var result1 = ''
    if(product != null){
        result1 = 
        <div className="card-content">
            {product.getProductById?.images.map(image=>{
                return(
                    <img key={image.id} width={500} src={image.url} alt={image.name}/>
                )
            })}
        </div>
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
            <div>
                <h3>{product.getProductById.name}</h3>
                <h5>{product.getProductById.price}</h5>
                <h6>{product.getProductById.description}</h6>
                <p>Terjual {product.getProductById.soldCount}</p>
                <p>Rating {product.getProductById.rating}</p>
            </div>
            <div>
                <img src={shop.getShopByProduct.image} alt={shop.getShopByProduct.name}/>
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