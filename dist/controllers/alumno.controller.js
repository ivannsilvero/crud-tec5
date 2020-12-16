"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlumnosByCalle = exports.getAlumnosByCiudadAndSangre = exports.getAlumnosByFechaDeNacimiento = exports.getAlumnosByCodigoPostal = exports.deleteAlumno = exports.updateAlumno = exports.createAlumnos = exports.getAlumnoByLegajo = exports.getAlumnos = void 0;
const Alumnos_1 = require("../entity/Alumnos");
const typeorm_1 = require("typeorm");
const getAlumnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let alumnos;
    const { sort_by, order } = req.query;
    if (sort_by && order) {
        alumnos = yield typeorm_1.getRepository(Alumnos_1.Alumnos)
            .createQueryBuilder()
            .orderBy('dni_alumno', 'ASC')
            .getMany();
    }
    else {
        alumnos = yield typeorm_1.getRepository(Alumnos_1.Alumnos).find();
    }
    return res.status(200).json({
        ok: true,
        alumnos
    });
});
exports.getAlumnos = getAlumnos;
const getAlumnoByLegajo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alumno = yield typeorm_1.getRepository(Alumnos_1.Alumnos).findOne(req.params.leg_alumno);
        if (!alumno) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un alumno con el legajo ${req.params.leg_alumno}`
            });
        }
        return res.status(201).json({
            ok: true,
            alumno
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }
});
exports.getAlumnoByLegajo = getAlumnoByLegajo;
const createAlumnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alumno = yield typeorm_1.getRepository(Alumnos_1.Alumnos).findOne({ where: [
                { dni_alumno: req.body.dni_alumno },
                { leg_alumno: req.body.leg_alumno }
            ] });
        if (alumno) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un alumno con ese legajo y/o DNI'
            });
        }
        const newAlumno = typeorm_1.getRepository(Alumnos_1.Alumnos).create(req.body);
        yield typeorm_1.getRepository(Alumnos_1.Alumnos).save(newAlumno);
        return res.status(201).json({
            ok: true,
            alumno: newAlumno
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }
});
exports.createAlumnos = createAlumnos;
const updateAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alumno = yield typeorm_1.getRepository(Alumnos_1.Alumnos).findOne(req.params.leg_alumno);
    try {
        if (!alumno) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un alumno con el legajo ${req.params.leg_alumno}`
            });
        }
        typeorm_1.getRepository(Alumnos_1.Alumnos).merge(alumno, req.body);
        const result = yield typeorm_1.getRepository(Alumnos_1.Alumnos).save(alumno);
        return res.status(201).json({
            ok: true,
            msg: 'Alumno actualizado exitosamente',
            result
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }
});
exports.updateAlumno = updateAlumno;
const deleteAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alumno = yield typeorm_1.getRepository(Alumnos_1.Alumnos).findOne(req.params.leg_alumno);
    try {
        if (!alumno) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un alumno con el legajo ${req.params.leg_alumno}`
            });
        }
        yield typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(Alumnos_1.Alumnos)
            .where('leg_alumno = :leg_alumno', { leg_alumno: req.params.leg_alumno })
            .execute();
        return res.status(201).json({
            ok: true,
            msg: 'Alumnos borrado exitosamente'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }
});
exports.deleteAlumno = deleteAlumno;
const getAlumnosByCodigoPostal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alumnos = yield typeorm_1.getRepository(Alumnos_1.Alumnos).find({ where: { cod_postal: req.params.cod_postal } });
    return res.status(201).json({
        ok: true,
        alumnos
    });
});
exports.getAlumnosByCodigoPostal = getAlumnosByCodigoPostal;
const getAlumnosByFechaDeNacimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alumnos = yield typeorm_1.getRepository(Alumnos_1.Alumnos).find({ where: { fecha_nac_alumno: typeorm_1.Like(`%${req.params.fecha_nac_alumno}%`) } });
    return res.status(201).json({
        ok: true,
        alumnos
    });
});
exports.getAlumnosByFechaDeNacimiento = getAlumnosByFechaDeNacimiento;
const getAlumnosByCiudadAndSangre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alumnos = yield typeorm_1.getRepository(Alumnos_1.Alumnos).find({ where: { cod_postal: req.params.cod_postal, grupo_sang_alumno: req.params.grupo_sang_alumno } });
    return res.status(201).json({
        ok: true,
        alumnos
    });
});
exports.getAlumnosByCiudadAndSangre = getAlumnosByCiudadAndSangre;
const getAlumnosByCalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dom_alumno } = req.params;
    const alumnos = yield typeorm_1.getRepository(Alumnos_1.Alumnos).find({ where: { dom_alumno: typeorm_1.Like(`${dom_alumno}%`) } });
    return res.status(200).json({
        ok: true,
        alumnos
    });
});
exports.getAlumnosByCalle = getAlumnosByCalle;
//# sourceMappingURL=alumno.controller.js.map