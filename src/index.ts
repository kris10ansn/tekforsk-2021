import fs from "fs";
import { createStream, createDataPathFactory } from "./files";
import { createClient, recognizeText } from "./azure";
import {
    createPath,
    createPipe,
    env,
    formatRecognitionResponse,
    logWithLabel,
} from "./util";

const { KEY, ENDPOINT } = env();
const client = createClient(KEY!, ENDPOINT!);

const createDataPath = createDataPathFactory(createPath("data"));
const imageNames = fs.readdirSync(createDataPath("/"));

imageNames.map(createPipe(createDataPath, createStream)).forEach((image, i) => {
    recognizeText(client, image)
        .then(formatRecognitionResponse)
        .then(logWithLabel(imageNames[i]));
});
