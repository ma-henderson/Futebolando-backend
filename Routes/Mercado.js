const express = require('express');
const router = express.Router()
const Mercado = require('../Models/Mercado.js');
const got = require('got');


// THIS NEEDS JWT / ADMIN LOGIN before launch
// Trigger to get data from ext-API and *CREATE* document in MongoDB
router.get('/createNew/', (req, res)=>{
  (async () => {
    try {
      // 1. get data from ext-API (already JSON)
      const response = await got(
        'https://api.cartolafc.globo.com/atletas/mercado',
        {responseType: 'json'}
      );
      var data = response.body

      // 2. Adapt data to respective Model
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

    } catch (error) {
      // console.log(error.response.body);
      // => 'Internal server error ...'
  }
  })();

})
module.exports = router;
// --*-- --*-- --*-- --*-- --*-- --*-- --*-- --*-- --*-- --*-- --*-- 
// UPDATE MARKETS: NOT DONE

// router.get('/update/', (req, res)=>{
//   (async () => {
//     try {
//       // 1. get data from ext-API (already JSON)
//       const response = await got('https://api.cartolafc.globo.com/atletas/mercado', {responseType: 'json'});
//       var data = response.body

//       // 2. Adapt data to respective Model
//       const dataMercado = {
//         atletas: []
//       }

//       data.atletas.forEach(atleta=>{
//         const dataHistorical = {
//           rodada_id: atleta.rodada_id, 
//           status_id: atleta.status_id, 
//           pontos_num: atleta.pontos_num, 
//           preco_num: atleta.preco_num, 
//           variacao_num: atleta.variacao_num, 
//           media_num: atleta.media_num, 
//           jogos_num: atleta.jogos_num, 
//           scout: atleta.scout, 
//         };

//       });
//       // console.log(dataMercado.atletas[0].historical)

//       // 3. Save the data to MongoDB
//       const theMercado = new Mercado(dataMercado)
//       theMercado.save()
//       console.log('received:', theMercado)
//       res.send('data collected and saved in DB')

//     } catch (error) {
//       // console.log(error.response.body);
//       // => 'Internal server error ...'
//   }
//   })();

// })