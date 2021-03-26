import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { createStream, dataPathFactory } from "./files";
import { createClient, recognizeText } from "./azure";
import { formatRecognitionResponse, logWithLabel } from "./util";

dotenv.config();

const { KEY, ENDPOINT } = process.env;
const DATA_PATH = path.join(__dirname, "..", "data");

const client = createClient(KEY!, ENDPOINT!);

const createPath = dataPathFactory(DATA_PATH);
const imageNames = fs.readdirSync(createPath("/"));

imageNames
    .map(createPath)
    .map(createStream)
    .forEach((image, i) => {
        recognizeText(client, image)
            .then(formatRecognitionResponse)
            .then(logWithLabel(imageNames[i]));
    });
