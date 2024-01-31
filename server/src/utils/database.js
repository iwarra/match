import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// delete appRoot from package, try same with path-module only
//import appRoot from "app-root-path";

//dotenv.config({ path: path.normalize(appRoot + "/.env") });
dotenv.config({ path: path.join(__dirname, "../../data/occupation.json") });

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
