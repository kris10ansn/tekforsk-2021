import Knex from "knex";

const config = {
    client: "mysql",
    connection: {
        host: "localhost",
        port: 3306,
        database: "ivar",
        user: "root",
        password: "ncWMI1w5yzdpD1KV",
        charset: "utf8",
    },
};

const knex = Knex(config);

interface Image {
    id: number;
    time: string;
    image: string;
    value: number;
}

const promise = <T>(query: Promise<T>): Promise<T> =>
    new Promise((resolve, reject) => query.then(resolve).catch(reject));

export const insertImage = (image: { [key in keyof Image]?: Image[key] }) =>
    promise(knex<Image>("image").insert(image));

export const getImages = () => promise(knex<Image>("image").select("*"));

export const destroyDatabaseConnection = () => knex.destroy();
