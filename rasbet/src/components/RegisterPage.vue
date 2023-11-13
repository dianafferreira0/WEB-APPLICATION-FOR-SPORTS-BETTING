<template>
  <v-card class="centerCard" elevation="5">
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
              v-model="form.nome"
              label="Nome"
              :rules="[
                (v) => !!v || 'Nome é necessário required'
              ]"
            >
            </v-text-field>
              <v-text-field
              v-model="form.apelido"
              label="Apelido"
              :rules="[
                (v) => !!v || 'Apelido é necessário',
              ]"
            >
            </v-text-field>
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
            <v-text-field
              v-model="form.birthdate"
              label="Data de Nascimento"
              :rules="[
                (v) => !!v || 'Data de Nascimento é Obrigatório'
              ]"
              type="date"
            >
            </v-text-field>
            <v-text-field
              v-model="form.nif"
              label="NIF"
              :rules="[
                (v) => !!v || 'NIF é Obrigatório',
                (v) => v.length == 9 || 'NIF É obrigatório',
              ]"
            >
            </v-text-field>
              <v-text-field
              v-model="form.cc"
              label="CC"
              :rules="[
                (v) => !!v || 'CC precisa de ser válido',
                (v) =>
                  v.length == 9  || 'CC Precisa de ser válido',
              ]"
            >
            </v-text-field>
            <v-btn class="registerButton white--text" color="#063606" block @click="register"> Registar-se </v-btn>
            <!-- forgot password -->
          </v-form>
          
    </v-card-text>
  </v-card>
</template>
<script>
//import Axios from 'axios'
//const dataAPI  = require("@/config/host").dataAPI
export default {
  name: 'Register',

    props:[
        'merda',
    ],

  data() {
    return {
      valid: false,
      form: {
        email: '',
        password: '',
        nome: '',
        apelido: '',
        birthdate: '',
        nif: '',
        cc: '',
        eur: 0,
        usd: 0,
        ada: 0
      },
    }
  },

  methods: {
    async register() {
      console.log(this.form)
      if (this.$refs.form.validate()) {
        //await Axios.post(dataAPI+"apostador/create/",this.form);
        this.$router.push('/create')
      }
    },
  },
}
</script>
<style>

.centerCard {
  height: 100%;
  margin-top: 20vh;
  margin-left: 22vw;
  margin-right: 22vw;
  padding-bottom: 1vh!important;
  padding-left: 2vw;
  padding-right: 2vw;
  padding-bottom: 0px;
}

.cardTittle {
  font-size: 2vw;
  font-weight: bold;
  text-align: center;
  color: #063606;
  padding-top: 6vh;
  padding-bottom: 6vh;

}

.forgotPassword {
  font-size: 1vw;
  font-weight: bold;
  align-items: right;
  float: right;
  color: #063606;
  margin-top: 2vh;
  margin-bottom: 2vh;
}
.needAccount {
  margin-top: 4vh;
  
  float: right;
}

.registerButton {
    margin-top: 6vh;
    margin-bottom: 4vh;
}

</style>