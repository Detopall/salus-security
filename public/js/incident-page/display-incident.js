"use strict";

displayIncident();

async function displayIncident(){
	const fetched = await fetch(`/api/incident/${INCIDENT_ID}`);
	const incident = await fetched.json();
	const container = document.querySelector(".main-container");
	if (!container) return;

	const incidentContainer = document.querySelector(".main-container.incident-container");
	if (!incidentContainer) return;

	incidentContainer.insertAdjacentHTML("beforeend", incidentHtml(incident));
}

function incidentHtml(incident) {
	const endButton = incident.reportedBy._id === USER_LOGGED_IN._id ? displayActionButton(incident, "end") : "";

	const bystanderButton = (incident.reportedBy._id !== USER_LOGGED_IN._id && !incident.aggressors.map(user => user._id).includes(USER_LOGGED_IN._id) && !incident.bystanders.map(user => user._id).includes(USER_LOGGED_IN._id)) ? displayActionButton(incident, "help") : "";

	//end => can only end when user is the reporter
	//help => can only help when: not the reporter, not an aggressor and not already helped

	return `
			<div class="incident-labels">${incidentLabelsHtml(incident)}</div>
			<div class="incident-information">${incidentInformationHtml(incident)}</div>
			<div class="incident-bystanders">${incidentBystandersHtml(incident)}</div>
			<div class="incident-aggressors">${incidentAggressorsHtml(incident)}</div>
			${endButton}
			${bystanderButton}
			`;
}

function displayActionButton(incident, action){
	return `
			<button id="${action}" data-id="${incident._id}">${action} incident </button>
			`;
}

function incidentLabelsHtml(incident){
	let labels = "<h3> Labels </h3>";
	incident.labels.forEach(label => {
		labels += `<span class="label"> ${label} </span>`;
	});
	return labels;
}

function incidentInformationHtml(incident){
	let information = "<h3> Additional Information </h3>";
	const timestamp = timeSince(incident.createdAt);
	information += `<span class="date">${timestamp}</span>`;
	return information;
}

function incidentBystandersHtml(incident){
	let bystanders = "<h3> Bystanders </h3>";
	incident.bystanders.forEach(bystander => {
		bystanders += `<span class="bystander"> ${bystander.username} </span>`;
	});
	return bystanders;
}

function incidentAggressorsHtml(incident){
	let aggressors = "<h3> Aggressors </h3>";
	incident.aggressors.forEach(aggressor => {
		aggressors += `<span class="aggressor"> ${aggressor.username} </span>`;
	});
	return aggressors;
}

