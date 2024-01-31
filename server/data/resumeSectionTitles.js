let addedTitles = {};

// consider calling it "default"
let originalTitles = {
	objective: ["objective", "objectives"],
	summary: ["summary"],
	technology: ["technology", "technologies"],
	experience: ["experience"],
	education: ["education", "EDUCATION"],
	skills: [
		"skills",
		"SKILLS",
		"Skills & Expertise",
		"technology",
		"technologies",
	],
	languages: ["languages", "LANGUAGES"],
	courses: ["courses"],
	projects: ["projects"],
	links: ["links"],
	contacts: ["contacts"],
	positions: ["positions", "position"],
	// profiles: [
	// 	"profiles",
	// 	"social connect",
	// 	"social-profiles",
	// 	"social profiles",
	// ],
	awards: ["awards"],
	honors: ["honors"],
	additional: ["additional"],
	certification: ["certification", "certifications", "CERTIFICATES"],
	interests: ["interests"],
};

function Titles() {
	function setAdded(input) {
		addedTitles = {
			...addedTitles,
			...input,
		};
	}
	function added() {
		return addedTitles;
	}

	return {
		original: originalTitles,
		added,
		setAdded,
	};
}

export default Titles();

//export { originalTitles, addedTitles };
