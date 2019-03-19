<template>
  <v-app>

    <v-container
      text-xs-center
      mt-3
      pt-3
    >
      <v-layout row>

        <v-flex
          xs12
          sm6
          offset-sm3
        >
          <h1>Add Article </h1>
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm6
          offset-sm3
        >
          <v-form
            v-model="isFormValid"
            lazy-validation
            ref="form"
            @submit.prevent="handleAddArticle"
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
                  accept="image/*" @change="onfilePicked"
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
                  v-model="kinds"
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

            <v-btn
              type='submit'
              id='do_login'
              :disabled="!isFormValid"
            >
              Add It!
            </v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "AddArticle",
  data() {
    return {
      isFormValid: true,
      title: "",
      imageURL: "",
      description: "",
      kinds: [],
      titleRules: [title => !!title || "Title is required"],
      imageRules: [image => !!image || "Image is required"],
      descriptionRules: [descript => !!descript || "description is required"]
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    pickFile () {
      this.$ref.image.click()
    },
    onFilePicked(e){
      const file = e.target.files
      if(file[0] !== undefined){
        this.imageUrl = file[0].name
        if(this.imageUrl.lastIndexOf('.') <= 0 ){
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(file[0]);
        fr.addEventListener('load',() => {
          this.imageUrl = fr.result;
        })
      }
    },
    handleAddArticle() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("createArticle", {
          title: this.title,
          imageUrl: this.imageURL,
          description: this.description,
          kind: this.kinds,
          createdBy: this.user._id
        });
        this.$router.push('/')
      }
    }
  }
};
</script>

<style>
.addArticle {
  border: 1px 1px 1px 1px #333 !important;
}
</style>
