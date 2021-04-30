import express from "express";
import { getImages } from "./database";
import { createPath } from "./util";

const app = express();

app.get("/images", async (_req, res) => {
    const images = await getImages();
    res.json(
        images.map(({ time, value, path }) => ({
            time,
            value,
            path,
        }))
    );
});

app.use(express.static(createPath("public")));

app.listen(8080);
