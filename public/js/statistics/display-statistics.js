"use strict";

displayLabelsChart();
displayBystanderChart();

async function displayLabelsChart(){
	const labels = await getIncidentLabels();
	const ctx = document.querySelector("#labels-frequency-chart").getContext("2d");
	
	new Chart(ctx, {
		type: "bar",
		data: {
			labels: Object.keys(labels),
			datasets: [{
				label: "Label frequency",
				data: Object.values(labels),
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
	}
});
}

async function getIncidentLabels(){
	const fetched = await fetch("/api/incidents?ended=all");
	const incidents = await fetched.json();

	const labels = {};
	incidents.forEach(incident => {
		incident.labels.forEach(label => {
		if (labels[label]) {
			labels[label]++;
		} else {
			labels[label] = 1;
		}
		});
	});
	return labels;
}


/* BEST BYSTANDER CHART */ 


async function displayBystanderChart(){
	const bestBystanders = await getBystanderData();
	const ctx = document.querySelector("#bystander-chart").getContext("2d");
	
	new Chart(ctx, {
		type: "pie",
		data: {
			labels: Object.keys(bestBystanders),
			datasets: [{
				label: "bystander frequency",
				data: Object.values(bestBystanders),
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
	}
});
}


async function getBystanderData(){
	const fetched = await fetch("/api/incidents?ended=all");
	const incidents = await fetched.json();

	const bestBystanders = {};
	incidents.forEach(incident => {
		incident.bystanders.forEach(bystander => {
			if (bestBystanders[bystander.username]){
				bestBystanders[bystander.username]++;
			} else {
				bestBystanders[bystander.username] = 1;
			}
		});
	});
	return bestBystanders;
}

