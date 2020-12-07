import express from 'express';
export const app = express();

import { router as alumnoRouter } from './alumno.routes';

app.use('/api/alumnos', alumnoRouter);