const Partida = require("../models/partida.js");
const Partidas = module.exports

Partidas.update=(idPartida,partida) => {
    return Partida.updateOdd(idPartida,partida);
  };
