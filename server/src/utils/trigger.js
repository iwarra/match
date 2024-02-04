import { pipeline, env } from "@xenova/transformers";

exports = async function (event) {
	const task = "feature-extraction";
	const model = "Xenova/all-MiniLM-L6-v2";
	const doc = event.fullDocument;
	const docId = event.documentKey._id;
	const collection = context.services
		.get("Cluster0")
		.db("job_hunter")
		.collection("job_ads");

	try {
		console.log("doc", doc);

		if (event.operationType === "update") {
			async function embedding(data) {
				// NOTE: Uncomment this to change the cache directory
				// env.cacheDir = './.cache';
				const extractor = await pipeline(task, model);

				return await extractor(data, {
					pooling: "mean",
					normalize: true,
				});
			}

			const transformed = await embedding(doc.embedded);

			await collection.updateOne(
				{ _id: docId },
				{
					$set: {
						trigger_embedded: transformed.tolist().flat(),
					},
				},
				{ upsert: true },
			);
		}
	} catch (err) {
		console.log("error performing mongodb write: ", err.message);
	}
};


