<template>
  <v-app>
    <v-container
      v-if="getSingleArticle"
      class="mt-3"
      flexbox
      center
    >
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-card hover>
            <v-card-title>
              <h1>{{getSingleArticle.title}}</h1>
              <v-btn
                large
                icon
                v-if="user"
              >
                <v-icon large>favorite</v-icon>
              </v-btn>
              <h3 class="ml-1 font-weight-thin">{{getSingleArticle.trumbs_up}}</h3>
              <v-spacer></v-spacer>
              <v-icon @click="prevPage">arrow_back</v-icon>
            </v-card-title>
            <v-tooltip right>
              <span>Click to show large image</span>
              <v-card-media
              @click="toggleBigimg"
                slot="activator"
                :src="getSingleArticle.imageUrl"
              >
              </v-card-media>
            </v-tooltip>
            <v-dialog
              v-model="bigImg"

             height="80vh"
              transition="dialog-transition"
            >
              <v-card>
                <v-card-media
                  contain
                  height="auto"
                  :src="getSingleArticle.imageUrl"
                >

                </v-card-media>
              </v-card>
            </v-dialog>
            <v-card-text>
              <span
                v-for="(kind,index) in getSingleArticle.kind"
                :key="index"
              >
                <v-chip
                  class="mb-3"
                  color="accent"
                  text-color="white"
                >{{kind}}</v-chip>
              </span>
              <h3>{{getSingleArticle.description}}</h3>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import { GET_SINGLE_ARTICLE } from "../../../query/queries";
import { mapGetters } from "vuex";
export default {
  name: "Article",
  props: ["articleId"],
  data() {
    return {
      bigImg: false
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  apollo: {
    getSingleArticle: {
      query: GET_SINGLE_ARTICLE,
      variables() {
        return {
          articleId: this.articleId
        };
      }
    }
  },
  methods: {
      prevPage(){
          this.$router.go(-1);
      },
      toggleBigimg(){
          if(window.innerWidth > 500) {
              this.bigImg = !this.bigImg;
          } else {
              this.bigImg =false;
          }
      }
  }
};
</script>
