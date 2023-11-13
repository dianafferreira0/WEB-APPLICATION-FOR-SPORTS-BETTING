<template>
  <v-card class="centerCard-settings" elevation="5">
    <v-card-text>
      <div
        class="fontUser"
        style="
          text-align: center;
          padding-bottom: 30px;
          padding-top: 15px;
          font-size: 30px;
          font-weight: 500;
        "
      >
        {{ userNameOriginal }} {{ userSurnameOriginal }}
      </div>
      <div
        class="fontUser"
        style="text-align: center; font-size: 18px; padding-bottom: 8px"
      >
        Saldo: {{userSaldo}} €

        <v-tooltip  bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon style="color: #063606" v-on="on" v-bind="attrs"
              >mdi-information-outline</v-icon
            >
          </template>
          <div>
            <p>{{ saldoUSD }} USD</p>
            <p>{{ saldoADA }} ADA</p>
          </div>
        </v-tooltip>
      </div>

      <div style="padding-left: 15px; padding-right: 15px">
        <hr style="height: 1px; background-color: #e0e0e0; border: none" />

        <v-row style="padding-top: 15px; text-align: center">
          <v-col cols="6">
            <v-btn
              :class="
                selected == 'Levantar' ? 'selectedbtn-settings' : 'btn-settings'
              "
              @click="() => gotoLevantar()"
              >Levantar</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn
              :class="
                selected == 'Depositar'
                  ? 'selectedbtn-settings'
                  : 'btn-settings'
              "
              @click="() => goDeposito()"
              >Depositar</v-btn
            >
          </v-col>
        </v-row>

        <div>
          <div
            class="fontUser"
            style="
              padding-top: 40px;
              padding-bottom: 20px;
              font-size: 18px;
              font-weight: 600;
            "
          >
            Consultar Histórico de apostas
            <v-btn @click="goToBetHistory()" icon color="#063606">
              <v-icon >mdi-arrow-right</v-icon>
            </v-btn>
          </div>
          <v-row class="fontUser d-flex justify-center align-center">
            <v-col cols="6">
              <div style="font-size: 17px">Nome:</div>
            </v-col>
            <v-col cols="6">
              <v-text-field
                color=#063606
                style=" height: 50px; "
                outlined
                v-model="userName"
              />
            </v-col>
          </v-row>
          <v-row class="fontUser d-flex justify-center align-center">
            <v-col cols="6">
              <div style="font-size: 17px">Apelido:</div>
            </v-col>
            <v-col cols="6">
              <v-text-field
                color=#063606
                style=" height: 50px; "
                outlined
                v-model="userSurname"
              />
            </v-col>
          </v-row>
          <v-row class="fontUser d-flex justify-center align-center">
            <v-col cols="6">
              <div style="font-size: 17px">Mudar palavra-passe:</div>
            </v-col>
            <v-col cols="6">
              <v-text-field
                color=#063606
                style=" height: 50px; "
                outlined
                :type="visible ? 'text' : 'password'"
                v-model="password"
                :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="visible = !visible"
              />
            </v-col>
          </v-row>
          <div
            style="padding-top: 40px; padding-bottom: 10px; text-align: center"
          >
            <!--v-btn class="btn-save-settings">Guardar Alterações</v-btn-->
            <div class="text-center">
              <v-btn class="btn-save-settings" @click="() => saveChanges()">
                Guardar
              </v-btn>
              <v-snackbar
                v-model="snackbar"
                :vertical="vertical"
                :timeout="1000"
                auto-height
              >
                <v-layout align-center pr-4>
                  <v-icon class="pr-3" large>mdi-check-circle</v-icon>
                  <v-layout column>
                    <div>
                      <strong>Sucesso</strong>
                    </div>
                    <div>{{text}}</div>
                  </v-layout>
                </v-layout>
              </v-snackbar>
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Axios from 'axios'
const dataAPI  = require("@/config/host").dataAPI
export default {
  name: "Settings",
  data: () => ({
    idUser: 0,
    userName: "",
    userNameOriginal: "",
    userSurname: "",
    userSurnameOriginal: "",
    password: "",
    userSaldo: "0",
    visible: false,
    selected: null,
    saldoUSD: "0",
    saldoADA: "0",
    snackbar: false,
    text: "Alterações Guardadas",
    
  }),
  methods: {
    gotoLevantar(){
      this.$router.push('/withdrawal')
    },
    goDeposito(){
      this.$router.push('/deposit')
    },

    goToBetHistory(){
        this.$router.push('/bethistory')
    },

    saveChanges() {
      this.snackbar = true
      this.userNameOriginal = this.userName
      this.userSurnameOriginal = this.userSurname
      
      var updateUser = {}
      if (this.password == '') {
        updateUser = {
          nome: this.userNameOriginal,
          apelido: this.userSurnameOriginal
        }
      }
      else {
        updateUser = {
          nome: this.userNameOriginal,
          apelido: this.userSurnameOriginal,
          password: this.password
        }
      }
      Axios.put(dataAPI+"apostador/update/"+this.idUser,updateUser).then(() => {
        this.$store.commit("updateUserName",this.userName);
        this.$store.commit("updateUserSurname",this.userSurname);
      })
    }
  },
  created: function() {
    this.iduser = this.$store.getters.idUser
    this.userName = this.$store.getters.userName
    this.userSurname = this.$store.getters.userSurname
    this.userSaldo = this.$store.getters.euro
    this.saldoUSD = this.$store.getters.dolar
    this.saldoADA = this.$store.getters.ada
    this.userNameOriginal = this.userName
    this.userSurnameOriginal= this.userSurname
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,500;1,300&display=swap");

.centerCard-settings {
  justify-content: center;
  margin: 20vh 20vw 5vh 20vw;
}

.btn-settings {
  background-color: #fe6f2f !important;
  color: white !important;
}
.selectedbtn-settings {
  background-color: white !important;
  color: #fe6f2f !important;
  border: 1px solid #fe6f2f !important;
}

.btn-save-settings {
  background-color: #063606 !important;
  color: white !important;
}
.btn-save-settings:focus {
  background-color: white !important;
  color: #063606 !important;
  border: 1px solid #063606 !important;
}

.v-text-field--outlined fieldset {
    border-color: #063606 !important
}

.fontUser {
  font-family: "Montserrat", sans-serif;
  color: #063606;
}
</style>
