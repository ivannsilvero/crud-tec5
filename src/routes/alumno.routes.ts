/**
 * DOMINIO/api/alumno
 */

import { Router } from 'express';
import { getAlumnos, createAlumnos, getAlumno, updateAlumno, deleteAlumno } from '../controllers/alumno.controller';

export const router = Router();

router
.route('/')
.get(getAlumnos)
.post(createAlumnos)

router
.route('/:legajo')
.get(getAlumno)
.put(updateAlumno)
.delete(deleteAlumno)