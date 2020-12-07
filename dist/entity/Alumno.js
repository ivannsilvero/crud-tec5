"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alumno = void 0;
const typeorm_1 = require("typeorm");
let Alumno = class Alumno {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Alumno.prototype, "leg_alumno", void 0);
__decorate([
    typeorm_1.Column('char', { length: 50, nullable: false }),
    __metadata("design:type", String)
], Alumno.prototype, "apyn_alumno", void 0);
__decorate([
    typeorm_1.Column('char', { length: 50, nullable: false }),
    __metadata("design:type", String)
], Alumno.prototype, "dom_alumno", void 0);
__decorate([
    typeorm_1.Column('int', { nullable: false }),
    __metadata("design:type", Number)
], Alumno.prototype, "cod_postal", void 0);
__decorate([
    typeorm_1.Column('date', { nullable: false }),
    __metadata("design:type", String)
], Alumno.prototype, "fecha_nac_alumno", void 0);
__decorate([
    typeorm_1.Column('char', { length: 50, nullable: false }),
    __metadata("design:type", String)
], Alumno.prototype, "email_alumno", void 0);
__decorate([
    typeorm_1.Column('char', { length: 50, nullable: false }),
    __metadata("design:type", String)
], Alumno.prototype, "grupo_sang_alumno", void 0);
__decorate([
    typeorm_1.Column('char', { length: 50, nullable: false }),
    __metadata("design:type", String)
], Alumno.prototype, "tel_fijo_alumno", void 0);
__decorate([
    typeorm_1.Column('char', { length: 50, nullable: false }),
    __metadata("design:type", String)
], Alumno.prototype, "tel_movil_alumno", void 0);
__decorate([
    typeorm_1.Column('double', { nullable: false }),
    __metadata("design:type", Number)
], Alumno.prototype, "dni_alumno", void 0);
Alumno = __decorate([
    typeorm_1.Entity()
], Alumno);
exports.Alumno = Alumno;
//# sourceMappingURL=Alumno.js.map