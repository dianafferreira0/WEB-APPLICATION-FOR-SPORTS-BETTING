<template>
  <v-row>
    <v-col class="mb-6" cols="9">
      <v-container class="betsContainer">
        <div  class="mb-5" style="margin-left: 0px">
          <v-btn
            class="fontSports"
            :class="selectedbtn == 'Todos' ? 'selectedbtn-row' : 'btn-row'"
            @click="() => goto('Todos')"
            >Todos</v-btn
          >

          <v-btn
            class="fontSports"
            :class="selectedbtn == 'Futebol' ? 'selectedbtn-row' : 'btn-row'"
            @click="() => goto('Futebol')"
            >Futebol</v-btn
          >

          <v-btn
            class="fontSports"
            :class="
              selectedbtn == 'Basquetebol' ? 'selectedbtn-row' : 'btn-row'
            "
            @click="() => goto('Basquetebol')"
            >Basquetebol</v-btn
          >

          <v-btn
            class="fontSports"
            :class="selectedbtn == 'Ténis' ? 'selectedbtn-row' : 'btn-row'"
            @click="() => goto('Ténis')"
            >Tenis</v-btn
          >

          <v-btn
            class="fontSports"
            :class="selectedbtn == 'formula_1' ? 'selectedbtn-row' : 'btn-row'"
            @click="() => goto('formula_1')"
            >Formula 1</v-btn
          >
        </div>
        <div>
          <!-- Search -->
          <v-text-field
            v-model="search"
            label="pesquisar"
            single-line
            hide-details
            outlined
            background-color="white"
            prepend-inner-icon="mdi-magnify"
            @keyup.enter.native="search"
            class="mb-5"
          />
        </div>
        <div>
          <!-- Cards -->
          <BetCard
            class="my-5"
            v-for="(game, index) in slicedGames"
            :key="index"
            v-bind:game="game"
            v-bind:selectResult="selectOddAndGame"
            v-bind:removeBet="removeBetById"
          />
        </div>
        <div class="text-center">
          <v-pagination
            color="#063606"
            v-model="page"
            :length="maxPage"
          ></v-pagination>
        </div>
      </v-container>
    </v-col>
    <v-col cols="3" class="boletimSection">
      <p class="bHeader">BOLETIM</p>
      <v-container>
        <Boletim
          v-for="(selection,index) in selected"
          :key="index"
          v-bind:selection="selection"
          v-bind:removeBet="removeBetById"
          v-bind:index="index"
        />
      </v-container>
      <hr style="margin-bottom:10px" />
      <div>
      <v-row>
          <v-col cols="6 text-left" style="padding-bottom: 0px">
            <p>Odd Total:</p>
          </v-col>
          <v-col cols="6" style="align-center; padding-bottom: 0px;">
            <p>{{parseFloat(this.totalOdd)}}</p>
          </v-col>
        </v-row>
      <v-row style="padding-bottom: 3px; " >
          <v-col cols="6 text-left">Montante:</v-col>
          <v-col cols="6" style="padding-top: 0px">
            <v-text-field
              v-model="montante"
              style="color=black !important; height: 30px;padding-top: 0px;width: 190px;"
              prepend-icon="mdi-currency-eur"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6 text-left" style="padding-bottom: 0px">
            <p>Total de Ganhos:</p>
          </v-col>
          <v-col cols="6" style="align-center; padding-bottom: 0px;">
            <p v-if="this.montante!=0">{{(parseFloat(this.totalOdd)*parseFloat(this.montante)).toFixed(2)}}€</p>
          </v-col>
        </v-row>
        
        <v-row style="justify-content: center; margin-bottom: 12px;">
          <v-btn v-if="this.montante!=0 && this.selected.length!=0" class="btnAposta"
            @click="registerBoletim">Aposta Já!</v-btn>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import BetCard from "./BetCard.vue";
import Boletim from "./Boletim.vue";
import Axios from "axios";
const dataAPI = require("@/config/host").dataAPI;

export default {
  name: "Home",
  components: {
    BetCard,
    Boletim,
  },
  data: () => ({
    search: "",
    page: 1,
    maxPage: 1,
    selected: [],
    totalOdd: 0,
    choice: null,
    type: "",
    games: null,
    montante:0,
    slicedGames: null,
    selectedbtn: null,
    originalGames: [],
    id: 0,
  }),
  methods: {
    removeBetById(id) {
      var index = this.selected.map(obj => obj.idGame).indexOf(id)
      if (index >= 0) {
        this.totalOdd = parseFloat(this.totalOdd)/parseFloat(this.selected[index].odd);
        this.selected.splice(index, 1);
        if(this.totalOdd==null || this.totalOdd==1) this.totalOdd=0;
        this.totalOdd=this.totalOdd.toFixed(2);
      }
    },
    async getGames() {
      var response = await Axios.get(dataAPI + "jogo/getAllJogos");
      console.log(response.data);
      for (var i in response.data) {
        if(response.data[i].estado=='A')
          this.originalGames.push(response.data[i]);
        //console.log(response.data[i])
      }
    },
    goto: function (sport) {
      this.selectedbtn = sport;
      if (sport == "Todos") this.type = "";
      else this.type = sport;
    },
    async registerBoletim() {
      var oddSum = this.selected.reduce((a, b) => a * (b["odd"] || 1), 1);
      var boletim = {};
      boletim.idApostador = this.id; 
      boletim.oddSum = oddSum;
      boletim.quantia = this.montante;
      console.log(this.montante)
      boletim.Aposta = this.selected;
      await Axios.post(dataAPI + "boletim/createBoletim", boletim);
      this.$router.push({
        name: "PayBet",
        params: {
          boletim: boletim,
        },
      });
    },
    selectOddAndGame(idGame, gameName, idteam, name, odd, idPartida) {
      this.choice=idPartida;
      this.selected.push({
        idGame: idGame,
        gameName: gameName,
        idteam: idteam,
        name: name,
        odd: odd,
        idPartida: idPartida,
      });
      //add odd to this.totalOdd converting it to an integer; 
      if (this.totalOdd ==0) this.totalOdd = 1;
      this.totalOdd = parseFloat(this.totalOdd) * parseFloat(odd);
      this.totalOdd=this.totalOdd.toFixed(2);
    },
    searchFunc: () => {
      if (this.search == "" || this.search == null) {
        if (this.type == "") this.games = this.originalGames;
        else
          this.games = this.originalGames.filter(
            (game) => game.type == this.type
          );
      } else {
        if (this.type == "")
          this.games = this.originalGames.filter(
            (game) =>
              game.name.toLowerCase().includes(this.search.toLowerCase())
          );
        else
          this.games = this.originalGames.filter(
            (game) =>
              game.type == this.type &&
              (game.name.toLowerCase().includes(this.search.toLowerCase()))
          );
      }
      this.slicedGames = this.games.slice(
        (this.page - 1) * 5,
        (this.page - 1) * 5 + 5
      );
    },
  },
  watch: {
    search: function () {
      if (this.search == "" || this.search == null) {
        if (this.type == "") this.games = this.originalGames;
        else
          this.games = this.originalGames.filter(
            (game) => game.type == this.type
          );
      } else {
        if (this.type == "")
          this.games = this.originalGames.filter((game) =>
            game.name.toLowerCase().includes(this.search.toLowerCase())
          );
        else
          this.games = this.originalGames.filter(
            (game) =>
              game.type == this.type &&
              game.name.toLowerCase().includes(this.search.toLowerCase())
          );
      }
      this.slicedGames = this.games.slice(
        (this.page - 1) * 5,
        (this.page - 1) * 5 + 5
      );
    },
    page: function () {
      if (this.search == "" || this.search == null) {
        if (this.type == "") this.games = this.originalGames;
        else
          this.games = this.originalGames.filter(
            (game) => game.type == this.type
          );
      } else {
        if (this.type == "")
          this.games = this.originalGames.filter(
            (game) =>
              game.name.toLowerCase().includes(this.search.toLowerCase())
          );
        else
          this.games = this.originalGames.filter(
            (game) =>
              game.type == this.type &&
              (game.name.toLowerCase().includes(this.search.toLowerCase()))
          );
      }
      this.slicedGames = this.games.slice(
        (this.page - 1) * 5,
        (this.page - 1) * 5 + 5
      );
    },
    type: function () {
      if (this.search == "" || this.search == null) {
        if (this.type == "") this.games = this.originalGames;
        else
          this.games = this.originalGames.filter(
            (game) => game.type == this.type
          );
      } else {
        if (this.type == "")
          this.games = this.originalGames.filter(
            (game) =>
              game.name.toLowerCase().includes(this.search.toLowerCase())
          );
        else
          this.games = this.originalGames.filter(
            (game) =>
              game.type == this.type &&
              (game.name.toLowerCase().includes(this.search.toLowerCase()))
          );
      }
      this.page = 1;
      this.slicedGames = this.games.slice(
        (this.page - 1) * 5,
        (this.page - 1) * 5 + 5
      );
    },
  },
  created: async function () {
    this.id = this.$store.getters.idUser
    await this.getGames();
    this.type = "";
    this.maxPage =
      Math.floor(this.originalGames.length / 5) +
      (this.originalGames.length % 5 == 0 ? 0 : 1);
    if (this.type == "") this.games = this.originalGames;
    else
      this.games = this.originalGames.filter((game) => game.type == this.type);

    this.slicedGames = this.games.slice((this.page - 1) * 5, this.page * 5);
     },
};
</script>

<style>
.homepage {
  margin-top: 20vh;
}

.boletimSection {
  border: solid #063606;
  margin-bottom: 12vh;
  background-color: white !important;
  margin-top: 12vh;
  text-align: center;
  border-radius: 15px;
}

.betsContainer {
  padding-top: 10vh;
}

.bHeader {
  font-size: 1.5vw;
  font-weight: bold;
  color: #063606;
}

.theme--light.v-card > .v-card__text,
.theme--light.v-card > .v-card__subtitle {
  color: black;
}

.fontSports {
  font-family: "Bebas Neue", cursive;
  font-size: 16px !important;
  padding-right: 40px !important;
  padding-left: 40px !important;
  margin-right: 25px !important;
}
.btn-row {
  border-style: solid !important;
  border-color: #063606 !important;
  background-color: white !important;
  color: #063606 !important;
}
.selectedbtn-row {
  background-color: #063606 !important;
  color: white !important;
}

.btnAposta{
  border-style: solid !important;
  border-color: rgb(218, 165, 32) !important;
  background-color: rgb(218, 165, 32) !important;
  color: white !important;
}
</style>
