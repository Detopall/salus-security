"use strict";

insertIncidents();

async function insertIncidents(){
	const incidentsContainer = document.querySelector("#incidents");
	if (!incidentsContainer) return;

	incidentsContainer.innerHTML = "";
	const response = await fetch("/api/incidents");
	const incidents = await response.json();
	let html = "";

	incidents.forEach(incident => {
		html += incidentsHtml(incident);
	});

	incidentsContainer.insertAdjacentHTML("beforeend", html);
}

function incidentsHtml(incident){
	let labels = "";
	incident.labels.forEach(label => {
		labels += `<span class="label"> / ${label} /</span>`
	});

	const timestamp = timeSince(incident.createdAt);
	return `
			<div id="${incident._id}" class="incident">
				<div class="labels-container">
					${labels}
				</div>
				<div class="date-container">
					<i class="fa-solid fa-stopwatch"></i>
					<span class="date">${timestamp}</span>
				</div>
			</div>
			`;
}
