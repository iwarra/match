import express from "express";
import tracer from "tracer";
import { getJobs } from "../../src/utils/findSimilarDocs.js";
const router = express.Router();
const logger = tracer.colorConsole();

router.route("/jobs").get(async (req, res) => {
	const answer = await getJobs("josipovic.ivona@gmail.com");
	// remove setTimeout when in production
	setTimeout(() => res.send(answer), 1000);
	logger.info("Jobs sent");
});

export default router;
