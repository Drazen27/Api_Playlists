"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const listasRoute_1 = __importDefault(require("./routes/listasRoute"));
const algoritmoRoute_1 = __importDefault(require("./routes/algoritmoRoute"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger/swagger.json"));
const auth_1 = require("./auth");
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
var cors = require('cors');
dotenv_1.default.config();
// Configuración de CORS
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
// Middleware personalizado para permitir CORS con las opciones definidas
const allowCors = (req, res, next) => {
    // Permite solicitudes desde cualquier origen
    res.header('Access-Control-Allow-Origin', '*');
    // Define otros encabezados permitidos
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Define métodos permitidos
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
};
const app = (0, express_1.default)();
const port = process.env.PORT;
//const port = 3000;
app.use(allowCors);
app.use(express_1.default.json());
app.use("/api/listas", cors(corsOptions), auth_1.authenticateJWT, listasRoute_1.default);
app.use("/api/algoritmo", cors(corsOptions), algoritmoRoute_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.get("/swagger.json", (req, res) => {
    res.json(swagger_json_1.default);
});
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
