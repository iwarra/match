import _ from "underscore";
import dictionary from "../../getDictionary.js";
import resume from "../Resume.js";
import tracer from "tracer";

const logger = tracer.colorConsole();
//const	fs = require("fs")

function makeRegExpFromDictionary() {
	let regularRules = {
		titles: {},
		profiles: [],
		inline: {},
	};

	for (const property in dictionary.titles) {
		regularRules.titles[property] = [];

		dictionary.titles[property].forEach((el) => {
			regularRules.titles[property].push(el.toUpperCase());
			regularRules.titles[property].push(
				el[0].toUpperCase() + el.substr(1, el.length),
			);
		});
	}

	// _.forEach(dictionary.profiles, function (profile) {
	// 	var profileHandler, profileExpr;

	// 	if (_.isArray(profile)) {
	// 		if (_.isFunction(profile[1])) {
	// 			profileHandler = profile[1];
	// 		}
	// 		profile = profile[0];
	// 	}
	// 	profileExpr =
	// 		"((?:https?://)?(?:www\\.)?" +
	// 		profile.replace(".", "\\.") +
	// 		"[/\\w \\.-]*)";
	// 	if (_.isFunction(profileHandler)) {
	// 		regularRules.profiles.push([profileExpr, profileHandler]);
	// 	} else {
	// 		regularRules.profiles.push(profileExpr);
	// 	}
	// });

	Object.entries(dictionary.inline).forEach((social) => {
		const [key, value] = social;
		regularRules.inline[key] = value + ":?[\\s]*(.*)";
	});

	return Object.assign(dictionary, regularRules);
}

// dictionary is object, so it will be extended by reference
//makeRegExpFromDictionary();


export default function parse(extractedText) {
	// this does not do anything for now
	//makeRegExpFromDictionary();

	return new Promise(async (resolve, reject) => {
		const Resume = new resume();
		const rows = extractedText.split("\n");

		// adds name/email/phone to Resume.parts
		await parseDictionaryRegular(extractedText, Resume);

		rows.forEach(async (row, index) => {
			await parseDictionaryTitles(Resume, rows, index);
			await parseDictionaryInline(Resume, row);
		});

		if (!Resume.parts) reject("Resume.parts does not exist");
		resolve(Resume.parts);
	});

	// save prepared file text (for debug)
	//fs.writeFileSync('./parsed/'+extractedText.name + '.txt', extractedText);

	// 1 parse regulars
	// parseDictionaryRegular(extractedText, Resume);

	// for (var i = 0; i < rows.length; i++) {
	// 	row = rows[i];

	// 	// 2 parse profiles
	// 	//row = rows[i] = parseDictionaryProfiles(row, Resume);

	// 	// 3 parse titles
	// 	parseDictionaryTitles(Resume, rows, i);
	// 	parseDictionaryInline(Resume, row);
	// }

	//NOT USED
	// if (_.isFunction(cbReturnResume)) {
	// 	// wait until download and handle internet profile
	// 	let i = 0;
	// 	let checkTimer = setInterval(function () {
	// 		i++;
	// 		/**
	// 		 * FIXME:profilesWatcher.inProgress not going down to 0 for txt files
	// 		 */
	// 		if (profilesWatcher.inProgress === 0 || i > 5) {
	// 			//if (profilesWatcher.inProgress === 0) {
	// 			cbReturnResume(Resume);
	// 			clearInterval(checkTimer);
	// 		}
	// 	}, 200);
	// } else {
	// 	return console.error("cbReturnResume should be a function");
	// }
}

/**
 * Make text from @rowNum index of @allRows to the end of @allRows
 * @param rowNum
 * @param allRows
 * @returns {string}
 */
function restoreTextByRows(rowNum, allRows) {
	rowNum = rowNum + 1;
	let rows = [];

	do {
		rows.push(allRows[rowNum]);
		rowNum++;
	} while (rowNum < allRows.length);

	const joined = rows.join("\n");
	return joined;
}

/**
 * Count words in string
 * @param str
 * @returns {Number}
 */
function countWords(str) {
	return str.split(" ").length;
}

/**
 *
 * @param Resume
 * @param row
 */
function parseDictionaryInline(Resume, row) {
	return new Promise((resolve) => {
		let find;

		_.forEach(dictionary.inline, (expression, key) => {
			find = new RegExp(expression).exec(row);
			if (find) {
				Resume.addKey(key.toLowerCase(), find[1]);
			}
		});
		resolve(true);
	});
}

/**
 *
 * @param data
 * @param Resume
 */
function parseDictionaryRegular(data, Resume) {
	return new Promise((resolve) => {
		const regularDictionary = dictionary.regular;
		let find;

		_.forEach(regularDictionary, (expressions, key) => {
			_.forEach(expressions, (expression) => {
				find = new RegExp(expression).exec(data);
				if (find) {
					Resume.addKey(key.toLowerCase(), find[0]);
				}
			});
		});

		resolve(true);
	});
}

/**
 *
 * @param Resume
 * @param rows
 * @param rowIdx
 */
function parseDictionaryTitles(Resume, rows, rowIdx) {
	return new Promise((resolve) => {
		let allTitles = _.flatten(_.toArray(dictionary.titles)).join("|");
		let row = rows[rowIdx];
		let isRuleFound;

		_.forEach(dictionary.titles, (expressions, key) => {
			expressions = expressions || [];
			// means, that titled row is less than 5 words
			if (countWords(row) <= 5) {
				_.forEach(expressions, (expression) => {
					isRuleFound = row.includes(expression);

					if (isRuleFound) {
						// restore remaining text to search in relevant part of text
						let choppedResume = restoreTextByRows(rowIdx, rows);
						const index = choppedResume.match(`\n${allTitles}`)?.index;

						if (index) {
							choppedResume = choppedResume.slice(0, index);
						}

						Resume.addKey(key, choppedResume);
					}
				});
			}
		});
		resolve(true);
	});
}

/**
 *
 * @param row
 * @param Resume
 * @returns {*}
 */
// function parseDictionaryProfiles(row, Resume) {
// 	var regularDictionary = dictionary.profiles,
// 		find,
// 		modifiedRow = row;

// 	_.forEach(regularDictionary, function (expression) {
// 		var expressionHandler;

// 		if (_.isArray(expression)) {
// 			if (_.isFunction(expression[1])) {
// 				expressionHandler = expression[1];
// 			}
// 			expression = expression[0];
// 		}
// 		find = new RegExp(expression).exec(row);
// 		if (find) {
// 			Resume.addKey("profiles", find[0] + "\n");
// 			modifiedRow = row.replace(find[0], "");
// 			if (_.isFunction(expressionHandler)) {
// 				profilesWatcher.inProgress++;
// 				expressionHandler(find[0], Resume, profilesWatcher);
// 			}
// 		}
// 	});

// 	return modifiedRow;
// }
