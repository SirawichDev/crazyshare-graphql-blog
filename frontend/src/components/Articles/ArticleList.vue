<template>

    <v-container text-xs-center v-if="infiniteScrollArticle">
      <div
        v-for="article in infiniteScrollArticle.articles"
        :key="article._id"
      >
        <img
          :src="article.imageUrl"
          height="100px"
        >
        <h3>{{article.title}}</h3>
      </div>
      <v-btn
        color="success"
        @click="More"
        v-if="showMoreEnable"
      >More</v-btn>

    </v-container>

</template>

<script>
import { INFINITE_SCOLL } from "../../../query/queries";
const pageSize = 2;
export default {
  name: "articles",
  data() {
    return {
      pageNum: 1,
      showMoreEnable: true
    }
  },
  apollo: {
    infiniteScrollArticle: {
      query: INFINITE_SCOLL,
      variables: {
        pageNum: 1,
        pageSize
      }
    }
  },
  methods: {
    More() {
      this.pageNum += 1;
      this.$apollo.queries.infiniteScrollArticle.fetchMore({
        variables: {
          pageNum: this.pageNum,
          pageSize
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          const newArticle = fetchMoreResult.infiniteScrollArticle.articles;
          const hasMore = fetchMoreResult.infiniteScrollArticle.hasMore;
          this.showMoreEnable = hasMore;
          return {
            infiniteScrollArticle: {
              __typename: prev.infiniteScrollArticle.__typename,
              articles: [...prev.infiniteScrollArticle, ...newArticle],
              hasMore
            }
          };
        }
      });
    }
  }
};
</script>
