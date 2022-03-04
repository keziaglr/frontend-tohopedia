import { useQuery } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { CardProduct } from "../../../components/Card/Card";
import { PRODUCTS } from "../../../graphql/user/Queries";

const handleScroll = ({ currentTarget }, onLoadMore) => {
    console.log(currentTarget.scrollTop + currentTarget.clientHeight)
    if (
      currentTarget.scrollTop + currentTarget.clientHeight >=
      currentTarget.scrollHeight
    ) {
      onLoadMore();
    }
};


export const ProductList = ({ products, onLoadMore }) => (
    <div onScroll={console.log('hi')}>
        {products?.map(product=>{
            // console.log(products)
            return(
                <CardProduct key={product.id} product={product}/>
                )
                // return (
                    
                    //     <li>{product.name}</li>
                    // )
                })}
    </div>
);



export function ProductQueryList() { 

    const { data, fetchMore } = useQuery(
        PRODUCTS,
        {
          variables: {
            offset: 0
          },
          fetchPolicy: "cache-and-network"
        }
      );
    
    // console.log(data)
    var res = '';
    if (data != null){
        res = 
        <ProductList
            products={data.products || []}
            onLoadMore={() =>
              fetchMore({
                variables: {
                  offset: data.products.length
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    products: [...prev.products, ...fetchMoreResult.products]
                  });
                }
              })
            }
          />
    }

    return res;
    // <Query query={PRODUCTS}>
    //   {({ data, fetchMore }) =>
    //   data &&
    //     (
    //       <ProductList
    //         products={data.products || []}
    //         onLoadMore={() =>
    //           fetchMore({
    //             variables: {
    //               offset: data.products.length
    //             },
    //             updateQuery: (prev, { fetchMoreResult }) => {
    //               if (!fetchMoreResult) return prev;
    //               return Object.assign({}, prev, {
    //                 chapters: [...prev.products, ...fetchMoreResult.products]
    //               });
    //             }
    //           })
    //         }
    //       />
    //     )
    //   }
    // </Query>
  };