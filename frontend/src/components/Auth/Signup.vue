<template>
  <v-app>
    <v-container class="mt-5">
      <v-content class="container">
        <h2>Signup</h2>
        <v-form class="form">
          <v-text-field
            name="name"
            label="username"
            id="id"
            required
          ></v-text-field>
          <v-text-field
            name="name"
            label="email"
            id="id"
            required
          ></v-text-field>
          <v-text-field
            name="name"
            label="password"
            id="id"
            required
          ></v-text-field>
          <v-text-field
            name="name"
            label="re-password"
            id="id"
            required
          ></v-text-field>
        </v-form>
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 400px;
  box-shadow: 1px 1px 1px #444;
}
</style>
