import knex from "knex";

knex({
    client: "mysql",
    connection: {
        host: "localhost",
        port: 3306,
        database: "ivar",
        userName: "root",
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

const insertImage = (path: string, value: number) =>
    knex<Image>("image").insert({ path, value });
