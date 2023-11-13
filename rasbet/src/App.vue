<template>
  <v-app>
    <v-app-bar app color="#063606" dark v-if="drawer" class="bar-style">
      <v-row class="bar-row">
        <v-col class="mt-1" cols="2">
          <div class="d-flex align-center">
            <router-link to="/">
              <v-img
                alt="RasBet Logo"
                class="shrink mr-2"
                contain
                src="./assets/logo.png"
                transition="scale-transition"
                width="200"
              />
            </router-link>
          </div>
        </v-col>
        <v-col class="mt-1" cols="4" style="text-align: center"> </v-col>
        <v-col class="mt-3" cols="6" style="text-align: center">
          <div class="fontWelcome" style="text-align: end">
            <v-row>
              <v-col cols="8" style="text-align: end; padding-top: 23px;">Bem vindo, {{ name }} !</v-col>

              <v-col cols="4" style="font-weight: bold;"
                >
                <v-tooltip  bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-on="on" v-bind="attrs">Saldo: {{ saldo }} €</span>
                  </template>
                    <div>
                      <p>{{ dolar }} $</p>
                      <p>{{ ada }} ADA</p>
                    </div>
                </v-tooltip>
                <v-btn icon color="white" @click="goSettings()">
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
                <v-menu 
                  v-if="notificationCounter>0"
                  offset-y
                  bottom
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="white" v-on="on" v-bind="attrs">
                      <v-badge v-if="notificationCounter>0"
                        bordered
                        bottom
                        color="#DAA520"
                        dot
                        offset-x="10"
                        offset-y="22"
                      >
                        <v-icon>mdi-bell</v-icon>
                      </v-badge>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in notifications"
                      :key="index"
                      class="notificationsMain"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                        <v-list-item-subtitle>
                          <div class="d-flex justify-space-between">
                            <span v-if="item.finished=false">Partida começou </span>
                            <span v-if="item.finished=true">Partida acabou</span>
                          </div>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
                
                  <v-btn icon color="white" @click="logout()">
                   <v-icon>mdi-logout-variant</v-icon>
                  </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view />
      <!-- {{this.$route.path}} -->
    </v-main>
  </v-app>
</template>

<script>
import Axios from 'axios'
const dataAPI  = require("@/config/host").dataAPI
export default {
  name: "App",

  data: () => ({
    drawer: true,
    selectedbtn: null,
    notificationCounter: 0,
    name: null,
    saldo: 0,
    dolar: 0,
    ada: 0,
    apostador: null,
    teste:null,
    notifications: []
    //
  }),
  methods: {
    goSettings() {
      this.$router.push("/settings");
    },
    logout() {
      this.$store.commit("updateidUser",0);
      this.$store.commit("updateUserName","");
      this.$store.commit("updateUserSurname","");
      this.$store.commit("updateAccessToken","");
      this.$store.commit("updateEuro",0);
      this.$store.commit("updateADA",0);
      this.$store.commit("updateDolar",0);
      this.$store.commit("updateexpirationDate","");
      this.$store.commit("addNotification",[]);
      this.$router.push("/login");
    },
    async notificationCounterUp() {
      var startedGames = await Axios.get(dataAPI+"jogo/getRecentGame")
      var finishedGames = await Axios.get(dataAPI+"jogo/getRecentlyEnded") 
      var notifications = this.$store.getters.nofitication
      if(startedGames.data.length>0){
        for( var i  in startedGames.data){
          let index = notifications.map(obj => obj.idJogo).indexOf(startedGames.data[i].idJogo)
          if(index < 0){
            startedGames.data[i].seen=false
            finishedGames.data[j].finished=false
            notifications.push(startedGames.data[i])
          }
        }
      }
      if(finishedGames.data.length>0){
        for( var j  in finishedGames.data){
          let index2 = notifications.map(obj => obj.idJogo).indexOf(finishedGames.data[j].idJogo)
          if(index2 < 0){
            finishedGames.data[j].seen=false
            finishedGames.data[j].finished=true
            notifications.push(finishedGames.data[j])
          }
        }
      }
      this.$store.commit("addNotification", notifications)
      this.notifications=notifications;
      if(this.notifications.length>0){
        
        this.notificationCounter=1;
      }
      console.log(this.notifications)
    },
  },
  created() {
    
    if (this.$route.path.toLowerCase() == "/login" || this.$route.path.toLowerCase() == "/register") {
      this.drawer = false;
    } else {
      this.drawer = true;
    }

    this.$crontab.addJob({
      name: "notificationCounter",
      interval: {
        seconds: '/10',
      },
      job: this.notificationCounterUp,
    });
  },
  watch: {
    "$route.path": function () {
      if (this.$route.path.toLowerCase() === "/login" || this.$route.path.toLowerCase() == "/register") {
        this.drawer = false;
      } else {
        this.drawer = true;
      }
    },
    "$store.getters.userName": function() {
      this.name = this.$store.getters.userName + " " + this.$store.getters.userSurname
    },
    "$store.getters.euro": function () {
      this.saldo = this.$store.getters.euro
    },
    "$store.getters.dolar": function () {
      this.dolar = this.$store.getters.dolar
    },
    "$store.getters.ada": function () {
      this.ada = this.$store.getters.ada
    }
  },
  mounted(){
    this.name = this.$store.getters.userName + " " + this.$store.getters.userSurname
    this.saldo = this.$store.getters.euro
    this.dolar = this.$store.getters.dolar
    this.ada = this.$store.getters.ada
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,500;1,300&display=swap");
.bar-style,
.v-toolbar__content {
  height: 90px !important;
}
.bar-row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin: -12px;
  align-items: center;
}
.userbtn:focus {
  outline: none !important;
  box-shadow: none !important;
}

.fontSports {
  font-family: "Bebas Neue", cursive;
  font-size: 20px !important;
  padding-right: 40px !important;
  padding-left: 40px !important;
}

.fontWelcome {
  font-family: "Montserrat", sans-serif;
}

.theme--dark.v-badge .v-badge__badge::after {
    border-color: #063606;
}

.v-badge--dot .v-badge__badge::after {
    border-width: 1px;
    transform: scale(1.45);
}

.notificationsMain {
    margin:1vh; 
    height:100%;
}

.win-text {
  color: #11b911
}

.lose-text {
  color: #ec1616
}

</style>
