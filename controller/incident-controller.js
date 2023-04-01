"use strict";

const User = require("../models/SalusUser");
const Incident = require("../models/SalusIncident");


exports.createIncident = async (req, res) => {
	if (!req.body.labels) {
		return res.sendStatus(400);
	}

	const userId = req.session.user._id;
	const randomAggressors = await addRandomAggressors(userId);

	const incidentData = {
		labels: req.body.labels,
		reportedBy: userId,
		aggressors: randomAggressors
	}

	const incident = new Incident(incidentData);
	try {
		await incident.save();
		const newIncident = await Incident.findById(incident._id).populate("reportedBy").populate("aggressors");
		return res.send(newIncident);
	} catch (err){
		console.error(err);
		return res.sendStatus(500);
	}
}


async function addRandomAggressors(reporterUserId) {
	const oneAggressor = 1;
	const amountOfUsers = await User.countDocuments();
	const randomShuffle = 0.5;

	const randomAmount = Math.floor(Math.random() * amountOfUsers) + oneAggressor;

	const allUserIdsExceptReporter = await User.find({_id: {$ne: reporterUserId}}).distinct('_id');

  	// Shuffle the user ids and select the first randomAmount
	const shuffledUserIds = allUserIdsExceptReporter.sort(() => Math.random() - randomShuffle);
	const randomUserIds = shuffledUserIds.slice(0, randomAmount);

	return randomUserIds;
}


exports.getIncidents = async (req, res) => {
	try {
		const incidents = await Incident.find().populate("reportedBy").populate("aggressors").sort({createdAt: -1});
		return res.send(incidents); 
	} catch(err){
		console.error(err);
		return res.sendStatus(500);
	}
}
