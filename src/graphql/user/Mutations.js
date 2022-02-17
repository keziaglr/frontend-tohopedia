import { gql } from "@apollo/client"

export const CREATE_OTP = gql`
    mutation CreateOtp($email: String!){
        createOtp(email: $email)
    }
`

export const CREATE_USER = gql`
    mutation CreateUser($email: String!, $otp: String! , $password: String!){
        createUser(input: {email: $email, otpCode: $otp, password: $password}){
            id,
            email,
            password
        }
    }
`

export const RESET_PASSWORD = gql`
    mutation ResetPassword($email: String!, $otp: String! , $password: String!){
        resetPassword(input: {email: $email, otpCode: $otp, password: $password}){
            id,
            email,
            password
        }
    }
`

export const AUTH_USER = gql`
    mutation AuthUser($email: String!, $otp: String! , $password: String!){
        authUser(input: {email: $email, otpCode: $otp, password: $password}){
            id,
            email,
            password
        }
    }
`

export const CREATE_CART = gql`
    mutation CreateCart($userId: Int!, $productId: Int!, $qty: Int!, $note: String!){
      createCart(userId: $userId, productId: $productId, qty: $qty, note: $note){
        user_id,
        product_id,
        qty,
        note
      }
    }
`

export const CREATE_WISHLIST = gql`
    mutation CreateWishlist($userId: Int!, $productId: Int!){
      createWishlist(userId: $userId, productId: $productId){
        user_id,
        product_id
      }
    }
`

export const CREATE_USER_VOUCHER = gql`
    mutation CreateUserVoucher($userId: Int!, $voucherId: Int!){
      createUserVoucher(userId: $userId, voucherId: $voucherId){
        voucher_id,
        user_id
      }
    }
`

export const DELETE_WISHLIST = gql`
    mutation DeleteWishlist($userId: Int!, $productId: [Int!]!){
        deleteWishlist(userId: $userId, productId: $productId){
            user_id,
            product_id
        }
    }
`

export const DELETE_CART = gql`
    mutation DeleteCart($userId: Int!, $productId: Int!){
        deleteCart(userId: $userId, productId: $productId){
            user_id,
            product_id
        }
    }
`

export const UPDATE_PROFILE = gql`
    mutation UpdateUser($userId: Int!, $profilePicture: String!, $name: String!, $dob: Date!, $gender: String!, $email: String!, $phoneNumber: String!, $address: [String!]!){
        updateUser(id: $userId, input:{profilePicture:$profilePicture, name:$name, dob:$dob, gender:$gender, email:$email, phoneNumber:$phoneNumber, address:$address}){
            id
        }
    }
`

export const CHECKOUT = gql`
    mutation Checkout($userId:Int!, $transactionType: String!, $paymentMethod:String!, $shippingAddress:String!, $paymentDiscount: Int!, $voucherId: Int, $shippingId : Int!, $total: Int! $productId: [Int!], $qty:[Int!]){
      checkout(userId : $userId, transactionType:$transactionType paymentMethod:$paymentMethod, shippingAddress:$shippingAddress, paymentDiscount: $paymentDiscount, voucherId: $voucherId, shippingId: $shippingId, total: $total input: {productId: $productId, qty: $qty}){
        id
      }
    }
`

//insertProduct(name: String!, categoryId: Int!, images: [String!]!, description: String!, price: Int!, discount: Int, metaData: String): Product!

export const INSERT_PRODUCT = gql`
    mutation InsertProduct($shopId: Int!, $name: String!, $categoryId: Int!, $images: [String!]!, $description: String!, $price: Int!, $discount: Int, $label: [String!]!, $value: [String!]!){
        insertProduct(shopId: $shopId, name: $name, categoryId: $categoryId, images: $images, description: $description, price: $price, discount: $discount, input:{label:$label, value:$value}){
          id,
          name,
          price
        }
    }
`


export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($productId: Int!, $shopId: Int!, $name: String!, $categoryId: Int!, $images: [String!]!, $description: String!, $price: Int!, $discount: Int, $label: [String!]!, $value: [String!]!){
        updateProduct(productId: $productId shopId: $shopId, name: $name, categoryId: $categoryId, images: $images, description: $description, price: $price, discount: $discount, input:{label:$label, value:$value}){
          id,
          name,
          price,
          images{
            url
          }
        }
    }
`

export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($productId: Int!){
      deleteProduct(productId: $productId){
        id
      }
    }
`


export const CREATE_SHOP_VOUCHER = gql`
mutation CreateShopVoucher($shopId: Int!, $name: String!, $description: String!, $discountRate: Int!, $tnc: String!, $startTime: String!, $endTime: String!){
  createShopVoucher(shopId: $shopId,input:{name: $name, description: $description, discountRate: $discountRate, tnc: $tnc, startTime: $startTime, endTime: $endTime}){
    id
  }
}
`

export const CREATE_GLOBAL_VOUCHER = gql`
mutation CreateGlobalVoucher($name: String!, $description: String!, $discountRate: Int!, $tnc: String!, $startTime: String!, $endTime: String!){
  createGlobalVoucher(input:{name: $name, description: $description, discountRate: $discountRate, tnc: $tnc, startTime: $startTime, endTime: $endTime}){
    id
  }
}
`

export const UPDATE_STATUS_USER = gql`
mutation UpdateStatusUser($userId: Int!, $status:Boolean!){
    updateStatusUser(userId: $userId, status: $status){
        id
    }
}
`
export const SEND_REQUEST = gql`
mutation SendRequest($userId: Int!, $status: String!){
  sendRequest(userId: $userId, status: $status){
    id
  }
}
`

export const RESPONSE_REQUEST = gql`
mutation ResponseRequest($userId: Int!, $status:Boolean!, $requestId: Int!){
  responseRequest(userId: $userId, status: $status, requestId: $requestId){
    id
  }
}
`

export const CREATE_REVIEW = gql`
    mutation CreateReview($userId: Int!, $transactionId: Int!, $score: Int!, $description: String!, $image: String!, $typeReview: String!){
      createReview(userId: $userId, transactionId: $transactionId, score: $score, description: $description, image: $image, typeReview: $typeReview){
        id
      }
    }
`

export const CREATE_REVIEW_REPLY = gql`
    mutation CreateReviewReply($reviewId: Int!, $sourceId: Int!, $role: String!, $messsage: String!){
      createReviewReply(reviewId: $reviewId, sourceId: $sourceId, role: $role, messsage: $messsage){
        id
      }
    }
`

export const CREATE_DISCUSSION = gql`
mutation CreateDiscussion(
  $userId: Int!
  $productId: Int!
  $content: String!
) {
  createDiscussion(
    userId: $userId
    productId: $productId,
    content: $content
  ) {
    id
  }
}
`

export const CREATE_DISCUSSION_REPLY = gql`
mutation CreateDiscussionReply(
  $discussionId: Int!
  $sourceId: Int!
  $role: String!
  $messsage: String!
) {
  createDiscussionReply(
    discussionId: $discussionId
    sourceId: $sourceId
    role: $role
    messsage: $messsage
  ) {
    id
  }
}

`
    
export const CREATE_CHAT = gql`
mutation CreateChat($userId: Int!, $shopId: Int!, $sourceId:Int!, $role:String!, $message:String!, $image:String!, $type:String!){
  createChat(userId: $userId, shopId: $shopId, sourceId:$sourceId, role:$role, message:$message, image:$image, type:$type){
    id
  }
}
`

export const CREATE_CHAT_HEADER = gql`
mutation createHeaderChat($userId: Int!, $shopId: Int!){
  createHeaderChat(userId: $userId, shopId: $shopId){
    id
  }
}
`

export const TOP_UP = gql`
mutation TopUp($code: String!, $value: Int!, $userId: Int!){
  topup(code: $code, value: $value, userId: $userId){
    id
  }
}
`