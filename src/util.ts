import { RecognizePrintedTextInStreamResponse } from "@azure/cognitiveservices-computervision/esm/models";
import dotenv from "dotenv";

export const logWithLabel = (label: string) => (...args: any) =>
    console.log(label, ...args);

export const formatRecognitionResponse = (
    response: RecognizePrintedTextInStreamResponse
) =>
    response.regions?.map((region) =>
        region.lines?.map((line) => line.words?.map((word) => word.text))
    );

export const loadDotEnv = () => dotenv.config();
