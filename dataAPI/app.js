var express = require('express');
const cors = require("cors");
var path = require('path');
const cron = require('node-cron');

var apostadorRouter = require('./routes/apostador');
var boletimRouter = require('./routes/boletim');
var jogoRouter = require('./routes/jogo');
var partidaRouter = require('./routes/partida');

var app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/apostador/',apostadorRouter);
app.use('/boletim/',boletimRouter);
app.use('/jogo/',jogoRouter);
app.use('/partida/',partidaRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



module.exports=app;
