<template>
  <v-card class="centerCard" height="50vh" elevation="5">
    <v-card-text>
          <v-img
          class="mx-auto"
            lazy-src="../assets/logo-without-background.png"
            max-height="77"
            max-width="250"
            src="../assets/logo-without-background.png"
            ></v-img>
          <v-form ref="form" class="Form" classv-model="valid" lazy-validation>
            <v-text-field
              v-model="form.email"
              label="Email"
              :rules="[
                (v) => !!v || 'Email is required',
                (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
              ]"
            >
            </v-text-field>
            <v-text-field
              v-model="form.password"
              label="Password"
              :rules="[
                (v) => !!v || 'Password is required',
                (v) =>
                  v.length >= 6 || 'Password must be at least 6 characters',
              ]"
              type="password"
            >
            </v-text-field>
            <v-btn
              class="forgotPassword white--text"  color="#063606"
              @click="forgotPassword"
              >
              Esqueceu sua senha?
            </v-btn>
            <v-btn class="loginButton white--text" color="#063606" block @click="Login"> Login </v-btn>
            <v-btn
              class="needAccount white--text"  color="#063606"
              @click="Register"
              >
              Não tem conta? Proceda ao registo.
            </v-btn>
          </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import Axios from "axios";
const dataAPI = require("@/config/host").dataAPI;
export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      form: {
        email: '',
        password: '',
      },
    }
  },

  methods: {
    async Login() { 
      if (this.$refs.form.validate()) {
        try {
          var result = await Axios.post(dataAPI+"apostador/login",this.form)
          var apostador = result.data.apostador[0];
          let expirationDate = result.data.expirationDate;
          console.log(apostador)
          if (apostador) {
            this.$store.commit("updateUserName",apostador.Nome)
            this.$store.commit("updateUserSurname",apostador.Apelido)
            this.$store.commit("updateidUser",apostador.idApostador)
            this.$store.commit("updateexpirationDate",expirationDate)
            this.$store.commit("updateEuro",apostador.Euro)
            this.$store.commit("updateADA",apostador.ACA)
            this.$store.commit("updateDolar",apostador.Dolar)
          }
          this.$router.push('/')
        }
        catch {
          alert("Error on login")
        }
      }
    },
    Register(){
      this.$router.push('/register')
    },
    forgotPassword(){
    },

  },
}
</script>
<style>

.centerCard {
  justify-content: center;
  height: 100%;
  margin-top: 20vh;
  margin-left: 22vw;
  margin-right: 22vw;
  padding-bottom: 5vh;
  padding-left: 2vw;
  padding-right: 2vw;
}

.cardTittle {
  font-size: 2vw;
  font-weight: bold;
  color: #063606;
  padding-top: 6vh;
  margin-left: auto!important;
  margin-right: auto!important;
  width: 50%!important;

}

.forgotPassword {
  font-size: 1vw;
  font-weight: bold;
  align-items: right;
  float: right;
  color: #063606;
}
.needAccount {
  margin-top: 4vh;
  
  float: right;
}


</style>