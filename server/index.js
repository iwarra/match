import express from "express";
import cors from "cors";

// routes
import dictionary from "./api/routes/dictionary.js";
import upload from "./api/routes/upload.js";

const server = express();

server.use(cors());
server.use(express.json());

server.use(dictionary);
server.use(upload);

server.listen(5000, () => console.log("I have started on port 5000"));
