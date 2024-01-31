import dotenv from "dotenv";
import { MongoClient } from "mongodb";
// delete appRoot from package, try same with path-module only

if (process.env.ENVIRONMENT !== "prod") {
	const path = await import("path");
	const appRoot = await import("app-root-path");
	console.log("root: ", appRoot.path + "...");

	dotenv.config({ path: path.normalize(appRoot + "/.env") });
} else {
	dotenv.config();
}
//dotenv.config({ path: path.resolve(__dirname, "..") });

let isCreated = false;
let client;

export function getDatabase() {
	if (isCreated) return client;

	// path root directory
	client = new MongoClient(process.env.MONGO_URI);
	client.connect();
	isCreated = true;
	return client;
}
