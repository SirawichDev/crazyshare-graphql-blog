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
export const GET_SINGLE_ARTICLE = gql`
    query($articleId: ID!) {
        getSingleArticle(articleId: $articleId) {
            _id
            title
            kind
            description
            imageUrl
            trumbs_up
            messages {
                _id
                messageDetail
                messageDate
                messageUser {
                    _id
                    username
                    avatar
                }
            }
        }
    }
`;
export const GET_CURRENT_USER = gql`
    query {
        currentUser {
            _id
            username
            email
            joinDate
            avatar
            bookmarks {
                _id
                title
                imageUrl
            }
        }
    }
`;

export const INFINITE_SCOLL = gql`
    query($pageNum: Int!, $pageSize: Int!) {
        infiniteScrollArticle(pageNum: $pageNum, pageSize: $pageSize) {
            hasMore
            articles {
                _id
                title
                imageUrl
                kind
                description
                trumbs_up
                createdBy {
                    _id
                    username
                    avatar
                }
                createdDate
            }
        }
    }
`;

export const SEARCHING = gql`
    query($searchSentense: String!) {
        searchArticle(searchSentense: $searchSentense) {
            _id
            title
            imageUrl
            description
            trumbs_up
        }
    }
`;
