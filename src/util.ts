import { RecognizePrintedTextInStreamResponse } from "@azure/cognitiveservices-computervision/esm/models";
import dotenv from "dotenv";
import path from "path";

export type Length<T extends any[]> = T extends { length: infer L } ? L : never;
export type DropFirst<T extends any[]> = ((...args: T) => any) extends (
    arg: any,
    ...rest: infer U
) => any
    ? U
    : T;

export type LastElement<T extends any[]> = T[Length<DropFirst<T>>];

export const logWithLabel = (label: string) => (...args: any) =>
    console.log(label, ...args);

export const recognitionResponseToArray = (
    response: RecognizePrintedTextInStreamResponse
) =>
    response.regions?.map((region) =>
        region.lines?.map((line) => line.words?.map((word) => word.text))
    ) as string[][][];

const loadDotEnv = () => dotenv.config();

export const env = () => {
    loadDotEnv();
    return process.env;
};

export const createPath = (...args: string[]) =>
    path.join(__dirname, "..", ...args);

export const pipe = <
    A,
    F extends Array<(arg: A, ...args: any[]) => any>,
    R extends ReturnType<LastElement<F>>
>(
    ...functions: F
) => (arg: A) => functions.reduce((prev, cur) => cur(prev), arg) as R;
