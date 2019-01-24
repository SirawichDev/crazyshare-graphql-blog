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

export const INFINITE_SCOLL = gql`
    query($pageNum: Int!, $pageSize: Int!) {
        infiniteScrollArticle(pageNum: $pageNum, pageSize: $pageSize) {
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
                createDate
                messages {
                    _id
                }
            }
            hasMore
        }
    }
`;