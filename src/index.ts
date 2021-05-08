import express from "express";
import { getCaptures } from "./database";
import { createPath } from "./util";

const app = express();

app.get("/api/captures", async (_request, response) =>
    getCaptures().then((captures) =>
        response.json(
            captures.map(({ time, value, image }) => ({
                time,
                value,
                image,
            }))
        )
    )
);

app.use(express.static(createPath("public")));
app.use("/image", express.static(createPath("data")));

app.listen(8080);
