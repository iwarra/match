const isObject = (obj) => obj != null && obj.constructor.name === "Object";

function dateFromDaysAgo(number = 1) {
	const date = new Date();
	date.setDate(date.getDate() - number);
	return new Array(date.toISOString().slice(0, 19));
}

export { isObject, dateFromDaysAgo };
