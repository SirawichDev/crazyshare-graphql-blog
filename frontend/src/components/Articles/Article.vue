<template>
    <v-container grid-list-xs v-if="getSingleArticle">
        <v-layout row wrap>
            <h1>Article {{articleId}}</h1>
        </v-layout>
    </v-container>
</template>
<script>

import {GET_SINGLE_ARTICLE} from '../../../query/queries';
export default {
    name: "Article",
    props: ['articleId'],
    apollo: {
        getSingleArticle: {
            query: GET_SINGLE_ARTICLE,
            variables(){
                return {
                    articleId: this.articleId
                }
            }
        }
    }
}
</script>
