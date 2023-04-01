"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config({path: './config/config.env'});

const SalusIncidentSchema = new mongoose.Schema({
	labels: [{type: String }],
	aggressors: [{type: Schema.Types.ObjectId, ref: "SalusUser"}],
	reportedBy: {type: Schema.Types.ObjectId, ref: "SalusUser"},
	bystanders: [{type: Schema.Types.ObjectId, ref: "SalusUser"}],
	ended: {type: Boolean, required: true, default: false}
}, {timestamps: true});


module.exports = mongoose.model('SalusIncident', SalusIncidentSchema);