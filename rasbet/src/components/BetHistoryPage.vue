<template>
  <v-card class="centerCard-settings" elevation="5">
    <v-card-text>
      <v-btn style="text-align: left" @click="goBack()" icon color="#063606">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
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
        {{ userName }} {{ userSurname }}
      </div>
      <div
        class="fontUser"
        style="
          text-align: center;
          font-size: 18px;
          padding-bottom: 8px;
          padding-top: 4px;
          font-weight: 600;
        "
      >
        Histórico de Apostas
      </div>

      <div style="padding-left: 15px; padding-right: 15px">
        <hr style="height: 1px; background-color: #e0e0 border: none" />

        <v-row style="padding-top: 15px; text-align: center">
          <v-col cols="6">
            <v-btn
              class="simpleButton"
              :class="
                selected == 'Simples' ? 'selectedbtn-settings' : 'btn-settings'
              "
              @click="() => filterBets('Simples')"
              >Simples</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn
              class="multButton"
              :class="
                selected == 'Multipla' ? 'selectedbtn-settings' : 'btn-settings'
              "
              @click="() => filterBets('Multipla')"
              >Múltiplas</v-btn
            >
          </v-col>
        </v-row>
        <div style="padding-top: 25px">
          <v-card
            style="margin-bottom: 10px; border: 1px solid #063606"
            v-for="(bets, index) in list"
            :key="index"
            outlined
            border-color="#063606"
            rounded
          >
            <v-row>
              <v-col cols="6">
                <v-card-text
                  v-for="(bet, i) in bets"
                  :key="i"
                  style="
                    padding-top: 10px;
                    padding-left: 10px;
                    padding-bottom: 0px;
                  "
                >
                  <p
                    class="fontUser"
                    style="
                      font-size: 17px;
                      font-weight: 500;
                      margin-bottom: 0px;
                    "
                  >
                   
                    {{ bet.gameName }}
                  </p>
                  <p
                    class="fontUser"
                    style="
                      color: black;
                      font-size: 12px;
                      font-weight: 600;
                      margin-bottom: 0px;
                    "
                  >
                    Aposta: {{ bet.escolha }}
                  </p>
                  <p
                    class="fontUser"
                    style="color: black; font-size: 12px; font-weight: 600"
                  >
                    Vencedor do jogo: {{ bet.winner }}
                  </p>
                </v-card-text>
              </v-col>
              <v-divider
                vertical
                style="
                  margin-top: 20px;
                  margin-bottom: 20px;
                  border-color: #063606;
                "
              ></v-divider>
              <v-col cols="6" style="display: flex; align-items: center">
                <v-card-text>
                  <p
                    class="fontUser"
                    style="
                      color: black;
                      font-size: 12px;
                      font-weight: 400;
                      margin-bottom: 30px;
                    "
                  >
                    Montante: {{bets[0].quantia}}€
                  </p>

                  <p
                    class="fontUser"
                    style="color: black; font-size: 12px; font-weight: 400"
                  >
                    Total de ganhos:{{bets[0].quantia * bets[0].oddSum}}€
                  </p>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Axios from 'axios'
const dataAPI  = require("@/config/host").dataAPI
export default {
  name: "BetHistory",
  data: () => ({
    userName: "",
    userSurname: "",
    quantia: 0,
    visible: false,
    selected: null,
    history: [],
    list: [],
    simples: [],
    multiplas: [],
    apostador: null,
    id: null,
  }),
  methods: {
    goBack() {
      this.$router.push("/settings");
    },
    filterBets: function (escolha) {
      if (this.selected == escolha) this.selected = null;
      else this.selected = escolha;

      if (this.selected == "Simples") this.list = this.simples;
      else if (this.selected == "Multipla") this.list = this.multiplas;
      else this.list = this.history;
    },
    async getHistory(){
      var idUser = this.$store.getters.idUser
      var response = await Axios.get(dataAPI+"boletim/getAll/"+idUser)
      var bets = response.data
      console.log(bets)
      var boletim = []
      boletim.push(bets[0]);
      for (let i=1 ; i<bets.length ; i++) {
        if ( bets[i].idBoletim == bets[i-1].idBoletim ) {
          boletim.push(bets[i]);
        } 
        else {
          if(boletim.length>1)
            this.multiplas.push(boletim);
          else{
            this.simples.push(boletim);
          }
          this.history.push(boletim);
          boletim = []
          boletim.push(bets[i]);
        }
      }
      this.history.push(boletim);
      console.log(this.history)
    }
  },
  created() {
    this.getHistory()
    this.list = this.history;
  },
  mounted(){
    console.log(this.$store.getters.userName)
    console.log(this.$store.getters.idUser)
    this.id = this.$store.getters.idUser
    this.userName = this.$store.getters.userName
    this.userSurname = this.$store.getters.userSurname
    this.quantia = this.$store.getters.quantia
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,500;1,300&display=swap");

.multButton {
  float: left;
  margin-left: 5vw;
}

.simpleButton {
  float: right;
  margin-right: 5vw;
}

.centerCard-settings {
  justify-content: center;
  margin: 20vh 10vw 5vh 10vw;
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

.fontUser {
  font-family: "Montserrat", sans-serif;
  color: #063606;
}

.hr-vertical {
  border: none;
  border-left: 1px solid hsla(200, 10%, 50%, 100);
  height: 100vh;
  width: 1px;
}
</style>
