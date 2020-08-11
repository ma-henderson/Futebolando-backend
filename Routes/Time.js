const express = require('express');
const router = express.Router();
const Time = require('../Models/Time.js');
const got = require('got');


// THIS NEEDS JWT / ADMIN LOGIN before launch
// Trigger to get data from ext-API and *CREATE* document in MongoDB
router.post('/create/profile', (req, res)=>{
  (async () => {
    try {
      // 1. Get the data from API
      const response = await got(`https://api.cartolafc.globo.com/time/id/${req.body.time_id}`, {responseType: 'json'});
      // console.log(response.body)

      // 2. Adapt data to respective Model
      const dataTime = {
        atletas: [],
        historical: [],
      }

      const userTeamData ={ 
        time_id: response.body.time.time_id,
        clube_id: response.body.time.clube_id,
        esquema_id: response.body.time.esquema_id,
        cor_borda_escudo: response.body.time.cor_borda_escudo,
        globo_id: response.body.time.globo_id,
        nome: response.body.time.nome,
        nome_cartola: response.body.time.nome_cartola,
        slug: response.body.time.slug,
        url_camisa_png: response.body.time.url_camisa_png,
        url_camisa_svg: response.body.time.url_camisa_svg,
        url_escudo_png: response.body.time.url_escudo_png,
        url_escudo_svg: response.body.time.url_escudo_svg,
        facebook_id: response.body.time.facebook_id,
        rodada_time_id: response.body.time.rodada_time_id,
        temporada_inicial: response.body.time.temporada_inicial,
      };
      dataTime.profile = userTeamData;

      response.body.atletas.forEach(atleta=>{
        const dataAtleta = {
          nome: atleta.nome, 
          slug: atleta.slug, 
          apelido: atleta.apelido, 
          atleta_id: atleta.atleta_id, 
          clube_id: atleta.clube_id, 
          posicao_id: atleta.posicao_id, 
          rodada_id: atleta.rodada_id, 
          status_id: atleta.status_id, 
          pontos_num: atleta.pontos_num, 
          preco_num: atleta.preco_num, 
          variacao_num: atleta.variacao_num, 
          media_num: atleta.media_num, 
          jogos_num: atleta.jogos_num, 
          scout: atleta.scout, 
        }
        dataTime.atletas.push(dataAtleta)
      });

      const historicalData ={
        esquema_id: response.body.esquema_id, 
        rodada_atual: response.body.rodada_atual, 
        patrimonio: response.body.patrimonio, 
        valor_time: response.body.valor_time, 
        capitao_id: response.body.capitao_id, 
        pontos: response.body.pontos, 
        pontos_campeonato: response.body.pontos_campeonato, 
      };
      dataTime.historical.push(historicalData)

      // const strDataTime = JSON.stringify(dataTime)  
      // res.send(strDataTime)

      // 3. Save the data to MongoDB
      const theTime = new Time(dataTime)
      theTime.save()
      console.log('received:', theTime)
      res.send('data collected and saved in DB')



      res.send("time found!")
    } catch (error) {
      // console.log(error.response.body);
      // => 'Internal server error ...'
    }
  })();



})

router.post('/check/', (req, res)=>{
  Time.findOne({'profile.time_id': req.body.time_id})
  .then((result) => {
    res.send(result)
  })
})
module.exports = router;