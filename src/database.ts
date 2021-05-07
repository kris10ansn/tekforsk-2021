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

interface Capture {
    id: number;
    time: string;
    image: string;
    value: number;
}

const promise = <T>(query: Promise<T>): Promise<T> =>
    new Promise((resolve, reject) => query.then(resolve).catch(reject));

export const insertCapture = (
    capture: { [key in keyof Capture]?: Capture[key] }
) => promise(knex<Capture>("capture").insert(capture));

export const getCaptures = () => promise(knex<Capture>("capture").select("*"));

export const destroyDatabaseConnection = () => knex.destroy();
