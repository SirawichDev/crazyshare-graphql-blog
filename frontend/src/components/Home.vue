<template>
  <v-app>
    <v-container class="mt-5">
      <v-content>
        <h2>Welcome to CrazyDevShare</h2>
        <div v-if="$apollo.loading">Loading...</div>
        <v-container v-else>
          <v-flex>
            <v-carousel v-bind="{'cycle' :true}" interval="3000">
              <v-carousel-item
                v-for="article in getArticle"
                :key="article._id"
                :src="article.imageUrl"
              >
              <h1>{{article.title}}</h1>
              </v-carousel-item>
              </v-carousel>
          </v-flex>
        </v-container>
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import { gql } from "apollo-boost";
export default {
  name: "home",
  apollo: {
    getArticle: {
      query: gql`
        query {
          getArticle {
            _id
            title
            imageUrl
            description
          }
        }
      `
    }
  }
};
</script>

<style scoped>
</style>
