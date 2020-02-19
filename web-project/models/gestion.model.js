const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CommandeSchema = new Schema({
  date_commande: { type: Date, default: Date.now },
  articles: [ArticleSchema]
});

let ClientSchema = new Schema({
  nom_client: { type: String, required: true, max: 100 },
  taux_remise: { type: Number, required: true },
  commande: [{ type: CommandeSchema }] //min : 1
});

let ArticleSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  prix_HT: { type: Number, required: true },
  taux_tva: TauxTVASchema,
  qts: Number //quandtite de stock
});

let TauxTVASchema = new Schema({
  taux: Number
});

let DepotSchema = new Schema({
  nomDepot: String,
  articles: [ArticleSchema]
});

let LivraisonSchema = new Schema({
  //articles: [ArticleSchema],  est dans les clients
  clients: [ClientSchema]
});

// il me reste la table favture et representant

module.exports.Commande = mongoose.model("Commande", CommandeSchema);
module.exports.Client = mongoose.model("Client", ClientSchema);
module.exports.Article = mongoose.model("Article", ArticleSchema);
module.exports.TauxTVA = mongoose.model("TauxTVA", TauxTVASchema);
module.exports.Depot = mongoose.model("Depot", DepotSchema);
