<template>
  <v-card>

    <v-snackbar
      v-model="snackbar"
      :bottom="true"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
    >
    <v-icon class="mr-3" color="white">error</v-icon>
    <h3>  {{ message.replace('GraphQL error:', '') }}</h3>
      <v-btn
        color="red"
        flat
        class="close"
        @click="snackbar = false"
      >
        Ok
      </v-btn>
    </v-snackbar>
  </v-card>
</template>
<script>
export default {
  props: ['message'],
  data() {
    return {
        snackbar: true
    }
  }
};
</script>

<style>
.close{
    background-color: #fff;
    font-weight: bold
}
</style>
