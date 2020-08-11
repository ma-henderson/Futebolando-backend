const mongoose = require('mongoose');
const Schema = mongoose.Schema

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
  },
});


const UserTeamSchema = new Schema ({ 
  time_id: {
    type: Number },
  clube_id: {
    type: Number },
  esquema_id: {
    type: Number },
  cor_borda_escudo: {
    type: String },
  globo_id: {
    type: String },
  nome: {
    type: String },
  nome_cartola: {
    type: String },
  slug: {
    type: String },
  url_camisa_png: {
    type: String },
  url_camisa_svg: {
    type: String },
  url_escudo_png: {
    type: String },
  url_escudo_svg: {
    type: String },
  facebook_id: {
    type: Number },
  rodada_time_id: {
    type: Number },
  temporada_inicial: {
    type: Number },
});

const HistoricalSchema = new Schema ({
  esquema_id: {
    type: Number
  },
  rodada_atual: {
    type: Number
  },
  patrimonio: {
    type: Number
  },
  valor_time: {
    type: Number
  },
  capitao_id: {
    type: Number
  },
  pontos: {
    type: Number
  },
  pontos_campeonato: {
    type: Number
  },
});

// Final Schema
const TimeSchema = new Schema ({
  profile: UserTeamSchema,
  atletas: [AtletaSchema],
  historical: [HistoricalSchema]
})

const TimeModel = mongoose.model('time', TimeSchema);
module.exports = TimeModel;