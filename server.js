require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const got = require('got');
const Mercado = require('./Models/Mercado.js')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const dbURL = process.env.DB_ACCESS_STRING;
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
  console.log('db is connected')
});
 
// Trigger to get data from ext-API and *CREATE* document in MongoDB 
app.get('/mercado/create', (req,res)=>{
  (async () => {
    try {
      // 1. get data from ext-API (already JSON)
      const response = await got('https://api.cartolafc.globo.com/atletas/mercado', {responseType: 'json'});
      var data = response.body

      // 2. Adapt data to respective Model
      // data variable is now an array, hence forEach works best
      const dataMercado = {
        atletas: []
      }

      data.atletas.forEach(atleta=>{
        const dataHistorical = {
          rodada_id: atleta.rodada_id, 
          status_id: atleta.status_id, 
          pontos_num: atleta.pontos_num, 
          preco_num: atleta.preco_num, 
          variacao_num: atleta.variacao_num, 
          media_num: atleta.media_num, 
          jogos_num: atleta.jogos_num, 
          scout: atleta.scout, 
        };

        const dataAtleta = {
          nome: atleta.nome, 
          slug: atleta.slug, 
          apelido: atleta.apelido, 
          atleta_id: atleta.atleta_id, 
          clube_id: atleta.clube_id, 
          posicao_id: atleta.posicao_id, 
          historical: [dataHistorical] // in future *UPDATE*, needs to push, not rewrite
        }
        
        dataMercado.atletas.push(dataAtleta)
      });
      // console.log(dataMercado.atletas[0].historical)

      // 3. Save the data to MongoDB
      const theMercado = new Mercado(dataMercado)
      theMercado.save()
      console.log('received:', theMercado)
      res.send('data collected and saved in DB')


      res.send("success !!")
    } catch (error) {
      // console.log(error.response.body);
      // => 'Internal server error ...'
  }
  })();

})

app.get("/*", (req, res)=>{
  res.send("page not found - 404")
})

app.listen(3020, () => {
  console.log('you are connected');
})