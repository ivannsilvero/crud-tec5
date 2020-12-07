"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const alumno_controller_1 = require("../controllers/alumno.controller");
exports.router = express_1.Router();
exports.router
    .route('/')
    .get(alumno_controller_1.getAlumnos)
    .post(alumno_controller_1.createAlumnos);
exports.router
    .route('/:id')
    .get(alumno_controller_1.getAlumno)
    .put(alumno_controller_1.updateAlumno)
    .delete(alumno_controller_1.deleteAlumno);
//# sourceMappingURL=alumno.routes.js.map