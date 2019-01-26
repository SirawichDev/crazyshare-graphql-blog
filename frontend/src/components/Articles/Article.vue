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
                @click="likeArticle"
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
      <div class="mt-3">
        <v-layout
          row
          wrap
          v-if="user"
        >
          <v-flex xs12>
            <v-form
              @submit.prevent="handleAddMessage"
              v-model="isFormValid"
              lazy-validation
              ref="form"
            >
              <v-layout row>
                <v-text-field
                  clearable
                  v-model="messageDetail"
                  type="text"
                  :append-outer-icon="messageDetail && 'send'"
                  required
                  :rules="chatRules"
                  @click:append-outer="handleAddMessage"
                  color="primary"
                  prepend-icon="email"
                  label="ADD MESSAGE"
                ></v-text-field>
              </v-layout>
            </v-form>
          </v-flex>
        </v-layout>
        <v-layout
          row
          wrap
        >
          <v-flex xs12>
            <v-list subheader>
              <v-subheader>Message : {{getSingleArticle.messages.length}}</v-subheader>
              <template v-for="message in getSingleArticle.messages">
                <v-divider :key="message._id"></v-divider>
                <v-list-tile
                  avatar
                  :key="message.title"
                >
                  <v-list-tile-avatar>
                    <img :src="message.messageUser.avatar">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{message.messageDetail}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{message.messageUser.username}}
                      <span>{{message.messageDate.replace('GMT+0700 (Indochina Time)','')}}</span>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon color="grey">chat_bubble</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-app>
</template>
<script>
import { GET_SINGLE_ARTICLE } from "../../../query/queries";
import { ADD_ARTICLE_MESSAGE, LIKE } from "../../../mutation/mutation";
import { mapGetters } from "vuex";
export default {
  name: "Article",
  props: ["articleId"],
  data() {
    return {
      bigImg: false,
      isFormValid: true,
      messageDetail: "",
      chatRules: [message => !!message || "Message is required"]
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
    prevPage() {
      this.$router.go(-1);
    },
    likeArticle() {
      console.log(this.user);
      this.$apollo
        .mutate({
          mutation: LIKE,
          variables: {
            username: this.user.username,
            articleId: this.articleId
          }
        })
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    toggleBigimg() {
      if (window.innerWidth > 500) {
        this.bigImg = !this.bigImg;
      } else {
        this.bigImg = false;
      }
    },
    handleAddMessage() {
      if (this.$refs.form.validate()) {
        this.$apollo
          .mutate({
            mutation: ADD_ARTICLE_MESSAGE,
            variables: {
              messageDetail: this.messageDetail,
              userId: this.user._id,
              articleId: this.articleId
            },
            update: (cache, { data: { chat } }) => {
              const data = cache.readQuery({
                query: GET_SINGLE_ARTICLE,
                variables: {
                  articleId: this.articleId
                }
              });
              // console.log('data', data);
              // console.log('chat', chat);
              data.getSingleArticle.messages.unshift(chat);
              cache.writeQuery({
                query: GET_SINGLE_ARTICLE,
                variables: {
                  articleId: this.articleId
                },
                data
              });
            }
          })
          .then(({ data }) => {
            this.$refs.form.reset();
            console.log(data.chat);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
