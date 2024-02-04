import fs from "fs";
import path from "path";
import JSONStream from "JSONStream";
//Alternative fs import
import * as occupationIds from "../../data/higherEdIds.json " assert { type: "json" };
import { fileURLToPath } from "url";
import { dateFromDaysAgo } from "../utils/helperFunctions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const queries = async function (updateData) {
	const listOfOccupations = updateData
		? occupationIds
		: await getOccupationIds();

	return {
		date: dateFromDaysAgo(1),
		"occupation-concept-id": listOfOccupations,
		"location-concept-id": ["CifL_Rzy_Mku"],
	};
};

//Call to get new data and update the higherEdIds file with results
function getOccupationIds() {
	return new Promise((res) => {
		const file = path.join(__dirname, "../../data/occupation.json");
		const stream = fs.createReadStream(file);
		const bucket = [];

		const parsedAndModified = JSONStream.parse("data.concepts.*", (object) => {
			const higherEducationAds = ["qjsN_7xY_41K", "tFq4_83q_aww"];

			if (higherEducationAds.includes(object.id)) {
				function traverse(object) {
					if (!object.narrower) return [];

					const deeper = object.narrower.flatMap((deeperObject) => {
						const uniqueIds = new Set([]);
						traverse(deeperObject).forEach((id) => uniqueIds.add(id));
						return [...uniqueIds];
					});

					if (object.definition) return [object.id, ...deeper];
					return deeper;
				}

				return traverse(object);
			}
		});

		stream.pipe(parsedAndModified);
		parsedAndModified.on("data", (modified) => {
			bucket.push(modified);
		});
		parsedAndModified.on("end", () => res(bucket.flat()));
	});
}
