import express from "express";
import titles from "../../data/resumeSectionTitles.js";
import tracer from "tracer";
const router = express.Router();
const logger = tracer.colorConsole();

router
	.route("/dictionary")
	.get((req, res) => res.send(titles.default))
	.post((req, res) => {
		const [key, value] = Object.entries(req.body).at(0);
		const originalSectionValues = titles.default[key];

		titles.setAdded({
			[key]: [...originalSectionValues, value],
		});

		logger.info(titles.added);

		res.sendStatus(201);
	});

export default router;
