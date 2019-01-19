<template>
  <v-app>
    <v-container class="mt-5">
      <v-content>
        <h2>Welcome to CrazyDevShare</h2>
        <v-btn color="primary">click</v-btn>
        <ul v-for="user in getUser" :key="user._id">{{user.username}} - {{user.email}}</ul>
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import {gql} from 'apollo-boost';
export default {
  name: 'home',
  apollo: {
   getUser :{
     query: gql`
      query {
        getUser{
          _id
          username
          email
        }
      }
     `
   }
  }
}
</script>

<style scoped>
</style>
