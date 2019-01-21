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
