"use strict";

const express = require("express");
const router = express.Router();

router.get('/statistics', async (req, res) => {
	const payload = {
		pageTitle: "Statistics",
		user: req.session.user,
		userJS: JSON.stringify(req.session.user),
		showNav: true
	}
	res.render("statistics-page", payload);
});

module.exports = router;