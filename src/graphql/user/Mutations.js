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

export const DELETE_WISHLIST = gql`
    mutation DeleteWishlist($userId: Int!, $productId: [Int!]!){
        deleteWishlist(userId: $userId, productId: $productId){
            user_id,
            product_id
        }
    }
`