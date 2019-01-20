<template>
  <v-app>

    <v-navigation-drawer
      app
      temporary
      fixed
      v-model="sideNav"
    >

    </v-navigation-drawer>
    <v-container >
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
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
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
       <h3 id="title">   {{item.title}}</h3>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    </v-container>

      <transition name="tranpage">
        <router-view />
      </transition>
  </v-app>
</template>

<script>
import Home from "./components/Home";

export default {
  name: "App",
  components: {
    Home
  },
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    eachItem() {
      return [
        { icon: "chat", title: "Articles", link: "/article" },
        { icon: "whatshot", title: "Sign In", link: "/signin" },
        { icon: "polymer", title: "Sign Up", link: "/signup" }
      ];
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
  background-color: aquamarine;
  border: 1px 1px 1px #444;
}
#title {
  font-family: "Concert One", cursive !important;
  color: black;
  font-weight: 900;
}
.search {
  border-radius: 2em;
  background-color: black;
  -webkit-clip-path: polygon(0 0, 91% 0, 100% 100%, 8% 100%);
  clip-path: polygon(0 0, 91% 0, 100% 100%, 8% 100%);
}
.btn {
  border-radius: 20px;
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
</style>

