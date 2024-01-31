import express from "express";
import titles from "../../data/resumeSectionTitles.js";
const router = express.Router();

router
	.route("/dictionary")
	.get((req, res) => {
		res.send(titles);
		res.end();
	})
	.post((req, res) => {
		const [key, value] = Object.entries(req.body).at(0);
		const originalSectionValues = titles.original[key];

		titles.setAdded({
			[key]: [...originalSectionValues, value],
		});

		console.log("On post", titles.added());
		res.sendStatus(201);
		res.end();
	});

export default router;
