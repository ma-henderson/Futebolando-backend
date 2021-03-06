const mongoose = require('mongoose');
const Schema = mongoose.Schema

const HistoricalSchema = new Schema ({
  rodada_id: {
    type: Number
  },
  status_id: {
    type: Number
  },
  pontos_num: {
    type: Number
  },
  preco_num: {
    type: Number
  },
  variacao_num: {
    type: Number
  },
  media_num: {
    type: Number
  },
  jogos_num: {
    type: Number
  },
  scout: {
    type: Object
  }, // Will pose challenges if this is summed
})

const AtletaSchema = new Schema ({
  nome: {
    type: String
  },
  slug: {
    type: String
  },
  apelido: {
    type: String
  },
  atleta_id: {
    type: Number
  },
  clube_id: {
    type: Number
  },
  posicao_id: {
    type: Number
  },
  historical:  [HistoricalSchema]
})


const MercadoSchema = new Schema ({
  atletas: [AtletaSchema]
})

const MercadoModel = mongoose.model('mercado', MercadoSchema);
module.exports = MercadoModel;