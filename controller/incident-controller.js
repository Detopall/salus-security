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
	await addIncidentToUsers(incident._id, userId, randomAggressors, req);

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

async function addIncidentToUsers(incidentId, userId, randomAggressors, req){
	const promises = randomAggressors.map((aggressor) => {
		return User.findByIdAndUpdate(
			aggressor._id,
			{ $push: { incidentsCaused: incidentId } },
			{ new: true }
		);
		});
		await Promise.all(promises);

	// Update reporter's reportedIncidents field
	req.session.user = await User.findByIdAndUpdate(
		userId,
		{ $push: { incidentsReported: incidentId } },
		{ new: true }
	);
}


exports.getIncidents = async (req, res) => {
	try {
		let ended = req.query.ended;
		let option = {};
		if (!ended){
			option = {ended: "false"}
		}
		if (ended === "all"){
			option = {};
		}
		const incidents = await Incident.find(option)
			.populate("reportedBy")
			.populate("aggressors")
			.populate("bystanders")
			.sort({ createdAt: -1 });
		return res.send(incidents);
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
};


exports.getIncident = async (req, res) => {
	try {
		const incidentId = req.params.id;
		const incident = await Incident.findById(incidentId).populate("reportedBy").populate("aggressors").populate("bystanders").lean();
		return res.send(incident);
	} catch(err) {
		console.error(err);
		return res.sendStatus(500);
	}
}

exports.endIncident = async (req, res) => {
	try {
		const incidentId = req.params.id;
		const incident = await Incident.findOneAndUpdate({_id: incidentId}, {ended: true});
		return res.send(incident);
	} catch(err){
		console.error(err);
		return res.sendStatus(500);
	}
}

exports.helpIncident = async (req, res) => {
	try {
		const incidentId = req.params.id;
		const userId = req.session.user._id;

		const incident = await Incident.findByIdAndUpdate(
			incidentId,
			{ $push: { bystanders: userId } },
			{ new: true }
		);

		req.session.user = await User.findByIdAndUpdate(
			userId,
			{$push: {incidentsHelped: incidentId}},
			{new: true}	
		);

		res.send(incident);
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
}