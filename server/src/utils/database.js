import dotenv from "dotenv";
import { MongoClient } from "mongodb";

// if (process.env.ENVIRONMENT !== "prod") {
// 	//const path = await import("path");

// 	dotenv.config();
// } else {
// 	dotenv.config();
// }

dotenv.config();
console.log("Env", process.env.MONGO_URI);
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
