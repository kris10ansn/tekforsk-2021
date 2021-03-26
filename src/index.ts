import fs from "fs";
import { createStream, dataPathFactory } from "./files";
import { createClient, recognizeText } from "./azure";
import {
    createPath,
    env,
    formatRecognitionResponse,
    loadDotEnv,
    logWithLabel,
} from "./util";

loadDotEnv();

const { KEY, ENDPOINT } = env("KEY", "ENDPOINT");
const DATA_PATH = createPath("data");

const client = createClient(KEY!, ENDPOINT!);

const createDataPath = dataPathFactory(DATA_PATH);
const imageNames = fs.readdirSync(createDataPath("/"));

imageNames
    .map(createDataPath)
    .map(createStream)
    .forEach((image, i) => {
        recognizeText(client, image)
            .then(formatRecognitionResponse)
            .then(logWithLabel(imageNames[i]));
    });
