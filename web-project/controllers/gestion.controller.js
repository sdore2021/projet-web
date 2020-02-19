const Gestion = require("../models/gestion.model");

exports.test = function(req, res) {
  res.send("Hello from de Test controller !");
};

exports.client_create = function(req, res, next) {
  let client = new Gestion.Client({
    nom_client: req.body.nom_client,
    taux_remise: req.body.taux_remise,
    commande: new Gestion.Commande({
      $push: { article: Gestion.Article.findById(req.body._id) }
    }) // ajouter id de la commande {_id : req.body.id}
  });

  client.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("client created and command succcessfull");
  });
};

exports.client_add_commande = function(req, res, next) {
  Gestion.Client.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        commande: new Gestion.Commande({
          $push: { article: Gestion.Article.findById(req.body._id) }
        })
      } // ajouter id de la commande {_id : req.body.id}
    },
    function(err, post) {
      if (err) res.send(err);
      res.json(post);
    }
  );
};

exports.article_create = function(req, res, next) {
  let article = new Gestion.Article({
    prix_HT: req.body.prix_HT,
    qts: req.body.qts,
    taux_tva: new Gestion.TauxTVA({
      _id: Gestion.TauxTVA.find({ taux: req.body.taux })._id,
      taux: req.body.taux
    })
  });

  article.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("article was created and save in database");
  });
};

exports.taux_create = function(req, res, next) {
  let taux = new Gestion.TauxTVA({
    taux: req.body.taux
  });

  taux.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("article was created and save in database");
  });
};
