"use strict";

displayIncident();

async function displayIncident(){
	const fetched = await fetch(`/api/incident/${INCIDENT_ID}`);
	const incident = await fetched.json();
	const container = document.querySelector(".main-container");
	if (!container) return;

	incidentHtml(incident, container);
}

function incidentHtml(incident, container)


