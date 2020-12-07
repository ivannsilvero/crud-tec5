import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import { app as IndexRouter } from './routes/index.routes';

import { Alumnos } from './entity/Alumnos';

import path from 'path';

const main = async () => {

    const app = express();

    await createConnection({
        type: 'mysql',
        database: 'tec5',
        url: (app.get('env') === 'development') ? '' : process.env.DATABASE_URL,
        username: 'ivan',
        password: '',
        entities: [Alumnos],
        synchronize: true
    });

    const PORT = process.env.PORT || 4000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());

    app.use(IndexRouter);

    app.use(express.static(path.resolve(__dirname, '../public')));

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${ PORT }`);
    });

}

main().catch((err) => {
    console.log(err);
});