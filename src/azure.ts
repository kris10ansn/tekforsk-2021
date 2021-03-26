import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import fs from "fs";

export const createClient = (key: string, endpoint: string) =>
    new ComputerVisionClient(
        new ApiKeyCredentials({
            inHeader: { "Ocp-Apim-Subscription-Key": key },
        }),
        endpoint
    );

export const recognizeText = (
    client: ComputerVisionClient,
    image: fs.ReadStream
) => client.recognizePrintedTextInStream(true, () => image);
