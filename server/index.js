import express from "express";
import cors from "cors";

// routes
import dictionary from "./api/routes/dictionary.js";
import upload from "./api/routes/upload.js";
import chat from "./api/routes/chat.js";
import jobs from "./api/routes/jobs.js";

const server = express();

server.use(cors());
server.use(express.json());

server.use(dictionary);
server.use(upload);
server.use(chat);
server.use(jobs);

server.listen(5000, () => console.log("I have started on port 5000"));
