import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

// const lhost = "http://localhost:3030";
export default new Vuex.Store({
  state: {
    idUser:0,
    userName: "",
    userSurname: "",
    accessToken : "",
    saldo: 0,
    expirationDate:"",
    nofitication: [],
    euro:0,
    ada:0,
    dolar:0
  },
  plugins: [createPersistedState()],
  getters: {  //this.$store.getters.userName
    idUser: state => {
      return state.idUser
    },
    userName: state => {
      return state.userName
    },
    userSurname: state => {
      return state.userSurname
    },
    accessToken: state => {
      return state.accessToken
    },
    saldo: state => {
      return state.saldo
    },
    expirationDate: state =>{
      return state.expirationDate
    },
    nofitication: state =>{
      return state.nofitication
    },
    euro: state => {
      return state.euro
    },
    ada: state => {
      return state.ada
    },
    dolar: state => {
      return state.dolar
    },

  },
  mutations: { //this.$store.commit("updateUserName", val)
    updateidUser:(state,payload)=>{
      Vue.set(state, "idUser", payload);
    },
    updateUserName: (state, payload) => {
      Vue.set(state, "userName", payload);
    },
    updateUserSurname: (state, payload) => {
      Vue.set(state, "userSurname", payload);
    },
    updateAccessToken: (state, payload) => {
      Vue.set(state, "accessToken", payload);
    },
    updateSaldo: (state, payload) => {
      Vue.set(state, "saldo", payload);
    },
    updateexpirationDate: (state, payload) => {
      Vue.set(state, "expirationDate", payload);
    },
    addNotification:(state,payload)=>{
      Vue.set(state, "nofitication", payload);
    },
    updateEuro:(state,payload)=>{
      Vue.set(state, "euro", payload);
    },
    updateADA:(state,payload)=>{
      Vue.set(state, "ada", payload);
    },
    updateDolar:(state,payload)=>{
      Vue.set(state, "dolar", payload);
    },
  },
  actions: {
  },
  modules: {
  }
})
