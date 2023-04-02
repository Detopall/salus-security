"use strict";

displayIncidentsProfile();

async function displayIncidentsProfile(){
	const profileContainer = document.querySelector(".main-container.profile-container");
	if (!profileContainer) return;

	const fetched = await fetch("/api/incidents?ended=all");
	const incidents = await fetched.json();

	let html = profileReportedHtml(incidents) + profileHelpedHtml(incidents);
	profileContainer.insertAdjacentHTML("beforeend", html);
}

function profileReportedHtml(incidents){
	const reportedIncidents = incidents.filter(incident => incident.reportedBy._id === USER_LOGGED_IN._id);
	let html = "";
	reportedIncidents.map(incident => {
		html += createProfileIncidentHtml(incident);
	});
	
	return html;
}

function profileHelpedHtml(incidents){
    let html = "";
    incidents.map(incident => {
        const isBystander = incident.bystanders.some(bystander => bystander._id === USER_LOGGED_IN._id);
		console.log(isBystander);
        if (isBystander) {
            html += createProfileIncidentHtml(incident);
        }
    });
    return html;
}


function createProfileIncidentHtml(incident){
	const timestamp = timeSince(incident.createdAt);

	let labels = "";
	incident.labels.forEach(label => {
		labels += `<span class="label"> ${label} </span>`;
	});

	let bystanders = "";
	incident.bystanders.forEach(user => {
		bystanders += `<span class="bystander"> ${user.username} </span>`;
	});

	let aggressors = "";
	incident.aggressors.forEach(user => {
		aggressors += `<span class="aggressor"> ${user.username} </span>`;
	});

	return `
			<div id="${incident._id}" class="profile-incident">
				<div class="labels-container">
					${labels}
				</div>
				<div class="date-container">
					<i class="fa-solid fa-stopwatch"></i>
					<span class="date">${timestamp}</span>
				</div>
				<div class="profile-reported-aggressors">
					<h3> Aggressors </h3>
					${aggressors}
				</div>
				<div class="profile-reported-bystanders">
					<h3> Bystanders </h3>
					${bystanders}
				</div>
			</div>
			`;
}

