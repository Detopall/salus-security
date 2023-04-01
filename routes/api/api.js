const express = require("express");
const router = express.Router();
const incidentController = require("../../controller/incident-controller");
const userController = require("../../controller/user-controller");


router.post("/api/incidents", incidentController.createIncident);


module.exports = router;