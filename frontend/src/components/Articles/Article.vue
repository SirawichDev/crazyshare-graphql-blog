<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <h1>Article {{articleId}}</h1>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: "Article",
    props: ['articleId']
}
</script>
