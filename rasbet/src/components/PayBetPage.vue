<template>
  <v-card class="centerCard-settings" elevation="5">
    <v-card-text>
    <v-btn style="text-align: left" @click="gotoHome()" icon color="#063606">
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
        Pagamento
      </div>
      <div
        class="fontUser"
        style="text-align: center; font-size: 18px; padding-bottom: 8px"
      >
        Montante a apostar: {{ calcMontante() }} 
        <span v-if="selected == 'euro'">€</span>
        <span v-else-if="selected == 'dolar'">$</span>
        <span v-else>ADA</span>
      </div>
      <hr style="height: 1px; background-color: #e0e0e0; border: none" />
      <div
        class="container"
        style="padding-right: 30px; padding-top: 20px; padding-left: 30px"
      >
        <v-row
          class="fontUser d-flex justify-center align-center"
          style="font-size: 17px; padding-top: 15px"
        >
          <v-col cols="3"> Método de Pagamento:</v-col>
          <v-col cols="9">
            <v-row class="d-flex align-center">
              <v-col cols="2"
                ><v-img
                  alt="Euro Icon"
                  :class="
                    selected == 'euro'
                      ? 'img-outlined img-clickable shrink mr-2'
                      : 'shrink mr-2 img-clickable'
                  "
                  contain
                  src="../assets/euro.svg"
                  transition="scale-transition"
                  width="100"
                  @click="selected = 'euro'"
                />
              </v-col>
              <v-col cols="2"
                ><v-img
                  alt="Dolar Icon"
                  :class="
                    selected == 'dolar'
                      ? 'img-outlined img-clickable shrink mr-2'
                      : 'shrink mr-2 img-clickable'
                  "
                  contain
                  src="../assets/dolar.png"
                  transition="scale-transition"
                  width="140"
                  @click="selected = 'dolar'"
              /></v-col>
              <v-col cols="2"
                ><v-img
                  alt="Ada Icon"
                  :class="
                    selected == 'ada'
                      ? 'img-outlined img-clickable shrink mr-2'
                      : 'shrink mr-2 img-clickable'
                  "
                  contain
                  src="../assets/ada.png"
                  transition="scale-transition"
                  width="200"
                  @click="selected = 'ada'"
              /></v-col>
            </v-row>
          </v-col>
        </v-row>
        <div
          class="fontUser d-flex justify-left align-center"
          style="padding-top: 30px; font-size: 14px"
        >
          <form @submit.prevent="handleSubmit">
            <div class="form-group form-check">
              <input
                type="checkbox"
                v-model="user.accept"
                id="accept"
                class="form-check-input"
              />
              <label class="form-check-label" for="accept">
                Accept terms and conditions</label
              >
            </div>
          </form>
        </div>
        <div
          class="fontUser d-flex justify-center align-center"
          style="padding-top: 30px; font-size: 14px"
        >
          <v-dialog transition="dialog-top-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="btn-save-settings"
               v-bind="attrs" v-on="on"
                >Proceder para pagamento</v-btn
              >
            </template>
            <template v-slot:default="">
              <v-card >
                <v-toolbar v-if="user.accept==true" color="#063606">
                  <p style="color: white">
                    Pagamento efetuado com Sucesso!
                  </p></v-toolbar
                >
                <v-toolbar v-else color= orange>
                  <p style="color: white">
                   Pagamento não efetuado!
                  </p></v-toolbar
                >
                <v-card-text style="padding-top: 20px; padding-left: 16px">
                  <div v-if="user.accept==true && montante>saldo[selected]" class="fontUser font-size: 30px; ">
                    Não tem dinheiro suficiente na sua Wallet, deposite ou escolha outro método de pagamento.
                  </div>
                  <div v-else-if="user.accept==true && montante<=saldo[selected]" class="fontUser font-size: 30px; ">
                    Novo Saldo: {{ newSaldo(montante) }} 
                    <span v-if="selected == 'euro'">€</span>
                    <span v-else-if="selected == 'dolar'">$</span>
                    <span v-else>ADA</span>
                  </div>
                  <div v-else class="fontUser font-size: 30px; ">
                    Por favor aceite os termos e condições!
                  </div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn v-if="user.accept==true && montante<=saldo[selected]" text @click="() => efetuarPagamento()">Ir para a página inicial</v-btn>
                  <v-btn v-else text @click="() => gotoHome()">Ir para a página inicial</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Axios from 'axios'
const dataAPI = require("@/config/host").dataAPI;

export default {
  name: "Pagamento",
  data: () => ({
    user: {
      accept: false,
    },
    idUser: 0,
    saldo: {
      euro: 0,
      dolar: 0,
      ada: 0
    },
    montante: null,
    selected: 'euro',
    boletim: null,
  }),
  methods: {
    gotoHome(){
        this.$router.push('/')
    },
    handleSubmit() {
      alert(JSON.stringify(this.user));
    },
    efetuarPagamento() {
        if (this.user.accept) {
          var mult = this.selected == 'euro' ? 1 : this.selected == 'dolar' ? 1.13 : 0.92 
          let newMontante = parseFloat(this.$store.getters[this.selected]) - (Math.round(parseFloat(this.montante) * mult * 100) / 100)
          if (this.selected == "euro") {
            Axios.put(dataAPI + "apostador/putEuro/"+this.idUser, {
              Euro: newMontante
            })
              .then(() => {
                this.$store.commit("updateEuro",newMontante)
              })
          }
          else if (this.selected == "dolar") {
            Axios.put(dataAPI + "apostador/putDolar/"+this.idUser, {
              Dolar: newMontante
            })
              .then(() => {
                this.$store.commit("updateDolar",newMontante)
              })
          }
          else {
            Axios.put(dataAPI + "apostador/putADA/"+this.idUser, {
              ADA: newMontante
            })
              .then(() => {
                this.$store.commit("updateADA",newMontante)
              })
          }
        }
        this.$router.push('/')
    },
    newSaldo(montante) {
      var saldoAtual=this.$store.getters[this.selected] , res;
      if (montante != null)
        res =  parseFloat(saldoAtual) - parseFloat(montante);
      return res;
    },
    calcMontante() {
      var mult = this.selected == 'euro' ? 1 : this.selected == 'dolar' ? 1.13 : 0.92 
      return Math.round(this.montante * mult * 100) / 100
    }
  },
  created: function() {
      this.boletim = this.$route.params.boletim
      this.montante = this.$route.params.boletim.quantia || 0
      this.saldo.euro = parseFloat(this.$store.getters.euro)
      this.saldo.dolar = parseFloat(this.$store.getters.dolar)
      this.saldo.ada = parseFloat(this.$store.getters.ada)
      this.idUser = this.$store.getters.idUser
  }
};
</script>

<style>
.img-outlined {
  border: 1px solid #cac8c8;  
  box-shadow: 2px 3px #cac8c8;
}

.img-clickable {
  cursor: pointer !important;
}
</style>
