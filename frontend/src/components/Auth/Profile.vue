<template>
  <v-app>
    <div v-if="loading">
      <loader></loader>
    </div>
    <v-container
      v-else
      class="text-xs-center"
    >
      <v-flex
        sm6
        offset-sm3
      >
        <v-card
          class="white--text"
          color="primary"
        >
          <v-layout>
            <v-flex xs5>
              <v-card-media
                contain
                height="125px"
                :src="user.avatar"
              >

              </v-card-media>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div class="headline">
                  {{this.user.username}}
                  <div>Joined {{user.joinDate.split(`GMT+0700 (Indochina Time)`).toString()}}</div>
                  <div class="hidden-xs-only font-weight-thin">{{user.bookmarks.length}} Bookmarks</div>
                  <div class="hidden-xs-only font-weight-thin">Your Article {{userArticles.length}}</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-container g v-if="!onmybookmarks.length">


      <v-layout
        row
        wrap

      >
        <v-flex xs12>
          <h2 class="font-weight-light">
            no Bookmarks Article now : (
          </h2>
        </v-flex>
      </v-layout>
            </v-container>
      <v-container
        class="mt-3"
        v-else
      >
        <v-flex xs12>
          <h2 class="font-weight-light">Bookmarked

            <span class="font-weight-regular">{{onmybookmarks.length}}</span>
          </h2>
        </v-flex>
        <v-layout
          row
          wrap
        >
          <v-flex
            xs12
            sm6
            v-for="bookmark in onmybookmarks"
            :key="bookmark._id"
          >
            <v-card
              class="mt-3 ml-1 mr-2"
              hover
            >
              <v-card-media
                contain
                height="30vh"
                :src="bookmark.imageUrl"
              >

              </v-card-media>
              <v-card-text>
                {{bookmark.title}}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container v-if="!userArticles.length">
        <v-layout
          row
          wrap
        >
          <v-flex xs12>
            <h2>Sorry You're not created Article Yet :(</h2>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container
        class="mt-3"
        v-else
      >
        <v-flex xs12>
          <h2 class="font-weight-light">Your Post
            <span class="font-weight-regular">({{userArticles.length}})</span>
          </h2>
        </v-flex>
        <v-layout
          row
          wrap
        >
          <v-flex
            xs12
            v-for="userArticle in userArticles"
            :key="userArticle._id"
          >
            <v-card
              class="mt-3 ml-1 mr-2"
              hover
            >
              <v-btn
                @click="loadArticle(userArticle)"
                color="success"
                floating
                fab
                small
                dark
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                color="error"
                floating
                fab
                small
                dark
              >
                <v-icon>delete</v-icon>
              </v-btn>
              <v-card-media
                contain
                height="30vh"
                :src="userArticle.imageUrl"
              >


              </v-card-media>
                      <v-card-text class="font-weigjt-bold">
                {{userArticle.title}}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-dialog
        xs12
        sm6
        offset-sm3
        v-model="editUserArticle"
        persistent
        :overlay="false"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2">
            Update Article
          </v-card-title>
          <v-container>

            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="handleUpdateArticle"
            >
              <v-layout
                row
                wrap
              >
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="subtitles"
                    name="postTitile"
                    :rules="titleRules"
                    v-model="title"

                    label="Title"
                    id="id"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="broken_image"
                    name="name"
                    :rules="imageRules"
                    label="imageURL"
                    @click="pickFile"

                    v-model="imageURL"
                    accept="image/*"
                    @change="onfilePicked"
                    id="id"
                    ref="image"
                  ></v-text-field>

                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <img
                    :src="imageURL"
                    height="300px"
                  >
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex xs12>
                  <v-select
                    :items="['Golang','Python','Vuejs','React']"
                    v-model="kind"
                    multiple
                    label="Type"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex xs12>
                  <v-text-field
                    :rules="descriptionRules"
                    label="Description"
                    v-model="description"
                    name="descirption"
                    textarea
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  color="success--text"
                >Update</v-btn>
                <v-btn
                  class="error--text"
                  flat
                  @click="editUserArticle = false"
                >Cancel</v-btn>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import Loader from "../../components/Loader/Loader.vue";
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  props:['currentUser'],
  data() {
    return {
      cId: '',
      editUserArticle: false,
      isFormValid: true,
      articleId: "",
      title: "",
      imageURL: "",
      description: "",
      kind: [],
      titleRules: [title => !!title || "Title is required"],
      imageRules: [image => !!image || "Image is required"],
      descriptionRules: [descript => !!descript || "description is required"]
    };
  },
  components: {
    Loader
  },

  computed: {
    ...mapGetters(["user", "loading", "userArticles","onmybookmarks"])
  },
  created() {
    this.cId = this.user._id;

    // console.log('xx',this.props.currentUser)
    console.log('cc',this.cId)

    this.getUserArticle();
  },
  methods: {
    getUserArticle() {
      this.$store.dispatch("getUserArticle", {
        userId: this.cId
      });
    },
    loadArticle(
      { _id, title, imageUrl, kind, description },
      editUserArticle = true
    ) {
      this.editUserArticle = editUserArticle;
      this.articleId = _id;
      this.title = title;
      this.imageURL = imageUrl;
      this.kind = kind;
      this.description = description;
    },
    handleUpdateArticle() {
      this.$store.dispatch('updateUserArticle', {
        articleId : this.articleId,
        userId: this.user._id,
        title: this.title,
        imageUrl: this.imageURL,
        kind: this.kind,
        description: this.description
      })
    },
    pickFile() {
      this.$ref.image.click();
    },
    onFilePicked(e) {
      const file = e.target.files;
      if (file[0] !== undefined) {
        this.imageUrl = file[0].name;
        if (this.imageUrl.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(file[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
        });
      }
    }
  }
};
</script>