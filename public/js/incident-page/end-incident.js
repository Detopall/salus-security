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
