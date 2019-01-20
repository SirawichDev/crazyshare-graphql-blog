<template>
<v-app>

    <v-container mt-5>
      <v-flex xs12>
        <div v-if="loading">--Loadin--</div>
        <v-container v-else>
          <v-flex>
            <v-carousel
              v-bind="{'cycle' :true}"
              interval="3000"
            >
              <v-carousel-item
                v-for="article in articles"
                :key="article._id"
                :src="article.imageUrl"
              >
                <div class="text-container">
                  <h1 class="title">{{article.title}}</h1>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-container>
      </v-flex>
    </v-container>
</v-app>
</template>

<script>
import { gql } from "apollo-boost";
import { mapGetters } from "vuex";
export default {
  name: "home",
  created() {
    this.getArticleSlide();
  },
  computed: {
    // articles(){
    //   return this.$store.getters.articles
    // }
    ...mapGetters(["loading", "articles"])
  },
  methods: {
    getArticleSlide() {
      this.$store.dispatch("getArticle");
    }
  }
};
</script>

<style scoped>
.title {
  position: absolute;
  left: 0;
  bottom: 10px;
  margin: 0 auto;
  right: 0;
  font-size: 30px !important;
  font-weight: bold;
  color: white;
}
</style>
