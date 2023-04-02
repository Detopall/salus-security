const express = require("express");
const router = express.Router();
const incidentController = require("../../controller/incident-controller");
const userController = require("../../controller/user-controller");


router.post("/api/incidents", incidentController.createIncident);
router.get("/api/incidents", incidentController.getIncidents);
router.get("/api/incident/:id", incidentController.getIncident);

router.put("/api/incident/:id/end", incidentController.endIncident);

router.get("/api/users/:id", userController.getUser);


module.exports = router;