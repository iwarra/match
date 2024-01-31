import { pipeline, env } from "@xenova/transformers";

const task = "feature-extraction";
const model = "Xenova/all-MiniLM-L6-v2";

export default async function embedding(data) {
	// NOTE: Uncomment this to change the cache directory
	// env.cacheDir = './.cache';
	const extractor = await pipeline(task, model);

	return await extractor(data, {
		pooling: "mean",
		normalize: true,
	});
}
