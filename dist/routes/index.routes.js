"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = express_1.default();
const alumno_routes_1 = require("./alumno.routes");
exports.app.use('/api/alumnos', alumno_routes_1.router);
//# sourceMappingURL=index.routes.js.map