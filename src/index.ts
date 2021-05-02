import express from "express";
import { getImages } from "./database";
import { createPath } from "./util";

const app = express();

app.get("/images", async (_req, res) => {
    const images = await getImages();
    res.json(
        images.map(({ time, value, image }) => ({
            time,
            value,
            image,
        }))
    );
});

app.use(express.static(createPath("public")));
app.use("/image", express.static(createPath("data")));

app.listen(8080);
