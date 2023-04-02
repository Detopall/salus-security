"use strict";

const express = require("express");
const router = express.Router();

router.get('/profile', async (req, res) => {
	const payload = {
		pageTitle: "Profile",
		user: req.session.user,
		userJS: JSON.stringify(req.session.user),
		showNav: true
	}
	res.render("profile-page", payload);
});

module.exports = router;