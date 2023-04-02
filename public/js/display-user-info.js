"use strict";

displayUserInfo();

async function displayUserInfo(){
	const userInfoContainer = document.querySelector(".user-info");
	if (!userInfoContainer) return;
	userInfoContainer.innerHTML = "";

	const fetched = await fetch(`/api/users/${USER_LOGGED_IN._id}`);
	const user = await fetched.json();

	userInfoContainer.insertAdjacentHTML("beforeend", userInfoHtml(user));
}

function userInfoHtml(user){
	return `
			<h3> ${user.username} </h3>
			<span>Incidents reported: ${user.incidentsReported.length} </span>
			<span>Incidents helped: ${user.incidentsHelped.length} </span>
			<span>Incidents caused: ${user.incidentsCaused.length} </span>
			`;
}
