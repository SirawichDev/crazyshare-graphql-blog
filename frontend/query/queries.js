import { gql } from 'apollo-boost';

export const GET_ARTICLE = gql`
    query {
        getArticle {
            _id
            title
            description
            imageUrl
        }
    }
`;

export const GET_CURRENT_USER = gql`
    query {
        currentUser {
            _id
            username
            email
            avatar
            bookmarks {
                _id
                title
                imageUrl
            }
        }
    }
`;
