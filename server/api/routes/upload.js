import express from "express";
import tracer from "tracer";
import embedding from "../../src/utils/embedding.js";
import { toEmbed } from "../../src/state/getResume.js";
import { client } from "../../src/utils/database.js";
const database = client.db("job_hunter");
const resumes = database.collection("resumes");
const router = express.Router();
const logger = tracer.colorConsole();

router.post("/resume", async (req) => {
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

	console.log("edited", editedResume);

	resumes
		.updateOne(
			{ _id: resume.email },
			{
				$setOnInsert: { _id: resume.email },
				$set: {
					original: resume,
					embedded: await embedding(toEmbed(editedResume)),
				},
			},
			{ upsert: true },
		)
		.then((writeResult) => logger.trace(writeResult));
});

export default router;
