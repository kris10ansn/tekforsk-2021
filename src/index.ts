import fs from "fs";
import { createStream, dataPathFactory } from "./files";
import { createClient, recognizeText } from "./azure";
import {
    createPath,
    pipe,
    env,
    recognitionResponseToArray,
    logWithLabel,
} from "./util";
import { captureImage } from "./webcam";
import { insertImage } from "./database";

const { KEY, ENDPOINT } = env();
const client = createClient(KEY!, ENDPOINT!);
const createDataPath = dataPathFactory(createPath("data"));

const recognizeAll = () => {
    const imageNames = fs.readdirSync(createDataPath("/"));

    imageNames
        .map(pipe(createDataPath, createStream))
        .forEach((image, i) =>
            recognizeText(client, image)
                .then(recognitionResponseToArray)
                .then(logWithLabel(imageNames[i]))
        );
};

const recognizeCapture = () => {
    const imagePath = createDataPath("webcam.jpg");

    captureImage(imagePath).then((image) => {
        recognizeText(client, image)
            .then(recognitionResponseToArray)
            .then(logWithLabel("webcam image"));
    });
};

const recognizeAndInsert = async () => {
    const imagePath = createDataPath("2.jpg");
    const image = createStream(imagePath);

    const result = await recognizeText(client, image);

    const responseArray = recognitionResponseToArray(result);
    const value = Number(responseArray[0][3][1]);

    insertImage(imagePath, value);
};

recognizeAndInsert();
