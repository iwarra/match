export default function () {
	return new Resume();
};

function Resume() {
	// generic resume format
	this.parts = {};
}

Resume.prototype.addKey = function (key, value) {
	value = value || "";
	value = value.trim();
	// reject falsy values
	if (value) {
		if (this.parts.hasOwnProperty(key)) {
			value = this.parts[key] + value;
		}

		this.parts[key] = value;
	}
};

Resume.prototype.addObject = function (key, options) {
	let self = this;

	if (!this.parts.hasOwnProperty(key)) {
		this.parts[key] = {};
	}

	options.forEach((optionVal, optionName) => {
		if (optionVal) {
			self.parts[key][optionName] = optionVal;
		}
	});
};

/**
 * @returns {String}
 */
Resume.prototype.jsoned = function () {
	return JSON.stringify(this.parts);
};
