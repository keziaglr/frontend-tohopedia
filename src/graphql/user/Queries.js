import { gql } from '@apollo/client';

export const GET_USER_AUTH = gql`
    query getUserAuth($email: String!, $password: String!, $otp: String!){
        getUserAuth(input:{email: $email, password: $password, otpCode: $otp}){
            id,
            email,
            password
        }
    }
`

export const GET_USER_EMAIL_PASS = gql`
    query getUserByEmailPass($email: String!, $password: String!){
        getUserByEmailPass(email: $email, password: $password){
            id,
            email,
            password,
            isSuspend
        }
    }
`

export const GET_USER_BY_EMAIL = gql`
    query getUserByEmail($email: String!){
        getUserByEmail(input:{email: $email}){
            id,
            email,
            password
        }
    }
`

export const LOAD_CAMPAIGNS = gql`
    query campaigns{
        campaigns{
            url
        }
    }
`

export const LOAD_COURIERS = gql`
    query couriers{
        vendors{
            id,
            name
        }
    }
`

export const LOAD_DISC_PRODUCTS = gql`
    query GetProductsTopDisc{
        getProductsTopDisc{
            id,
            name,
            price,
            discount,
            images{
            id,
            url
            }
        }
    }
`

export const LOAD_PRODUCTS_SEARCH = gql`
query GetProductsByShop($search: String!, $sort: String, $type: [Int], $location: [String], $maxPrice: Int, $minPrice: Int, $courier: [Int], $rating: Int, $shippingTime: Int, $productAdded:Int){
    getProductsSearch(search: $search, sort: $sort, input:{type: $type, location: $location, maxPrice: $maxPrice, minPrice: $minPrice, courier: $courier, rating: $rating, shippingTime: $shippingTime, productAdded: $productAdded} ){
        id,
        name,
    		price,
    		rating,
    		images{
          id,
          url
        }
    }
}
`

export const LOAD_CATEGORIES = gql`
    query Categories{
        categories{
            id,
            name
        }
    }
`

export const GET_PRODUCT_BY_ID = gql`
    query GetProductByID($id : Int!){
        getProductById(id: $id){
            name, 
            price,
            soldCount,
            rating,
            description,
            images{
                id,
                url,
            }

        }
    }
`

export const GET_SHOP_BY_PRODUCT = gql`
    query GetShopByProduct($productId: Int!){
        getShopByProduct(productId: $productId){
            id, 
            name,
            image, 
        }
    }
`

export const GET_VENDOR_BY_PRODUCT = gql`
    query GetVendorByProduct($productId: Int!){
        getVendorByProduct(productId: $productId){
            id,
            name,
            deliveryTime,
            price,
        }
    }
`

export const GET_VOUCHER_BY_PRODUCT = gql`
    query GetVoucherByProduct($productId: Int!){
        getVoucherByProduct(productId: $productId){
            id,
            name,
            description,
            discountRate,
            tnc,
            startTime,
            endTime,
        }
    }
`

export const GET_SHOP_MATCH = gql`
    query GetShopMatch($search: String!){
        getShopMatch(search: $search){
            id, 
            name,
            image, 
        }
    }
`

export const GET_PRODUCTS_MATCH = gql`
    query GetProductsMatch($search: String!){
        getProductsMatch(search: $search){
            id,
            name,
            price,
            images{
            id,
            url
            }
        }
    }
`

export const LOAD_PRODUCTS_SORT = gql`
    query GetProductsSort($by: String!, $order: String!){
        getProductsSort(by: $search, order: $order){
            id,
            name,
            price,
            images{
            id,
            url
            }
        }
    }
`