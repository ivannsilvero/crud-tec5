"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const alumno_controller_1 = require("../controllers/alumno.controller");
exports.router = express_1.Router();
exports.router
    .route('/')
    .get(alumno_controller_1.getAlumnos)
    .post([
    express_validator_1.check('leg_alumno', 'El legajo es obligatorio y único').notEmpty(),
    express_validator_1.check('apyn_alumno', 'El nombre es obligatorio').notEmpty(),
    express_validator_1.check('dom_alumno', 'El domicilio es obligatorio').notEmpty(),
    express_validator_1.check('cod_postal', 'El código postal es obligatorio').notEmpty(),
    express_validator_1.check('fecha_nac_alumno', 'La fecha de nacimiento es obligatoria y debe seguir el siguiente formato: YYYY-MM-DD').notEmpty(),
    express_validator_1.check('email_alumno', 'El email es obligatorio').isEmail(),
    express_validator_1.check('grupo_sang_alumno', 'El grupo sanguíneo es obligatorio').notEmpty(),
    express_validator_1.check('tel_fijo_alumno', 'El teléfono fijo es obligatorio').notEmpty(),
    express_validator_1.check('tel_movil_alumno', 'El teléfono móvil es obligatorio').notEmpty(),
    express_validator_1.check('dni_alumno', 'El DNI es obligatorio').notEmpty(),
    validar_campos_1.validarCampos
], alumno_controller_1.createAlumnos);
exports.router
    .route('/:leg_alumno')
    .get(alumno_controller_1.getAlumno)
    .put(alumno_controller_1.updateAlumno)
    .delete(alumno_controller_1.deleteAlumno);
//# sourceMappingURL=alumno.routes.js.map