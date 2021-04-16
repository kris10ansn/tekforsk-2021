const Webcam = require("node-webcam");

const OPTIONS = {
    quality: 100,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: false,
    verbose: false,
};

export const captureImage = async (path: string) =>
    new Promise<string>((resolve, reject) => {
        const camera = Webcam.create(OPTIONS);

        camera.capture(path, (error: any, data: any) => {
            if (error) reject(error);
            else resolve(data);
        });
    });
