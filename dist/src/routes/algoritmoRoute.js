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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
const estadoGlobal = {
    marcadorRecibido: false,
    mensajesEnTransito: [],
    canalesMarcador: new Set(),
    estadoLocal: null,
};
router.post('/iniciar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        grabarEstadoLocal();
        yield enviarMarcadorATodos();
        res.status(200).send("Algoritmo iniciado");
    }
    catch (error) {
        res.status(500).send("Error al iniciar el algoritmo");
    }
}));
router.post('/recibirMarcador', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const from = req.query.from;
    if (!from) {
        return res.status(400).send("Parámetro 'from' es requerido");
    }
    try {
        if (!estadoGlobal.marcadorRecibido) {
            grabarEstadoLocal();
            estadoGlobal.marcadorRecibido = true;
            yield enviarMarcadorATodos();
        }
        estadoGlobal.canalesMarcador.add(from);
        if (todosMarcadoresRecibidos()) {
            completarEstadoGlobal();
        }
        res.status(200).send("Marcador recibido");
    }
    catch (error) {
        res.status(500).send("Error al recibir el marcador");
    }
}));
router.post('/recibirMensaje', (req, res) => {
    const mensaje = req.query.mensaje;
    const from = req.query.from;
    if (!mensaje || !from) {
        return res.status(400).send("Parámetros 'mensaje' y 'from' son requeridos");
    }
    if (estadoGlobal.marcadorRecibido && !estadoGlobal.canalesMarcador.has(from)) {
        estadoGlobal.mensajesEnTransito.push(mensaje);
    }
    res.status(200).send("Mensaje recibido");
});
function grabarEstadoLocal() {
    estadoGlobal.estadoLocal = "Estado del proceso en Express.js";
    console.log("Estado local grabado: " + estadoGlobal.estadoLocal);
}
function enviarMarcadorATodos() {
    return __awaiter(this, void 0, void 0, function* () {
        const otrosMicroservicios = ['https://www.andsoundapi.somee.com/api/algoritmo/recibirMarcador', 'https://apilikesandino.onrender.com/api/algoritmo/recibirMarcador'];
        console.log(otrosMicroservicios);
        const promises = otrosMicroservicios.map(url => axios_1.default.post(url, null, { params: { from: 'express' } }));
        console.log(promises);
        yield Promise.all(promises);
    });
}
function todosMarcadoresRecibidos() {
    // Aquí asumimos que sabemos cuántos microservicios hay.
    return estadoGlobal.canalesMarcador.size === 2;
}
function completarEstadoGlobal() {
    console.log("Estado global completado con mensajes en tránsito: " + estadoGlobal.mensajesEnTransito);
}
exports.default = router;
