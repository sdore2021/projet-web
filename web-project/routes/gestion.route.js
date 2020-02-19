const express = require("express");
const router = express.Router();

const gestion_controller = require("../controllers/gestion.controller");

router.get("/test", gestion_controller.test);
router.post("/createClient", gestion_controller.client_create);
router.put("/createClient/:id", gestion_controller.client_add_commande);
router.post("/createArticle", gestion_controller.article_create);
router.post("/createTaux", gestion_controller.taux_create);

/*
router.get("/all", produit_controller.test_affiche);
router.get("/:id", produit_controller.produit_details);
router.put("/:id", produit_controller.produit_update);
router.delete("/:id", produit_controller.produit_delete);
*/

module.exports = router;
