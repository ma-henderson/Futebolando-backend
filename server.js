require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Mercado = require('./Models/Mercado.js')

const MercadoRoutes = require('./Routes/Mercado');
const TimeRoutes = require('./Routes/Time');
const testRoutes = require('./Routes/test')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const dbURL = process.env.DB_ACCESS_STRING;
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
  console.log('db is connected')
});
 
app.use('/test', testRoutes)
// Trigger to get data from ext-API and *CREATE* document in MongoDB 
app.use('/mercado', MercadoRoutes);

app.use('/time', TimeRoutes)

app.get("/*", (req, res)=>{
  res.send("page not found - 404")
})

app.listen(3020, () => {
  console.log('you are connected');
})