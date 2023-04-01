"use strict";

document.addEventListener("click", (e) => {
	if (!e.target.closest(".incident")) return;

	const element = e.target;
	const incidentId = getRootIdElement(element);
	if (!incidentId) return;

	window.location.href = `/incident/${incidentId}`;
});

function getRootIdElement(element){
	const isRoot = element.classList.contains("incident");
	const root = isRoot ? element : element.closest(".incident");
	return root.getAttribute("id");
}

