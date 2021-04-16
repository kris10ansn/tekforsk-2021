import fs from "fs";
import { createStream, dataPathFactory } from "./files";
import { createClient, recognizeText } from "./azure";
import {
    createPath,
    pipe,
    env,
    formatRecognitionResponse,
    logWithLabel,
} from "./util";

const { KEY, ENDPOINT } = env();
const client = createClient(KEY!, ENDPOINT!);

const createDataPath = dataPathFactory(createPath("data"));
const imageNames = fs.readdirSync(createDataPath("/"));

imageNames
    .map(pipe(createDataPath, createStream))
    .forEach((image, i) =>
        recognizeText(client, image)
            .then(formatRecognitionResponse)
            .then(logWithLabel(imageNames[i]))
    );
