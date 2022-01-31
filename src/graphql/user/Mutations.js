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