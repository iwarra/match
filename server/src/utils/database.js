import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import { MongoClient } from "mongodb";

function CreateDatabase() {
	const mongoURI = process.env.MONGO_URI;
	const client = new MongoClient(mongoURI);
	client.connect();
	return client;
}

export const client = CreateDatabase();
