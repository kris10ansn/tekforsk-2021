import fs from "fs";
import { createStream, dataPathFactory } from "./files";
import { createClient, recognizeText } from "./azure";
import {
    createPath,
    createPipe,
    env,
    formatRecognitionResponse,
    logWithLabel,
} from "./util";

const { KEY, ENDPOINT } = env();
const DATA_PATH = createPath("data");

const client = createClient(KEY!, ENDPOINT!);

const createDataPath = dataPathFactory(DATA_PATH);
const imageNames = fs.readdirSync(createDataPath("/"));

imageNames.map(createPipe(createDataPath, createStream)).forEach((image, i) => {
    recognizeText(client, image)
        .then(formatRecognitionResponse)
        .then(logWithLabel(imageNames[i]));
});
