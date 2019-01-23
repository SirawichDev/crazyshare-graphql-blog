import { gql } from 'apollo-boost';

export const SIGNUP_USER = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        signupUser(username: $username, email: $email, password: $password) {
            token
        }
    }
`;

export const SIGNIN_USER = gql`
    mutation($username: String!, $password: String!) {
        signinUser(username: $username, password: $password) {
            token
        }
    }
`;

export const ADD_ARTICLE = gql`
    mutation(
        $title: String!
        $imageUrl: String
        $kind: [String]!
        $description: String!
        $createdBy: ID!
    ) {
        createArticle(
            title: $title
            imageUrl: $imageUrl
            kind: $kind
            description: $description
            createdBy: $createdBy
        ) {
            _id
            title
            imageUrl
            kind
            description
            trumbs_up
        }
    }
`;
