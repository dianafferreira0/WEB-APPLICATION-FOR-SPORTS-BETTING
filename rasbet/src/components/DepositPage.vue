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
        Depósito
      </div>
      <v-row class="fontUser" style="font-size: 18px; padding-bottom: 8px">
        <v-col class="d-flex justify-end mt-4" >
          <span>Saldo: {{ saldo[select.state] }} </span>
        </v-col>
        <v-col>
          <v-select 
            class="select"
            v-model="select"
            :items="tiposSaldo"
            item-text="abbr"
            item-value="state"
            return-object
            solo
          ></v-select>
        </v-col>
      </v-row>
      <hr style="height: 1px; background-color: #e0e0e0; border: none" />
      <div
        class="container"
        style="padding-right: 30px; padding-top: 20px; padding-left: 30px"
      >
        <v-row
          class="fontUser d-flex justify-center align-center"
          style="font-size: 17px"
        >
          <v-col cols="2"> Montante:</v-col>
          <v-col cols="2">
            <v-text-field
              v-model="montante"
              style="color=black !important; height: 50px; "
              :prepend-icon="select.state == 'euro' ? 'mdi-currency-eur' : select.state == 'dolar' ? 'mdi-currency-usd' : 'mdi-bitcoin'"
              type="number"
              min="0"
            ></v-text-field>
          </v-col>
          <v-col cols="8"> </v-col>
        </v-row>
        <v-row
          class="fontUser d-flex justify-center align-center"
          style="font-size: 17px; padding-top: 15px"
        >
          <v-col cols="3"> Método de Pagamento:</v-col>
          <v-col cols="9">
            <v-row class="d-flex align-center">
              <v-col cols="2"
                ><v-img
                  alt="Visa Icon"
                  :class="
                    selectedImg == 'visa'
                      ? 'img-outlined img-clickable shrink mr-2'
                      : 'shrink mr-2 img-clickable'
                  "
                  contain
                  src="../assets/visa_icon.png"
                  transition="scale-transition"
                  width="100"
                  @click="selectedImg = 'visa'"
                />
              </v-col>
              <v-col cols="2"
                ><v-img
                  alt="Visa Icon"
                  :class="
                    selectedImg == 'mbway'
                      ? 'img-outlined img-clickable shrink mr-2'
                      : 'shrink mr-2 img-clickable'
                  "
                  contain
                  src="../assets/mbway_ico.png"
                  transition="scale-transition"
                  width="140"
                  @click="selectedImg = 'mbway'"
              /></v-col>
              <v-col cols="2"
                ><v-img
                  alt="Visa Icon"
                  :class="
                    selectedImg == 'bank'
                      ? 'img-outlined img-clickable shrink mr-2'
                      : 'shrink mr-2 img-clickable'
                  "
                  contain
                  src="../assets/banktransfer.png"
                  transition="scale-transition"
                  width="200"
                  @click="selectedImg = 'bank'"
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
              <v-btn class="btn-save-settings" v-bind="attrs" v-on="on"
                >Proceder para pagamento</v-btn
              >
            </template>
            <template v-slot:default="">
              <v-card >
                <v-toolbar v-if="montante!=null && montante>0 && user.accept==true" color="#063606">
                  <p style="color: white">
                    Depósito efetuado com Sucesso!
                  </p></v-toolbar
                >
                <v-toolbar v-else-if="montante!=null && user.accept==false" color= orange>
                  <p style="color: white">
                   Depósito não efetuado!
                  </p></v-toolbar
                >
                <v-toolbar v-else color= orange>
                  <p style="color: white">
                    Depósito Não Efetuado!
                  </p></v-toolbar
                >
                <v-card-text style="padding-top: 20px; padding-left: 16px">
                  <div v-if="montante!=null && montante>0 && user.accept==true" class="fontUser font-size: 30px; ">
                    Novo Saldo: {{ newSaldo(montante) }} 
                    <span v-if="select.state == 'euro'">€</span>
                    <span v-else-if="select.state == 'dolar'">$</span>
                    <span v-else>ADA</span>
                  </div>
                  <div v-else-if="montante!=null && user.accept==false" class="fontUser font-size: 30px; ">
                    Por favor aceite os termos e condições!
                  </div>
                  <div v-else class="fontUser font-size: 30px;">
                    Por favor insira o montante a depositar.
                  </div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="() => depositaSaldo()">Ir para a página inicial</v-btn>
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
  name: "Deposit",
  data: () => ({
    idUser: 0,
    saldo: {
      euro: 0,
      dolar: 0,
      ada: 0
    },
    user: {
      accept: false,
    },
    montante: null,
    options: {
      locale: "pt-PT",
      prefix: "€",
      suffix: "",
      length: 11,
      precision: 2,
    },
    selectedImg: null,
    select: { state: 'euro', abbr: '€' },
    tiposSaldo: [
      { state: 'euro', abbr: '€' },
      { state: 'dolar', abbr: '$' },
      { state: 'ada', abbr: 'ADA' }
    ],
  }),
  methods: {
    goBack(){
      this.$router.push('/settings')
    },
    gotoHome(){
        this.$router.push('/')
    },
    handleSubmit() {
      alert(JSON.stringify(this.user));
    },
    depositaSaldo() {
        if (this.user.accept) {
          let newMontante = parseFloat(this.$store.getters[this.select.state]) + parseFloat(this.montante)
          if (this.select.state == "euro") {
            Axios.put(dataAPI + "apostador/putEuro/"+this.idUser, {
              Euro: newMontante
            })
              .then(() => {
                this.$store.commit("updateEuro",newMontante)
              })
          }
          else if (this.select.state == "dolar") {
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
      var saldoAtual=this.$store.getters[this.select.state] , res;
      if (montante != null)
        res =  parseFloat(saldoAtual) + parseFloat(montante);
      return res;
    },
  },
  created: function() {
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

.select {
  width: 100px!important;
}
</style>
