require('dotenv').config
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const dbURL = process.env.DB_ACCESS_STRING;
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
  console.log('db is connected')
});
 
app.get('/mercado', (req,res)=>{
  res.send("endpoint is working")
})

app.get("/*", (req, res)=>{
  res.send("page not found - 404")
})

app.listen(3010, () => {
  console.log('you are connected');
})