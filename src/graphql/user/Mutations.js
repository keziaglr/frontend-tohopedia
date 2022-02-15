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
    mutation UpdateUser($userId: Int!, $profilePicture: String!, $name: String!, $dob: Date!, $gender: String!, $email: String!, $phoneNumber: String!, $address: String!){
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