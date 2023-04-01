"use strict";

const LABELS = ["violence", "murder", "assault", "kidnapping", "arson", "jaywalking", "child-endangerment"];

document.addEventListener("click", async (e) => {
	if (!e.target.matches("#submit-report")) return;

	try {
		const data = {"labels": getRandomLabels(LABELS)};
		const response = await fetch("/api/incidents", getOptionsPost(data, "POST"));
		const incident = await response.json();
		location.href = `/incident/${incident._id}`;
	} catch (err) {
		console.error("Something went wrong: ", err);
	}
});


function getRandomLabels(LABELS) {
	const index = 1;  //to make sure that at least one label is returned
	const sortNumber = 0.5;

	const shuffledLabels = LABELS.sort(() => Math.random() - sortNumber);
	const randomAmount = Math.floor(Math.random() * LABELS.length) + index;
	const uniqueLabels = Array.from(new Set(shuffledLabels));
	const randomLabels = uniqueLabels.slice(0, randomAmount);

	return randomLabels;
}


function getOptionsPost(data, method){
	return {
		method: method,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	}
}