//const cheerio = require("cheerio");
//const _ = require("underscore");
//import request from "request";
import titles from "../data/resumeSectionTitles.js";


function getTitles() {
	const obj = { ...titles.original, ...titles.added() };
	return obj;
}

export default {
	titles: getTitles(),
	// profiles: [
	// 	[
	// 		"github.com",
	// 		function (url, Resume, profilesWatcher) {
	// 			download(url, function (data, err) {
	// 				if (data) {
	// 					var $ = cheerio.load(data),
	// 						fullName = $(".vcard-fullname").text(),
	// 						location = $(".octicon-location").parent().text(),
	// 						mail = $(".octicon-mail").parent().text(),
	// 						link = $(".octicon-link").parent().text(),
	// 						clock = $(".octicon-clock").parent().text(),
	// 						company = $(".octicon-organization").parent().text();

	// 					Resume.addObject("github", {
	// 						name: fullName,
	// 						location: location,
	// 						email: mail,
	// 						link: link,
	// 						joined: clock,
	// 						company: company,
	// 					});
	// 				} else {
	// 					return console.log(err);
	// 				}
	// 				//profilesInProgress--;
	// 				profilesWatcher.inProgress--;
	// 			});
	// 		},
	// 	],
	// 	[
	// 		"linkedin.com",
	// 		function (url, Resume, profilesWatcher) {
	// 			download(url, function (data, err) {
	// 				if (data) {
	// 					var $ = cheerio.load(data),
	// 						linkedData = {
	// 							positions: {
	// 								past: [],
	// 								current: {},
	// 							},
	// 							languages: [],
	// 							skills: [],
	// 							educations: [],
	// 							volunteering: [],
	// 							volunteeringOpportunities: [],
	// 						},
	// 						$pastPositions = $(".past-position"),
	// 						$currentPosition = $(".current-position"),
	// 						$languages = $("#languages-view .section-item > h4 > span"),
	// 						$skills = $(
	// 							".skills-section .skill-pill .endorse-item-name-text",
	// 						),
	// 						$educations = $(".education"),
	// 						$volunteeringListing = $("ul.volunteering-listing > li"),
	// 						$volunteeringOpportunities = $(
	// 							"ul.volunteering-opportunities > li",
	// 						);

	// 					linkedData.summary = $("#summary-item .summary").text();
	// 					linkedData.name = $(".full-name").text();
	// 					// current position
	// 					linkedData.positions.current = {
	// 						title: $currentPosition.find("header > h4").text(),
	// 						company: $currentPosition.find("header > h5").text(),
	// 						description: $currentPosition.find("p.description").text(),
	// 						period: $currentPosition.find(".experience-date-locale").text(),
	// 					};
	// 					// past positions
	// 					_.forEach($pastPositions, function (pastPosition) {
	// 						var $pastPosition = $(pastPosition);
	// 						linkedData.positions.past.push({
	// 							title: $pastPosition.find("header > h4").text(),
	// 							company: $pastPosition.find("header > h5").text(),
	// 							description: $pastPosition.find("p.description").text(),
	// 							period: $pastPosition.find(".experience-date-locale").text(),
	// 						});
	// 					});
	// 					_.forEach($languages, function (language) {
	// 						linkedData.languages.push($(language).text());
	// 					});
	// 					_.forEach($skills, function (skill) {
	// 						linkedData.skills.push($(skill).text());
	// 					});
	// 					_.forEach($educations, function (education) {
	// 						var $education = $(education);
	// 						linkedData.educations.push({
	// 							title: $education.find("header > h4").text(),
	// 							major: $education.find("header > h5").text(),
	// 							date: $education.find(".education-date").text(),
	// 						});
	// 					});
	// 					_.forEach($volunteeringListing, function (volunteering) {
	// 						linkedData.volunteering.push($(volunteering).text());
	// 					});
	// 					_.forEach($volunteeringOpportunities, function (volunteering) {
	// 						linkedData.volunteeringOpportunities.push($(volunteering).text());
	// 					});

	// 					Resume.addObject("linkedin", linkedData);
	// 				} else {
	// 					return console.log(err);
	// 				}
	// 				profilesWatcher.inProgress--;
	// 			});
	// 		},
	// 	],
	// 	"facebook.com",
	// 	"bitbucket.org",
	// 	"stackoverflow.com",
	// ],
	inline: {
		//address: 'address',
		skype: "skype",
	},
	regular: {
		name: [/([A-Z][a-z]*)(\s[A-Z][a-z]*)/],
		email: [/([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/],
		phone: [/((?:\+?\d{1,3}[\s-])?\(?\d{2,3}\)?[\s.-]?\d{3}[\s.-]\d{4,5})/],
	},
};
