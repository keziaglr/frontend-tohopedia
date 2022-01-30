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
