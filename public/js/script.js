"use strict";

const DURATION_IN_SECONDS = {
	epochs: ['year', 'month', 'day', 'hour', 'minute'],
	year: 31536000,
	month: 2592000,
	day: 86400,
	hour: 3600,
	minute: 60
};


function getRootIdElement(element){
	const isRoot = element.classList.contains("incident");
	const root = isRoot ? element : element.closest(".incident");
	return root.getAttribute("id");
}


function timeSince(date) {
	let seconds = Math.floor((new Date() - new Date(date)) / 1000);
	let duration = getDuration(seconds);
	if (duration === undefined){
		return "just now";
	}
	let suffix = (duration.interval > 1 || duration.interval === 0) ? 's' : '';
	return duration.interval + ' ' + duration.epoch + suffix + " ago";
}


function getDuration(seconds) {
	let epoch, interval;
	for (let i = 0; i < DURATION_IN_SECONDS.epochs.length; i++) {
		epoch = DURATION_IN_SECONDS.epochs[i];
		interval = Math.floor(seconds / DURATION_IN_SECONDS[epoch]);
		if (interval >= 1) {
			return {
				interval: interval,
				epoch: epoch
			};
		}
	}
}