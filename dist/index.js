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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const index_routes_1 = require("./routes/index.routes");
const Alumnos_1 = require("./entity/Alumnos");
const path_1 = __importDefault(require("path"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    yield typeorm_1.createConnection({
        type: 'mysql',
        database: 'tec5',
        url: (app.get('env') === 'development') ? '' : process.env.DATABASE_URL,
        username: 'ivan',
        password: '',
        entities: [Alumnos_1.Alumnos],
        synchronize: true
    });
    const PORT = process.env.PORT || 4000;
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(cors_1.default());
    app.use(index_routes_1.app);
    app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });
});
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map