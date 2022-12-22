const express = require("express");
const personController = require("../controllers/personController");
const router = express.Router();

router.param("id", personController.checkId);
router
  .route("/")
  .get(personController.getAllPersons)
  .post(personController.checkBody, personController.createPerson);
router
  .route("/:id")
  .get(personController.getPerson)
  .delete(personController.deletePerson)
  .put(personController.updatePerson);

module.exports = router;
