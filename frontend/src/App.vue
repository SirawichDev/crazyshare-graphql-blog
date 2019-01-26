<template>
  <v-app>

    <v-navigation-drawer
      absolute
      class="sidenav"
      temporary
      v-model="sideNav"
    >

      <v-list class="pa-1">
        <v-list-tile class="title">
          <v-list-tile-title>
            Crazy Dev
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-if="user"
          avatar
        >
          <v-list-tile-avatar>
            <img :src="uProfile.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content v-if="user">
            <v-list-tile-title>Hello {{uProfile.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list
        class="pt-0"
        dense
      >
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in eachSideBarItem"
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-container>
      <v-toolbar
        class="nav"
        fixed
        dark
        color="transparent"
      >
        <v-toolbar-side-icon
          @click="toggle"
          color="primary"
        >
        </v-toolbar-side-icon>
        <v-toolbar-title class="title">
          <router-link
            to="/"
            tag="span"
            style="cursor: pointer"
            id="title"
          >
            CrazyDev-Share
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          flex
          label="Search"
          class="search"
          prepend-inner-icon="search"
          solo-inverted
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            flat
            to="/profile"
            v-if="user"
          >
            <v-icon
              class="hidden-sm-only"
              left
              color="primary"
            >adb</v-icon>
            <v-badge
              right
              color="blue darken-2"
            >
              <span slot="badge">1</span>
              <h3 id="title">Profile</h3>
            </v-badge>
          </v-btn>
          <v-btn
            class="btn"
            flat
            color="black"
            v-for="item in eachItem"
            :key="item.title"
            :to="item.link"
          >
            <v-icon
              class="hidden-sm-only"
              left
              color="primary"
            >{{item.icon}}</v-icon>
            <h3 id="title"> {{item.title}}</h3>
          </v-btn>

        </v-toolbar-items>
      </v-toolbar>
    </v-container>

    <transition name="tranpage">
      <router-view />
    </transition>
    <v-snackbar
      v-model="snackbar"
      color="green"
      :timeout="3000"
      bottom
      left
    >
      <v-icon color="white">spellcheck</v-icon>
      Logged In !!
      <v-btn
        class="gotit"
        dark
        flat
        color="white"
        @click="snackbar = false"
      >Got It</v-btn>
    </v-snackbar>
    <v-snackbar
            v-if="authError"
      v-model="authErrorSnackbar"
      color="red"
      :timeout="5000"
      bottom
      left
    >
      <v-icon
        color="white"
      >spellcheck</v-icon>
      {{authError.message}}
      <v-btn
        class="gotit"
        dark
        flat
        color="white"
        @click="snackbar = false"
        to="/signin"
      >Please signin again</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      authErrorSnackbar: false,
      sideNav: false,
      snackbar: false
    };
  },
  watch: {
    user(newvalue) {
      if (newvalue) {
        this.snackbar = true;
      }
    },
    authError(value) {
      if (value !== null) {
        this.authErrorSnackbar = true;
      }
    }
  },
  computed: {
    ...mapGetters(["user", "authError"]),
    eachItem() {
      let items = [
        { icon: "chat", title: "Articles", link: "/article" },
        { icon: "whatshot", title: "Sign In", link: "/signin" },
        { icon: "polymer", title: "Sign Up", link: "/signup" }
      ];
      if (this.user) {
        items = [
          { icon: "chat", title: "Article", link: "/article" },
          { icon: "polymer", title: "Logout", link: "/logout" }
        ];
      }
      return items;
    },
    eachSideBarItem() {
      let items = [
        { icon: "chat", title: "Articles", link: "/article" },
        { icon: "whatshot", title: "Sign In", link: "/signin" },
        { icon: "polymer", title: "Sign Up", link: "/signup" }
      ];
      if (this.user) {
        items = [
          { icon: "chat", title: "Create Article", link: "/articles/create" },
          { icon: "whatshot", title: "U Profile", link: "/profile" },
          { icon: "polymer", title: "Logout", link: "/logout" }
        ];
      }
      return items;
    },
    uProfile() {
      let sideitem = { name: "", avatar: "" };
      if (this.user) {
        sideitem = { name: this.user.username, avatar: this.user.avatar };
      }
      return sideitem;
    }
  },
  methods: {
    toggle() {
      this.sideNav = !this.sideNav;
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Concert+One");
.nav {
  border-radius: 2em;
  clip-path: polygon(
    0% 15%,
    15% 15%,
    15% 0%,
    85% 0%,
    85% 15%,
    100% 15%,
    100% 85%,
    85% 85%,
    85% 100%,
    15% 100%,
    15% 85%,
    0% 85%
  );
}
#title {
  font-family: "Concert One", cursive !important;
  color: black;
  font-weight: 900;
}
.sidenav {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}
.title {
  text-align: center;
  font-family: "Concert One", cursive !important;
  font-weight: 900;
}
v-text-field {
  color: #444 !important;
  border: 10px !important;
}
.btn {
  border-radius: 100px;
  color: black;
}
.login {
  background-color: #c5d86d;
}
.tranpage-enter-active,
.tranpage-leave-active {
  transition-property: opacity;
  animation: bounce-in 0.5s;
  transition-duration: 0.25s;
}
/* .tranpage-enter-active {
  transition-delay: 0.25s;
} */
.tranpage-enter,
.tranpage-leave-active {
  opacity: 0;
}
@keyframes bounce-in {
  0% {
    transform: translateX(-1rem);
  }
  50% {
    transform: translateX(-2rem);
  }
  100% {
    transform: translateX(-3rem);
  }
}
.gotit {
  background-color: #fff;
  border-radius: 10px;
  color: green !important;
}
</style>

