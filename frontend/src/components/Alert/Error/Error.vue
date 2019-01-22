<template>
  <v-card>

    <v-snackbar
      v-model="snackbar"
      :bottom="true"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
    >
    <h3>  {{ message.replace('GraphQL', '') }}</h3>
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
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
