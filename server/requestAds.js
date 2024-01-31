import JSONStream from "JSONStream";
import request from "request";
import embedding from "./src/utils/embedding.js";
import {
	toEmbed,
	mergeChildren,
	transformNested,
} from "./src/state/getResume.js";
import { queries } from "./src/utils/formatQueries.js";
import { isObject } from "./src/utils/helperFunctions.js";
import importantAdKeys from "./data/jobKeysOfInterest.js";
import { client } from "./src/utils/database.js";
import tracer from "tracer";

const logger = tracer.colorConsole();
const database = client.db("job_hunter");
const jobAds = database.collection("job_ads");

async function requestAds(endpoint, queries) {
	queries = await queries;

	const url = `${"https://jobstream.api.jobtechdev.se"}/${endpoint}`;

	if (endpoint === "snapshot") return request({ url });

	if (!isObject(queries)) {
		// date-query is required
		const randomDate = "2000-01-01T18:23:59";
		return request({ url: `${url}?date=${randomDate}` });
	}

	if (isObject(queries)) {
		queries = Object.entries(queries)
			.map((entry) => {
				const [key, values] = entry;
				return values.map((val) => `${key}=${val}`);
			})
			.flat()
			.join("&");

		return request({ url: `${url}?${queries}` });
	}
}

//loops over every object and returns a modified copy of that object (.map)
const parseAndModify = JSONStream.parse("*", (ad) => {
	return Object.entries(ad).reduce((object, current) => {
		const [key, value] = current;

		if (importantAdKeys.includes(key)) return { ...object, [key]: value };
		return object;
	}, {});
});

requestAds("stream", queries()).then((stream) => {
	stream.pipe(parseAndModify);

	parseAndModify.on("data", async (ad) => {
		stream.pause();
		console.log("Ad id", ad.id);

		const transformed = await embedding(
			toEmbed(transformNested(propertiesOfInterest(ad))),
		);

		jobAds
			.updateOne(
				{ _id: ad.id },
				{
					$setOnInsert: { _id: ad.id },
					$set: {
						original: ad,
						embedded: Object.values(transformed.data),
					},
				},
				{ upsert: true },
			)
			.then((writeResult) => {
				logger.trace(writeResult);
				stream.resume();
			});
	});
});

function propertiesOfInterest(ad) {
	const requirements = ["must_have", "nice_to_have"].reduce(
		(requirements, label) => {
			return {
				...requirements,
				[label]: ad[label],
			};
		},
		{},
	);

	return {
		description: ad.description.text_formatted ?? ad.description.text,
		title: [ad.headline, ad.occupation.label],
		employer: ad.employer,
		details: ad.application_details,
		requirements: mergeChildren(requirements),
	};
}

// ----------------------------------------------------------------------------------- //
// you can pause the read if you want to
// get.latest.pipe(parseAndModify).pause()
// --
// you can resume the read when you want to
// get.latest.pipe(parseAndModify).resume()
// ----------------------------------------------------------------------------------- //
