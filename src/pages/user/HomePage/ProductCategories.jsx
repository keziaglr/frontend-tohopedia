import Header from "../../../components/Header/Header"
import { useQuery } from '@apollo/client';
import {GET_PRODUCTS_BY_CATEGORIES} from '../../../graphql/user/Queries'
import {CardProduct} from "../../../components/Card/Card";
import { useParams } from "react-router-dom";

function ProductCategories(){
    let {id} = useParams();
    const {data} = useQuery(GET_PRODUCTS_BY_CATEGORIES, {
        variables: {categoryId: id}
    });
    var result = ''
    if(data != null){
        const productList = data.getProductsByCategories
        result = <div className="card-content">
            {productList?.map(product=>{
                return(
                    <CardProduct key={product.id} product={product}/>
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
                {result}
            </div>
        </div>
    )
}

export default ProductCategories