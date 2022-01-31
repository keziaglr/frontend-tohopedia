import Header from "../../../components/Header/Header"
import Card from "../../../components/Card/Card"
import { useQuery, useMutation } from '@apollo/client';
import {LOAD_CAMPAIGNS, LOAD_DISC_PRODUCTS} from '../../../graphql/user/Queries'

function HomePage(){
    // const {loading, error, data} = useQuery(LOAD_CAMPAIGNS);
    const {loading, error, data} = useQuery(LOAD_DISC_PRODUCTS);

    var result = ''
    
    if(data != null){
        const productList = data.getProductsTopDisc
        result = <div className="card-container">
            {productList?.map(product=>{
                return(
                    <Card key={product} product={product}/>
                )
            })}
        </div>
    }

    // console.log(result)

    return(
        <div>
            <div>
                <Header/>
            </div>
            <div>
                {/* {
                  data.campaigns.map((item,i) => <img src={item.url}></img> ) 
                } */}
            </div>
            <div>
                <h4>Top 15 Discount Items</h4>
                {result}
            </div>
            
        </div>
    )
}

export default HomePage