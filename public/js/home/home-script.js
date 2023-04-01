"use strict";

document.addEventListener("click", (e) => {
	if (!e.target.closest(".incident")) return;

	const element = e.target;
	const incidentId = getRootIdElement(element);
	if (!incidentId) return;

	window.location.href = `/incident/${incidentId}`;
});


