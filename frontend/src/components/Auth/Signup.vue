<template>
  <v-app>

    <div class='box'>
      <div class='box-form'>
        <div class='box-login-title'>
        </div>
        <div class='box-login'>
          <div
            class='fieldset-body'
            id='login_form'
          >
            <v-form
              v-model="isFormValid"
              @submit.prevent="signUpuser"
              ref="form"
              lazy-validation
            >

              <p class='field'>
                <v-text-field
                  name="username"
                  type="text"
                  :rules="usernameRules"
                  v-model="username"
                  prepend-icon="face"
                  label="Username"
                  id="id"
                ></v-text-field>
              </p>
              <p class='field'>
                <v-text-field
                  name="email"
                  type="email"
                  :rules="emailRules"
                  v-model="email"
                  prepend-icon="email"
                  label="Email"
                  id="id"
                  required
                ></v-text-field>
              </p>
              <p class='field'>
                <v-text-field
                  name="name"
                  type="password"
                  :rules="passwordRules"
                  v-model="password"
                  prepend-icon="lock"
                  label="Password"
                  id="id"
                  required
                ></v-text-field>
              </p>
              <p class='field'>
                <v-text-field
                  name="name"
                  type="password"
                  :rules="passwordValidate"
                  v-model="passwordvalidate"
                  prepend-icon="lock"
                  label="validate-password"
                  id="id"
                  required
                ></v-text-field>
              </p>
              <label class='checkbox'>
                <input
                  type='checkbox'
                  value='TRUE'
                  title='Keep me Signed in'
                /> Keep me Signed in
              </label>

              <v-btn
                type='submit'
                id='do_login'
                :disabled="!isFormValid"
              >
                SignUp
              </v-btn>
            </v-form>
          </div>
        </div>
      </div>
    </div>
    <error
      v-if="error"
      :message="error.message"
    >
    </error>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      isFormValid: true,
      username: "",
      email: "",
      password: "",
      passwordvalidate: "",
      usernameRules: [username => !!username || "username is required",
              username => username.length > 5 || "username must more than 5 charactor"],
      passwordRules: [
        password => !!password || "passoword is required",
        password => password.length > 5 || "password must more than 5 charactor"
      ],
      emailRules: [email => !!email || "email is required"],
      passwordValidate: [
        passwordvalidate =>
          !!passwordvalidate || "confirm password validate is required ",
        passwordvalidate =>
          passwordvalidate == this.password || "confirm password must match",
        passwordvalidate =>
          passwordvalidate.length > 5 || "confirm password must more than 5 charactor"
      ]
    };
  },
  computed: {
    ...mapGetters(["user", "error"])
  },
  watch: {
    user(value) {
      if (value) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    signUpuser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signUpuser", {
          username: this.username,
          password: this.password,
          email: this.email
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

h2,
h3 {
  font-size: 16px;
  letter-spacing: -1px;
  line-height: 20px;
}

h2 {
  color: #747474;
  text-align: center;
}

h3 {
  color: #032942;
  text-align: right;
}

.i {
  width: 20px;
  height: 20px;
}

.i-login {
  margin: 13px 0px 0px 15px;
  position: relative;
  float: left;

  background-size: 18px 18px;
  background-repeat: no-repeat;
  background-position: center;
}

.box {
  width: 330px;
  position: absolute;
  top: 50%;
  left: 50%;

  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.box-form {
  width: 320px;
  position: relative;
  z-index: 1;
}

.box-login-tab {
  width: 50%;
  height: 40px;
  background: #fdfdfd;
  position: relative;
  float: left;
  z-index: 1;

  -webkit-border-radius: 6px 6px 0 0;
  -moz-border-radius: 6px 6px 0 0;
  border-radius: 6px 6px 0 0;

  -webkit-transform: perspective(5px) rotateX(0.93deg) translateZ(-1px);
  transform: perspective(5px) rotateX(0.93deg) translateZ(-1px);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  -webkit-box-shadow: 15px -15px 30px rgba(0, 0, 0, 0.32);
  -moz-box-shadow: 15px -15px 30px rgba(0, 0, 0, 0.32);
  box-shadow: 15px -15px 30px rgba(0, 0, 0, 0.32);
}

.box-login-title {
  width: 35%;
  height: 40px;
  position: absolute;
  float: left;
  z-index: 2;
}

.box-login {
  position: relative;
  top: -4px;
  width: 320px;
  background: #fdfdfd;
  text-align: center;
  overflow: hidden;
  z-index: 2;

  -webkit-border-top-right-radius: 6px;
  -webkit-border-bottom-left-radius: 6px;
  -webkit-border-bottom-right-radius: 6px;
  -moz-border-radius-topright: 6px;
  -moz-border-radius-bottomleft: 6px;
  -moz-border-radius-bottomright: 6px;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;

  -webkit-box-shadow: 15px 30px 30px rgba(0, 0, 0, 0.32);
  -moz-box-shadow: 15px 30px 30px rgba(0, 0, 0, 0.32);
  box-shadow: 15px 30px 30px rgba(0, 0, 0, 0.32);
}

.box-info {
  width: 260px;
  top: 60px;
  position: absolute;
  right: -5px;
  padding: 15px 15px 15px 30px;
  background-color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 0;

  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;

  -webkit-box-shadow: 15px 30px 30px rgba(0, 0, 0, 0.32);
  -moz-box-shadow: 15px 30px 30px rgba(0, 0, 0, 0.32);
  box-shadow: 15px 30px 30px rgba(0, 0, 0, 0.32);
}

.line-wh {
  width: 100%;
  height: 1px;
  top: 0px;
  margin: 12px auto;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

/*--------------------
Form
---------------------*/

a {
  text-decoration: none;
}

button:focus {
  outline: 0;
}

.b {
  height: 24px;
  line-height: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.b-form {
  opacity: 0.5;
  margin: 10px 20px;
  float: right;
}

.b-info {
  opacity: 0.5;
  float: left;
}

.b-form:hover,
.b-info:hover {
  opacity: 1;
}

.b-support,
.b-cta {
  width: 100%;
  padding: 0px 15px;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  letter-spacing: -1px;
  font-size: 16px;
  line-height: 32px;
  cursor: pointer;

  -webkit-border-radius: 16px;
  -moz-border-radius: 16px;
  border-radius: 16px;
}

.b-support {
  border: #87314e 1px solid;
  background-color: transparent;
  color: #87314e;
  margin: 6px 0;
}

.b-cta {
  border: #df405a 1px solid;
  background-color: #df405a;
  color: #fff;
}

.b-support:hover,
.b-cta:hover {
  color: #fff;
  background-color: #87314e;
  border: #87314e 1px solid;
}

.fieldset-body {
  display: table;
}

.fieldset-body p {
  width: 100%;
  display: inline-table;
  padding: 5px 20px;
  margin-bottom: 2px;
}

label {
  float: left;
  width: 100%;
  top: 0px;
  color: #032942;
  font-size: 13px;
  font-weight: 700;
  text-align: left;
  line-height: 1.5;
}

label.checkbox {
  float: left;
  padding: 5px 20px;
  line-height: 1.7;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  height: 32px;
  padding: 0px 10px;
  background-color: rgba(0, 0, 0, 0.03);
  border: none;
  display: inline;
  color: #303030;
  font-size: 16px;
  font-weight: 400;
  float: left;

  -webkit-box-shadow: inset 1px 1px 0px rgba(0, 0, 0, 0.05),
    1px 1px 0px rgba(255, 255, 255, 1);
  -moz-box-shadow: inset 1px 1px 0px rgba(0, 0, 0, 0.05),
    1px 1px 0px rgba(255, 255, 255, 1);
  box-shadow: inset 1px 1px 0px rgba(0, 0, 0, 0.05),
    1px 1px 0px rgba(255, 255, 255, 1);
}

#do_login[type="text"]:focus,
#do_login[type="password"]:focus {
  background-color: #f8f8c6;
  outline: none;
}

#do_login[type="submit"] {
  width: 100%;
  height: 48px;
  margin-top: 24px;
  padding: 0px 20px;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
  line-height: 40px;
  text-align: center;
  background-color: #87314e;
  border: 1px #87314e solid;
  opacity: 1;
  cursor: pointer;
}

#do_login[type="submit"]:hover {
  background-color: #df405a;
  border: 1px #df405a solid;
}

#do_login[type="submit"]:focus {
  outline: none;
}
#do_login:disabled {
  border: #fff;
}
p.field span.i {
  width: 24px;
  height: 24px;
  float: right;
  position: relative;
  margin-top: -26px;
  right: 2px;
  z-index: 2;
  display: none;

  -webkit-animation: bounceIn 0.6s linear;
  -moz-animation: bounceIn 0.6s linear;
  -o-animation: bounceIn 0.6s linear;
  animation: bounceIn 0.6s linear;
}

.box-form,
.box-info,
.b,
.b-support,
.b-cta,
#do_login[type="submit"],
p.field span.i {
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

/*--------------------
Credits
---------------------*/

.icon-credits {
  width: 100%;
  position: absolute;
  bottom: 4px;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, sans-serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.1);
  text-align: center;
  z-index: -1;
}

.icon-credits a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.2);
}
</style>
