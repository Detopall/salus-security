"use strict";

document.addEventListener("click", async (e) => {
	if (!e.target.matches("#end")) return;
	const endButton = document.querySelector("#end");
	if (!endButton.getAttribute("data-id")) return;

	const incidentId = endButton.getAttribute("data-id");
	await endIncident(incidentId);
	location.href = "/"; //return to homepage
});


async function endIncident(incidentId){
	await fetch(`/api/incident/${incidentId}/end`, getOptionsPost({}, "PUT"));
}

document.addEventListener("click", async (e) => {
	if (!e.target.matches("#help")) return;
	const helpButton = document.querySelector("#help");
	if (!helpButton.getAttribute("data-id")) return;

	const incidentId = helpButton.getAttribute("data-id");
	await helpIncident(incidentId);
	location.reload(); //don't change page
});


async function helpIncident(incidentId){
	await fetch(`/api/incident/${incidentId}/help`, getOptionsPost({}, "PUT"));
}
