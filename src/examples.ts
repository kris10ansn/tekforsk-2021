import { createClient, recognizeText } from "./azure";
import { insertCapture, destroyDatabaseConnection } from "./database";
import { createStream, dataPathFactory } from "./files";
import {
    pipe,
    recognitionResponseToArray,
    logWithLabel,
    createPath,
    env,
} from "./util";
import { captureImage } from "./webcam";
import fs from "fs";

const { KEY, ENDPOINT } = env();
const client = createClient(KEY!, ENDPOINT!);
const createDataPath = dataPathFactory(createPath("data"));

export const recognizeAll = () => {
    const imageNames = fs.readdirSync(createDataPath("/"));

    imageNames
        .map(pipe(createDataPath, createStream))
        .forEach((image, i) =>
            recognizeText(client, image)
                .then(recognitionResponseToArray)
                .then(logWithLabel(imageNames[i]))
        );
};

export const recognizeCapture = () => {
    const imagePath = createDataPath("webcam.jpg");

    captureImage(imagePath).then((image) => {
        recognizeText(client, image)
            .then(recognitionResponseToArray)
            .then(logWithLabel("webcam image"));
    });
};

export const recognizeAndInsert = () => {
    const imageName = "2.jpg";
    const imagePath = createDataPath(imageName);
    const image = createStream(imagePath);

    recognizeText(client, image)
        .then(recognitionResponseToArray)
        .then((result) => {
            const value = Number(result[0][3][1]);

            insertCapture({ image: imageName, value })
                .then(logWithLabel("insert"))
                .finally(destroyDatabaseConnection);
        });
};
