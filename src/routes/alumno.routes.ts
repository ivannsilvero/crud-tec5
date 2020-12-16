/**
 * DOMINIO/api/alumnos
 */

import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos';
import { getAlumnos, createAlumnos, getAlumnoByLegajo, updateAlumno, deleteAlumno, getAlumnosByCodigoPostal, getAlumnosByFechaDeNacimiento, getAlumnosByCiudadAndSangre, getAlumnosByCalle } from '../controllers/alumno.controller';

export const router = Router();

router
.route('/')
.get(getAlumnos)
.post([
    check('leg_alumno', 'El legajo es obligatorio y único').notEmpty(),
    check('apyn_alumno', 'El nombre es obligatorio').notEmpty(),
    check('dom_alumno', 'El domicilio es obligatorio').notEmpty(),
    check('cod_postal', 'El código postal es obligatorio').notEmpty(),
    check('fecha_nac_alumno', 'La fecha de nacimiento es obligatoria y debe seguir el siguiente formato: YYYY-MM-DD').notEmpty(),
    check('email_alumno', 'El email es obligatorio').isEmail(),
    check('grupo_sang_alumno', 'El grupo sanguíneo es obligatorio').notEmpty(),
    check('tel_fijo_alumno', 'El teléfono fijo es obligatorio').notEmpty(),
    check('tel_movil_alumno', 'El teléfono móvil es obligatorio').notEmpty(),
    check('dni_alumno', 'El DNI es obligatorio').notEmpty(),
    validarCampos 
], createAlumnos);

router
.route('/:leg_alumno')
.get(getAlumnoByLegajo)
.put(updateAlumno)
.delete(deleteAlumno)

/* FYI: Para el Iván del futuro: 
 * El código postal de Batán es el 7601
 */
router
.route('/postal/:cod_postal')
.get(getAlumnosByCodigoPostal)

router
.route('/nacimiento/:fecha_nac_alumno')
.get(getAlumnosByFechaDeNacimiento)

router
.route('/postal/:cod_postal/sangre/:grupo_sang_alumno')
.get(getAlumnosByCiudadAndSangre)

router
.route('/calle/:dom_alumno')
.get(getAlumnosByCalle)