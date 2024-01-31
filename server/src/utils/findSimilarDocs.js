import { getDatabase } from "./database.js";
const database = getDatabase().db("job_hunter");

async function getResume(id) {
	const resumes = database.collection("resumes");
	const resume = await resumes.findOne({ _id: id });
	return resume.embedded;
}

async function findSimilarDocs(query) {
	const jobs = database.collection("job_ads");

	const documents = await jobs
		.aggregate(
			[
				{
					$vectorSearch: {
						index: "jobAdsIndex",
						path: "embedded",
						queryVector: query, //resume.embedded
						numCandidates: 100,
						limit: 10,
					},
				},
				{
					$project: {
						_id: 1,
						original: {
							headline: 1,
						},
						score: {
							$meta: "vectorSearchScore",
						},
					},
				},
			],
			{},
		)
		.toArray();

	return documents;
}

const result = await findSimilarDocs(
	await getResume("josipovic.ivona@gmail.com"),
);
console.log(result);
