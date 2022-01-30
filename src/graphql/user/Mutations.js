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