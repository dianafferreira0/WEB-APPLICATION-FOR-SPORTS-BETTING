const Apostador = require("../models/apostador.js");
const Apostadores = module.exports;
var sql = require('../models/db.js');
const { response } = require("express");

Apostadores.listar = () => {
  return Apostador.getAll();
};

Apostadores.get = (email) => {
  return Apostador.getUser(email);
};

Apostadores.update = (idApostador, apostador) => {

  return Apostador.updateUser(idApostador, apostador);
};

Apostadores.put = (apostador) => {
  if (!Apostador.getUser(apostador)) {
    return Apostador.regist(apostador);
  }
};

Apostadores.createtrans = (idApostador, valor, saldo, data) => {
  return Apostador.createTransacoes(idApostador, valor, saldo, data);
};

Apostadores.gettrans = (idApostador) => {
  return Apostador.getTransacoes(idApostador);
};

Apostadores.login = (user) => {
  return Apostador.loginUser(user.email,user.password);
}
Apostadores.getMoneys = (idApostador) => {
  return Apostador.getMoney(idApostador);
}

Apostadores.putEuros = (idApostador,moneys) => {
  return Apostador.putEuro(idApostador,moneys);
}

Apostadores.putADAS = (idApostador,moneys) => {
  return Apostador.putADA(idApostador,moneys);
}

Apostadores.putDolars = (idApostador,moneys) => {
  return Apostador.putDolar(idApostador,moneys);
}