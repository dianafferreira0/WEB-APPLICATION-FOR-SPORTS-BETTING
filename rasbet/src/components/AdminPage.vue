<template>
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
        label="Pesquisar"
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
        v-bind:choice="choice"
        v-bind:selectResult="selectOddAndGame"
        v-bind:editable="true"
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
</template>

<script>
import BetCard from "./BetCard.vue";
import Axios from "axios";
const dataAPI = require("@/config/host").dataAPI;

export default {
  name: "AdminPage",
  components: {
    BetCard,
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
  }),
  methods: {
    async getGames() {
      var response = await Axios.get(dataAPI + "jogo/getAllJogos");
      console.log(response.data);
      for (var i in response.data) {
        this.originalGames.push(response.data[i]);
        //console.log(response.data[i])
      }
    },
    goto(sport) {
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
      boletim.Aposta = this.selected;
      await Axios.post(dataAPI + "boletim/createBoletim", boletim);
      for (var i in this.selection) {
        console.log(this.selection[i]);
      }
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
    searchFunc () {
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
