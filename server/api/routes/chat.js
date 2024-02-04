import { generateAnswer } from "../../chatModel.js";
import express from "express";
import tracer from "tracer";
const router = express.Router();
const logger = tracer.colorConsole();

router.route("/chat").post(async (req, res) => {
	const message = req.body;
	const answer = (await generateAnswer(message)).at(-1);
	res.send(answer);
	logger.info("Answer sent:", answer);
});

export default router;
