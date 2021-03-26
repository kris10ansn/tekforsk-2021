import path from "path";
import fs from "fs";

export const createDataPathFactory = (dataPath: string) => (
    imagePath: string
) => path.join(dataPath, imagePath);

export const createStream = (path: string) => fs.createReadStream(path);
