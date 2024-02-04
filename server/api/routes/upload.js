import express from "express";
import tracer from "tracer";
import embedding from "../../src/utils/embedding.js";
import { toEmbed } from "../../src/state/getResume.js";
import { getDatabase } from "../../src/utils/database.js";
const database = getDatabase().db("job_hunter");
const resumes = database.collection("resumes");
const router = express.Router();
const logger = tracer.colorConsole();

router.post("/resume", async (req, res) => {
	const url = req.body.value;
	const { parsedResume } = await import("../../src/utils/parsedResume.js");

	const resume = await parsedResume(url);

	const editedResume = Object.keys(resume).reduce((selected, key) => {
		if (key === "name" || key === "email") return selected;
		return {
			...selected,
			[key]: resume[key],
		};
	}, {});

	const transformedResume = await embedding(toEmbed(editedResume));

	resumes
		.updateOne(
			{ _id: resume.email },
			{
				$setOnInsert: { _id: resume.email },
				$set: {
					original: resume,
					embedded: transformedResume.tolist().flat(),
				},
			},
			{ upsert: true },
		)
		.then((writeResult) => {
			logger.info(writeResult);
			res.sendStatus(201);
		});
});

export default router;
