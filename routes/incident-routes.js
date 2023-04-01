"use strict";

const express = require("express");
const router = express.Router();

router.get("/incident/:id", async (req, res) => {
	const payload = {
		pageTitle: "Incident",
		user: req.session.user,
		userJS: JSON.stringify(req.session.user),
		showNav: true,
		incidentId: JSON.stringify(req.params.id)
	};
	res.render("incident-page", payload);
});



module.exports = router;