const task = "feature-extraction";
const model = "Xenova/all-MiniLM-L6-v2";

export default async function embedding(data) {
	// Dynamically import the Transformers.js library
	let { pipeline, env } = await import("@xenova/transformers");

	// NOTE: Uncomment this to change the cache directory
	// env.cacheDir = './.cache';

	const extractor = await pipeline(task, model);

	const output = await extractor(data, {
		pooling: "mean",
		normalize: true,
	});

	return output;
}
