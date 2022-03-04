import { gql } from '@apollo/client';

export const GET_USER_AUTH = gql`
    query getUserAuth($email: String!, $password: String!, $otpCode: String!){
        getUserAuth(input:{email: $email, password: $password, otpCode: $otpCode}){
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

export const GET_USER_BY_ID = gql`
    query getUserByID($id: Int!){
        getUserByID(id: $id){
            id,
            email,
            password,
            name,
            profilePicture,
            role,
            dob,
            isSuspend,
            phoneNumber,
            shippingAddress{
                id,
                address
            }
        }
    }
`


export const USERS = gql`
    query users{
        users{
            id,
            email,
            password,
            name,
            isSuspend
        }
    }
`

export const LOAD_CAMPAIGNS = gql`
    query campaigns{
        campaigns{
            id,
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

export const PRODUCTS = gql`
    query Products($limit: Int!, $offset: Int!){
        products(limit: $limit, offset: $offset){
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
query GetProductsByShop($limit: Int!, $offset: Int!, $search: String!, $sort: String, $type: [Int], $location: [String], $maxPrice: Int, $minPrice: Int, $courier: [Int], $rating: Int, $shippingTime: Int, $productAdded:Int){
    getProductsSearch(limit: $limit, offset: $offset, search: $search, sort: $sort, input:{type: $type, location: $location, maxPrice: $maxPrice, minPrice: $minPrice, courier: $courier, rating: $rating, shippingTime: $shippingTime, productAdded: $productAdded} ){
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
            discount,
            sub_category_id,
            images{
                id,
                url,
            }, metaData{
                id,
                label, 
                value
            },  review{
                id,
                user_id,
                score,
                description,
                createdAt
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
            user_id
        }
    }
`

export const GET_SHOP_BY_USER = gql`
    query GetShopByUser($userId: Int!){
        getShopByUser(userId: $userId){
            id, 
            name,
            image,
            user_id, 
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

export const GET_VENDOR_BY_ID = gql`
    query GetVendorByID($id: Int!){
        getVendorByID(id: $id){
            id,
            name,
            deliveryTime,
            price,
        }
    }
`

export const GET_VENDOR_BY_USER = gql`
    query GetVendorByUser($userId: Int!){
        getVendorByUser(userId: $userId){
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

export const GET_PRODUCTS_BY_CATEGORIES = gql`
    query GetProductsByCategories($categoryId: Int!){
      getProductsByCategories(categoryId: $categoryId){
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

export const GET_SHOP_BY_ID = gql`
    query GetShopById($shopId: Int!){
      getShopByID(shopId: $shopId){
        id,
        name,
        image,
        badges_id,
        points,
        video,
        nameSlug,
        description,
        slogan,
        operationalHour,
        operationalStatus,
        promo{
          id,
          idx,
          url
        }
      }
    }
`

export const GET_PRODUCTS_BY_SHOP = gql`
    query GetProductsByShop($shopID: Int!){
      getProductsByShop(shopID: $shopID){
        id,
        name,
        price,
        images{
          url
        }
      }
    }
`

export const GET_PRODUCTS_BY_ID = gql`
    query GetProductsById($id: Int!){
      getProductById(id: $id){
        id,
        name,
        price,
        images{
          url
        }
      }
    }
`

export const GET_USER_WISHLIST = gql`
    query GetUserWishlist($userId: Int!){
      getUserWishlist(userId: $userId){
        id,
        name,
        price,
        images{
          url
        }
      }
    }
`

export const CARTS = gql`
    query Carts($userId: Int!){
      carts(userId: $userId){
        id,
        name,
        price,
        discount,
        images{
          url
        }
      }
    }
`

export const CARTS2 = gql`
    query Carts2($userId: Int!){
      carts2(userId: $userId){
        user_id,
        product_id,
        qty
      }
    }
`

export const GET_BEST_SELLING_PRODUCTS = gql`
    query GetBestSellingProducts($shopId: Int!){
      getBestSellingProducts(shopId: $shopId){
        id,
        name,
        price,
        soldCount,
        images{
            url
        }
      }
    }
`

export const GET_BADGE = gql`
    query GetBadge($shopID: Int!){
      getBadge(shopID: $shopID){
        badge
      }
    }
`

export const GET_VOUCHER_BY_ID = gql`
    query GetVoucherById($voucherId: Int!){
        getVoucherById(voucherId: $voucherId){
            id,
        	name,
            description,
            discountRate,
            code,
            tnc,
            startTime,
            endTime
        }
    }
`

export const GET_VOUCHER_CART = gql`
    query GetVoucherCart($userId: Int!){
        getVoucherCart(userId: $userId){
            id,
        	name,
            description,
            discountRate,
            code,
            tnc,
            startTime,
            endTime
        }
    }
`

export const GET_TRANSACTION_BY_USER = gql`
    query GetTransactionByUser($userId: Int!, $keyword: String, $date: String, $status: String){
      getTransactionByUser(userId: $userId, input:{keyword: $keyword, date: $date, status: $status}){
        id,
        user_id,
        transactionType,
        transactionDate,
        status,
        invoiceNumber,
        total
      }
    }
`

export const GET_TRANSACTION_BY_ID = gql`
    query GetTransactionByID($userId: Int!, $id: Int!){
        getTransactionByID(userId: $userId, id: $id){
            id,
            user_id,
            transactionType,
            transactionDate,
            status,
            invoiceNumber,
            total,
            shippingAddress,
            paymentMethod,
            paymentDiscount,
            shipping_id
        }
    }
`

export const GET_TRANSACTION_DETAIL = gql`
query GetTransactionDetail($userId: Int!, $transactionId: Int!){
  getTransactionDetail(userId: $userId, transactionId: $transactionId){
    id,
    transaction_id,
    product_id, 
    qty
  }
}
`

export const REQUESTS = gql`
query Requests{
  requests{
    id,
    user_id,
    status
  }
}

`

export const GET_REVIEW_BY_TYPE = gql`
query GetReviewsByType($productID: Int!, $typeReview: String!, $filter: String!){
      getReviewsByType(productId: $productID, typeReview: $typeReview, filter: $filter){
        id,
        user_id,
        score,
        description,
        createdAt,
        type,
        image
      }
    }
`

export const GET_REVIEW_DETAIL = gql`
query GetReviewDetail($reviewId: Int!){
  getReviewDetail(reviewId: $reviewId){
    id,
    review_id,
    source_id,
    role,
    messsage
  }
}
`

export const GET_DISCUSSION = gql`
query GetDiscussion(
  $productId: Int!
) {
  getDiscussion(
    productId: $productId
  ) {
    id
    user_id
    product_id
    content
  }
}
`

export const GET_DISCUSSION_DETAIL = gql`
query GetDiscussionDetail($discussionId: Int!) {
  getDiscussionDetail(discussionId: $discussionId) {
    id
    discussion_id
    source_id
    role
    messsage
  }
}
`

export const GET_CHAT = gql`
query GetChat($userId:Int!){
  getChat(userId:$userId){
    id,
    shop_id,
    user_id
  }
}
`

export const GET_CHAT_DETAIL = gql`
query GetChatDetail($chatId: Int!){
  getChatDetail(chatId:$chatId){
    id,
    chat_id,
    source_id,
    role,
    message,
    image,
    type
  }
}
`

