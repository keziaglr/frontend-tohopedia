import { gql } from "@apollo/client"

export const UPDATE_SHOP = gql`
    mutation UpdateShop($shopId: Int!, $profilePicture: String!, $name: String!, $nameSlug: String!, $slogan: String!, $description: String!, $operationalHour: String!, $operationalStatus: String!){
        updateShop(id: $shopId, input:{profilePicture: $profilePicture, name: $name, nameSlug: $nameSlug, slogan: $slogan, description: $description, operationalHour: $operationalHour, operationalStatus: $operationalStatus}){
            id
        }
    }
`

export const CREATE_SHOP = gql`
    mutation CreateShop($userId: Int!, $phoneNumber: String!, $name: String!, $nameSlug: String!, $address: String!){
    createShop(input:{userId:$userId, phoneNumber: $phoneNumber, name: $name, nameSlug: $nameSlug, address: $address}){
        id
    }
    }
`

// input UpdateShop{
//     profilePicture: String!
//     name: String!
//     nameSlug: String!
//     slogan: String!
//     description: String!
//     operationalHour: String!
//     operationalStatus: String!
// }