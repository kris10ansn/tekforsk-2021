import knex from "knex";

const db = knex({
    client: "mysql",
    connection: {
        host: "localhost",
        port: 3306,
        database: "ivar",
        user: "root",
        password: "ncWMI1w5yzdpD1KV",
        charset: "utf8",
    },
});

interface Image {
    id: number;
    timestamp: string;
    path: string;
    value: number;
}

export const insertImage = (path: string, value: number) =>
    new Promise((resolve, reject) =>
        db<Image>("image").insert({ path, value }).then(resolve).catch(reject)
    );
