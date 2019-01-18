<template>
  <v-app>
    <v-toolbar
      class="nav"
      fixed
      dark
      color="white"
    >
      <v-toolbar-side-icon color="primary">
      </v-toolbar-side-icon>
      <v-toolbar-title class="title">
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer"
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
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container class="mt-4">
        <v-content>
          <home />
        </v-content>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import Home from "./components/Home";

export default {
  name: "App",
  components: {
    Home
  },
  computed: {
    eachItem() {
      return [
        { icon: "chat", title: "Articles", link: "/article" },
        { icon: "whatshot", title: "Sign In", link: "/signin" },
        { icon: "polymer", title: "Sign Up", link: "/signup" }
      ];
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Concert+One");
.nav {
}
.title {
  font-family: "Concert One", cursive;
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
</style>

