import { extractAsText } from "./libs/processing.js";
import parse from "./libs/parser.js";
import tracer from "tracer";
const logger = tracer.colorConsole();

export async function parsedResume(url) {
	logger.trace(url);

	return new Promise(async (resolve, reject) => {
		const extractedText = await extractAsText(url);

		const parsed = parse(extractedText);

		if (!parsed) reject("Error while parsing.");
		resolve(parsed);
	});
}
