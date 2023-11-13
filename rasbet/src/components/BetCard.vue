<template>
    <v-card elevation="1">
         <v-card-text style="border:solid 1px; border-color=#063606" v-if="game">
            <p></p>
            <v-row>
                <v-col cols="1" v-if="editable && game.estado != 'F'">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class=""
                        text
                        dark
                        :color="game.estado =='A' ? '#E53935' : '#26A69A' "
                        @click="() => desativarAposta()"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon v-if="game.estado =='A'">
                          mdi-eye-off
                        </v-icon>
                        <v-icon v-else>
                          mdi-eye
                        </v-icon>
                      </v-btn>
                    </template>
                    <span v-if="game.estado =='A'">Desativar partida</span>
                    <span v-if="game.estado =='S'">Ativar partida</span>
                  </v-tooltip>
                </v-col>

                <v-col cols="!editable ? 6 : 4">
                  <h4  style="font-size: 17px; padding-bottom: 5px">
                  {{ game.name }}</h4>
                  <p style="font-size: 15px">{{ game.data }}</p>
                </v-col>

                <v-col style="margin-top: 13px" cols="2" v-for="team in game.equipas" :key="team.idTeam">
                  <v-btn v-if="!editable" style="padding-bottom: 10px"  :class="choice == team.idEquipa ? 'buttonSelect1' : 'buttonNonSelect1'"
                      @click="()=>selectOdd(team)"
                      >
                    <div class="gameData">
                      <p class="gameTittle">{{ team.equipa}}</p>
                      <p class="gameOdd">{{ team.odd }}</p>
                    </div>
                  </v-btn>
                  <v-text-field
                    v-else
                    :label="team.equipa"
                    v-model="team.odd"
                    outlined
                  ></v-text-field>
                </v-col>
                
                <v-col cols="1" v-if="editable">
                <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mt-3"
                    fab
                    dark
                    color="#DAA520"
                    @click="() => updateAposta()"
          v-bind="attrs"
          v-on="on"
                  >
                    <v-icon>
                      mdi-update
                    </v-icon>
                  </v-btn>
      </template>
      <span>Atualizar odds da partida</span>
    </v-tooltip>
                </v-col>
            </v-row>
        </v-card-text>
        <v-snackbar
          timeout="5000"
          color="pink darken-1"
          v-model="alert"
        >
          {{ alertMsg }}
        </v-snackbar>
    </v-card>
</template>

<script>
import Axios from 'axios'
const dataAPI = require("@/config/host").dataAPI;

export default {
    props: ['game','selectResult','removeBet','editable'],
    data: () => ({
      choice: null,
      alert: false,
      alertMsg: ""
    }),

    methods: {
      selectOdd (team) {
        this.removeBet(this.game.id)
        if (this.choice == team.idEquipa) this.choice=null
        else {this.choice = team.idEquipa
        this.selectResult(this.game.id,this.game.name,team.idEquipa,team.equipa,team.odd,team.idPartida)}
      },
      updateAposta () {
        for(var equipa of this.game.equipas)
          Axios.put(dataAPI + "partida/updateOdd/" + equipa.idPartida, {
            odd: equipa.odd
          })
          .catch(() => {
            this.alertMsg = "Erro no update da Partida"
            this.alert = true;
          })
      },
      desativarAposta() {
        Axios.put(dataAPI + "jogo/updateEstado/" + this.game.id, {
          estado: this.game.estado == 'A' ? "S" : "A" //A - Aberto F- Fechado S - Suspenso
        })
        .then(() => {
          if (this.game.estado == 'A') 
            this.game.estado = "S"
          else
            this.game.estado = "A"
        })
      }
    },
}


</script>
<style>
.gameData {
  color: white;
}

.gameTittle {
  color: #063606;
  inline-size: 90px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
   white-space: nowrap !important;
}
.betButton {
  width: 100%;
}
.buttonSelect1 {
  background-color: orange !important;
  color: white !important;
  padding: 10vh;
  width: 100%;
}

.buttonNonSelect1 {
  background-color: #063606 !important;
  color: white !important;
  width: 100%;
}


</style>
