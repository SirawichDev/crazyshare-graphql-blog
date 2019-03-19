<template>
<v-app>
  <v-container  class="text-xs-center">
          <div v-if="loading">Loading</div>
    <v-flex
    v-else
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
                <div>Joined {{user.joinDate}}</div>
                <div class="hidden-xs-only font-weight-thin">{{user.bookmarks.length}} Bookmarks</div>
                <div class="hidden-xs-only font-weight-thin">added</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-layout row wrap v-if="!user.bookmarks.length">
        <v-flex xs12>
            <h2 class="font-weight-light">
                no Bookmarks Article now : (
            </h2>
        </v-flex>
    </v-layout>
    <v-container class="mt-3" v-else>
        <v-flex xs12>
            <h2 class="font-weight-light">Bookmarked

            <span class="font-weight-regular">{{user.bookmarks.length}}</span>
            </h2>
        </v-flex>
        <v-layout row wrap>
            <v-flex xs12 sm6 v-for="bookmark in user.bookmarks" :key="bookmark._id">
                <v-card class="mt-3 ml-1 mr-2" hover>
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
  </v-container>
</v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  computed: {
    ...mapGetters(["user","loading"])
  },
};
</script>