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
const firebase_1 = require("../../firebase");
const router = express_1.default.Router();
// getAlllist
router.get('/listas/getAllLists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Realiza una consulta a Firestore para obtener todas las listas de reproducción
        const listasRef = firebase_1.db.collection('playlist');
        const snapshot = yield listasRef.get();
        if (snapshot.empty) {
            // Si no hay documentos en la colección, crea un objeto de respuesta y lo envía
            const response = {
                success: false,
                message: 'No se encontraron listas de reproducción',
                errorCode: 'NOT_FOUND',
                errorMessage: 'No hay documentos en la colección',
                data: [] // Asegúrate de incluir la propiedad data, aunque esté vacía
            };
            res.status(404).json(response);
        }
        else {
            // Si hay documentos, crea un array para almacenar los datos de cada documento
            const listas = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                const playlist = {
                    id: doc.id,
                    nombre: data.nombre,
                    id_usuario: data.id_usuario,
                    canciones: data.canciones,
                    estado: data.estado,
                    publico: data.publico
                };
                listas.push(playlist);
            });
            // Crea un objeto de respuesta y lo envía
            const response = {
                success: true,
                message: 'Listas de reproducción obtenidas correctamente',
                errorCode: '',
                errorMessage: '',
                data: listas
            };
            res.status(200).json(response);
        }
    }
    catch (error) {
        // Si ocurre un error, crea un objeto de respuesta y lo envía
        console.error('Error al obtener las listas de reproducción:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const response = {
            success: false,
            message: 'Error al obtener las listas de reproducción',
            errorCode: 'INTERNAL_ERROR',
            errorMessage,
            data: [] // Asegúrate de incluir la propiedad data, aunque esté vacía
        };
        res.status(500).json(response);
    }
}));
// Endpoint para obtener todas las listas de reproducción activas
router.get('/listas/getAllListsActive', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Realiza una consulta a Firestore para obtener todas las listas de reproducción activas
        const listasRef = firebase_1.db.collection('playlist')
            .where('estado', '==', true)
            .where('publico', '==', true);
        const snapshot = yield listasRef.get();
        if (snapshot.empty) {
            // Si no hay documentos en la colección, envía una respuesta de error 404
            const response = {
                success: false,
                message: 'No se encontraron listas de reproducción activas',
                errorCode: 'NOT_FOUND',
                errorMessage: 'No hay documentos en la colección',
                data: [] // Asegúrate de incluir la propiedad data, aunque esté vacía
            };
            res.status(404).json(response);
        }
        else {
            // Si hay documentos, crea un array para almacenar los datos de cada documento
            const listas = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                const playlist = {
                    id: doc.id,
                    nombre: data.nombre,
                    id_usuario: data.id_usuario,
                    canciones: data.canciones,
                    estado: data.estado,
                    publico: data.publico
                };
                listas.push(playlist);
            });
            // Envía una respuesta exitosa con las listas de reproducción activas
            const response = {
                success: true,
                message: 'Listas de reproducción activas obtenidas correctamente',
                errorCode: '',
                errorMessage: '',
                data: listas
            };
            res.status(200).json(response);
        }
    }
    catch (error) {
        // Si ocurre un error, envía una respuesta de error 500
        console.error('Error al obtener las listas de reproducción activas:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const response = {
            success: false,
            message: 'Error al obtener las listas de reproducción activas',
            errorCode: 'INTERNAL_ERROR',
            errorMessage,
            data: [] // Asegúrate de incluir la propiedad data, aunque esté vacía
        };
        res.status(500).json(response);
    }
}));
// Endpoint para obtener todas las listas de reproducción inactivas
router.get('/listas/getAllListsInactive', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Realiza una consulta a Firestore para obtener todas las listas de reproducción inactivas
        const listasRef = firebase_1.db.collection('playlist')
            .where('estado', '==', false)
            .where('publico', '==', true);
        const snapshot = yield listasRef.get();
        if (snapshot.empty) {
            // Si no hay documentos en la colección, envía una respuesta de error 404
            const response = {
                success: false,
                message: 'No se encontraron listas de reproducción inactivas',
                errorCode: 'NOT_FOUND',
                errorMessage: 'No hay documentos en la colección',
                data: [] // Asegúrate de incluir la propiedad data, aunque esté vacía
            };
            res.status(404).json(response);
        }
        else {
            // Si hay documentos, crea un array para almacenar los datos de cada documento
            const listas = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                const playlist = {
                    id: doc.id,
                    nombre: data.nombre,
                    id_usuario: data.id_usuario,
                    canciones: data.canciones,
                    estado: data.estado,
                    publico: data.publico
                };
                listas.push(playlist);
            });
            // Envía una respuesta exitosa con las listas de reproducción inactivas
            const response = {
                success: true,
                message: 'Listas de reproducción inactivas obtenidas correctamente',
                errorCode: '',
                errorMessage: '',
                data: listas
            };
            res.status(200).json(response);
        }
    }
    catch (error) {
        // Si ocurre un error, envía una respuesta de error 500
        console.error('Error al obtener las listas de reproducción inactivas:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const response = {
            success: false,
            message: 'Error al obtener las listas de reproducción inactivas',
            errorCode: 'INTERNAL_ERROR',
            errorMessage,
            data: [] // Asegúrate de incluir la propiedad data, aunque esté vacía
        };
        res.status(500).json(response);
    }
}));
// Define la ruta /listas/getList/:idList
router.get('/listas/getList/:idList', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idLista = req.params.idList;
        // Verifica si la lista de reproducción existe
        const listaSnapshot = yield firebase_1.db.collection('playlist').doc(idLista).get();
        if (!listaSnapshot.exists) {
            const response = {
                success: false,
                message: 'La lista de reproducción no existe',
                errorCode: 'NOT_FOUND',
                errorMessage: '',
                data: []
            };
            return res.status(404).json(response);
        }
        const data = listaSnapshot.data();
        const playlist = {
            id: idLista,
            nombre: (data === null || data === void 0 ? void 0 : data.nombre) || '',
            id_usuario: (data === null || data === void 0 ? void 0 : data.id_usuario) || '',
            canciones: (data === null || data === void 0 ? void 0 : data.canciones) || [],
            estado: (data === null || data === void 0 ? void 0 : data.estado) || false,
            publico: (data === null || data === void 0 ? void 0 : data.publico) || false
        };
        const response = {
            success: true,
            message: 'Lista de reproducción obtenida correctamente',
            errorCode: '',
            errorMessage: '',
            data: [playlist]
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Error al obtener la lista de reproducción:', error);
        const errorMessage = error instanceof Error ? error.message : '';
        const response = {
            success: false,
            message: 'Error al obtener la lista de reproducción',
            errorCode: 'INTERNAL_ERROR',
            errorMessage: errorMessage,
            data: []
        };
        res.status(500).json(response);
    }
}));
// Define la ruta /listas/getListsByName/:nombreLista
router.get('/listas/getListsByName/:nombreLista', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nombreLista = req.params.nombreLista;
        // Realiza una consulta a Firestore para encontrar las listas con el mismo nombre
        const querySnapshot = yield firebase_1.db.collection('playlist').where('nombre', '==', nombreLista).get();
        const listasEncontradas = [];
        // Iterar sobre los resultados de la consulta
        querySnapshot.forEach(doc => {
            const data = doc.data();
            const playlist = {
                id: doc.id,
                nombre: data.nombre,
                id_usuario: data.id_usuario,
                canciones: data.canciones,
                publico: data.publico,
                estado: data.estado
            };
            listasEncontradas.push(playlist);
        });
        // Verificar si se encontraron listas
        if (listasEncontradas.length === 0) {
            const response = {
                success: false,
                message: 'No se encontraron listas de reproducción con ese nombre',
                errorCode: 'NOT_FOUND',
                errorMessage: '',
                data: []
            };
            return res.status(404).json(response);
        }
        // Devolver las listas encontradas
        const response = {
            success: true,
            message: 'Listas de reproducción obtenidas correctamente',
            errorCode: '',
            errorMessage: '',
            data: listasEncontradas
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Error al obtener las listas de reproducción por nombre:', error);
        const errorMessage = error instanceof Error ? error.message : '';
        const response = {
            success: false,
            message: 'Error al obtener las listas de reproducción por nombre',
            errorCode: 'INTERNAL_ERROR',
            errorMessage: errorMessage,
            data: []
        };
        res.status(500).json(response);
    }
}));
router.get('/listas/getListsUserId/:idUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = req.params.idUser;
        // Realiza una consulta a Firestore para encontrar las listas con el mismo nombre
        const querySnapshot = yield firebase_1.db.collection('playlist')
            .where('id_usuario', '==', idUser)
            .where('estado', '==', true).get();
        const listasEncontradas = [];
        // Iterar sobre los resultados de la consulta
        querySnapshot.forEach(doc => {
            const data = doc.data();
            const playlist = {
                id: doc.id,
                nombre: data.nombre,
                id_usuario: data.id_usuario,
                canciones: data.canciones,
                publico: data.publico,
                estado: data.estado
            };
            listasEncontradas.push(playlist);
        });
        // Verificar si se encontraron listas
        if (listasEncontradas.length === 0) {
            const response = {
                success: false,
                message: 'No se encontraron listas de reproducción de ese usuario',
                errorCode: 'NOT_FOUND',
                errorMessage: '',
                data: []
            };
            return res.status(404).json(response);
        }
        // Devolver las listas encontradas
        const response = {
            success: true,
            message: 'Listas de reproducción obtenidas correctamente',
            errorCode: '',
            errorMessage: '',
            data: listasEncontradas
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Error al obtener las listas de reproducción por usuario:', error);
        const errorMessage = error instanceof Error ? error.message : '';
        const response = {
            success: false,
            message: 'Error al obtener las listas de reproducción por usuario',
            errorCode: 'INTERNAL_ERROR',
            errorMessage: errorMessage,
            data: []
        };
        res.status(500).json(response);
    }
}));
router.get('/listas/getListsUserIdInactive/:idUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = req.params.idUser;
        // Realiza una consulta a Firestore para encontrar las listas con el mismo nombre
        const querySnapshot = yield firebase_1.db.collection('playlist')
            .where('id_usuario', '==', idUser)
            .where('estado', '==', false).get();
        const listasEncontradas = [];
        // Iterar sobre los resultados de la consulta
        querySnapshot.forEach(doc => {
            const data = doc.data();
            const playlist = {
                id: doc.id,
                nombre: data.nombre,
                id_usuario: data.id_usuario,
                canciones: data.canciones,
                publico: data.publico,
                estado: data.estado
            };
            listasEncontradas.push(playlist);
        });
        // Verificar si se encontraron listas
        if (listasEncontradas.length === 0) {
            const response = {
                success: false,
                message: 'No se encontraron listas de reproducción de ese usuario',
                errorCode: 'NOT_FOUND',
                errorMessage: '',
                data: []
            };
            return res.status(404).json(response);
        }
        // Devolver las listas encontradas
        const response = {
            success: true,
            message: 'Listas de reproducción obtenidas correctamente',
            errorCode: '',
            errorMessage: '',
            data: listasEncontradas
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Error al obtener las listas de reproducción por usuario:', error);
        const errorMessage = error instanceof Error ? error.message : '';
        const response = {
            success: false,
            message: 'Error al obtener las listas de reproducción por usuario',
            errorCode: 'INTERNAL_ERROR',
            errorMessage: errorMessage,
            data: []
        };
        res.status(500).json(response);
    }
}));
//AddList
router.post('/listas/addList', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtén los datos del cuerpo de la solicitud
        const { nombre, id_usuario, publico, canciones } = req.body;
        // Valida los datos recibidos
        if (!nombre || !id_usuario || typeof publico !== 'boolean') {
            const response = {
                success: false,
                message: 'Los datos proporcionados son inválidos',
                errorCode: 'INVALID_DATA',
                errorMessage: '',
                data: []
            };
            return res.status(400).json(response);
        }
        // Crea una nueva lista de reproducción en Firestore
        const nuevaListaRef = yield firebase_1.db.collection('playlist').add({
            nombre,
            id_usuario,
            publico,
            canciones: canciones || [],
            estado: true
        });
        // Devuelve el ID de la nueva lista de reproducción
        const response = {
            success: true,
            message: 'Lista de reproducción agregada correctamente',
            errorCode: '',
            errorMessage: '',
            data: [{
                    id: nuevaListaRef.id,
                    nombre,
                    id_usuario,
                    publico,
                    canciones: canciones || [],
                    estado: true
                }]
        };
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Error al agregar la lista de reproducción:', error);
        const errorMessage = error instanceof Error ? error.message : '';
        const response = {
            success: false,
            message: 'Error al agregar la lista de reproducción',
            errorCode: 'INTERNAL_ERROR',
            errorMessage: errorMessage,
            data: []
        };
        res.status(500).json(response);
    }
}));
// Define la ruta /listas/addListWithSong
router.post('/listas/addListWithSong', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtén los datos del cuerpo de la solicitud
        const { nombre, id_usuario, publico, canciones } = req.body;
        // Valida los datos recibidos
        if (!nombre || !id_usuario || typeof publico !== 'boolean' || !canciones || !Array.isArray(canciones)) {
            const response = {
                success: false,
                message: 'Los datos proporcionados son inválidos',
                errorCode: 'INVALID_DATA',
                errorMessage: '',
                data: []
            };
            return res.status(400).json(response);
        }
        // Crea una nueva lista de reproducción en Firestore
        const nuevaListaRef = yield firebase_1.db.collection('playlist').add({
            nombre,
            id_usuario,
            publico,
            canciones,
            estado: true
        });
        // Devuelve el ID de la nueva lista de reproducción
        const response = {
            success: true,
            message: 'Lista de reproducción con canciones agregada correctamente',
            errorCode: '',
            errorMessage: '',
            data: [{
                    id: nuevaListaRef.id,
                    nombre,
                    id_usuario,
                    canciones,
                    estado: true,
                    publico
                }]
        };
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Error al agregar la lista de reproducción con canciones:', error);
        const errorMessage = error instanceof Error ? error.message : '';
        const response = {
            success: false,
            message: 'Error al agregar la lista de reproducción con canciones',
            errorCode: 'INTERNAL_ERROR',
            errorMessage: errorMessage,
            data: []
        };
        res.status(500).json(response);
    }
}));
router.post('/listas/addSongs/:idList', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtén el ID de la lista de reproducción desde los parámetros de la URL
        const idLista = req.params.idList;
        // Verifica si la lista de reproducción existe
        const listaSnapshot = yield firebase_1.db.collection('playlist').doc(idLista).get();
        if (!listaSnapshot.exists) {
            const response = {
                success: false,
                message: 'La lista de reproducción no existe',
                errorCode: 'NOT_FOUND',
                errorMessage: '',
                data: []
            };
            return res.status(404).json(response);
        }
        // Obtén las nuevas canciones desde el cuerpo de la solicitud
        const { canciones } = req.body;
        // Valida las nuevas canciones
        if (!canciones || !Array.isArray(canciones)) {
            const response = {
                success: false,
                message: 'Las canciones proporcionadas son inválidas',
                errorCode: 'INVALID_DATA',
                errorMessage: '',
                data: []
            };
            return res.status(400).json(response);
        }
        // Agrega las nuevas canciones a la lista de reproducción
        const listaData = listaSnapshot.data();
        yield firebase_1.db.collection('playlist').doc(idLista).update({
            canciones: [...listaData === null || listaData === void 0 ? void 0 : listaData.canciones, ...canciones]
        });
        // Envía una respuesta exitosa
        const response = {
            success: true,
            message: 'Canciones agregadas correctamente a la lista de reproducción',
            errorCode: '',
            errorMessage: '',
            data: [{
                    id: idLista,
                    nombre: listaData === null || listaData === void 0 ? void 0 : listaData.nombre,
                    id_usuario: listaData === null || listaData === void 0 ? void 0 : listaData.id_usuario,
                    canciones: [...listaData === null || listaData === void 0 ? void 0 : listaData.canciones, ...canciones],
                    estado: listaData === null || listaData === void 0 ? void 0 : listaData.estado,
                    publico: listaData === null || listaData === void 0 ? void 0 : listaData.publico
                }]
        };
        res.status(200).json(response);
    }
    catch (error) {
        // Si ocurre un error, envía una respuesta de error
        console.error('Error al agregar canciones a la lista de reproducción:', error);
        const errorMessage = error instanceof Error ? error.message : '';
        const response = {
            success: false,
            message: 'Error al agregar canciones a la lista de reproducción',
            errorCode: 'INTERNAL_ERROR',
            errorMessage,
            data: []
        };
        res.status(500).json(response);
    }
}));
// Define la ruta DELETE /listas/deleteCancion/:idLista/
router.delete('/listas/deleteSong/:idList/:idCancion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtén el ID de la lista de reproducción desde los parámetros de la URL
        const idLista = req.params.idList;
        const idCancion = req.params.idCancion;
        // Valida el ID de la canción
        if (!idCancion) {
            const response = {
                success: false,
                message: 'Los datos proporcionados son inválidos',
                errorCode: 'INVALID_DATA',
                errorMessage: '',
                data: []
            };
            return res.status(400).json(response);
        }
        // Verifica si la lista de reproducción existe
        const listaSnapshot = yield firebase_1.db.collection('playlist').doc(idLista).get();
        if (!listaSnapshot.exists) {
            const response = {
                success: false,
                message: 'La lista de reproducción no existe',
                errorCode: 'NOT_FOUND',
                errorMessage: '',
                data: []
            };
            return res.status(404).json(response);
        }
        // Verifica si la canción está presente en la lista de reproducción
        const listaData = listaSnapshot.data();
        if (!(listaData === null || listaData === void 0 ? void 0 : listaData.canciones.some((cancion) => cancion.id === idCancion))) {
            const response = {
                success: false,
                message: 'La canción no está presente en la lista de reproducción',
                errorCode: 'NOT_FOUND',
                errorMessage: '',
                data: []
            };
            return res.status(404).json(response);
        }
        // Elimina la canción de la lista de reproducción
        const nuevasCanciones = listaData.canciones.filter((cancion) => cancion.id !== idCancion);
        yield firebase_1.db.collection('playlist').doc(idLista).update({
            canciones: nuevasCanciones
        });
        // Envía una respuesta exitosa
        const response = {
            success: true,
            message: 'Canción eliminada correctamente de la lista de reproducción',
            errorCode: '',
            errorMessage: '',
            data: [{
                    id: idLista,
                    nombre: listaData.nombre,
                    id_usuario: listaData.id_usuario,
                    canciones: nuevasCanciones,
                    estado: listaData.estado,
                    publico: listaData.publico
                }]
        };
        res.status(200).json(response);
    }
    catch (error) {
        // Si ocurre un error, envía una respuesta de error
        console.error('Error al eliminar la canción de la lista de reproducción:', error);
        const errorMessage = error instanceof Error ? error.message : '';
        const response = {
            success: false,
            message: 'Error al eliminar la canción de la lista de reproducción',
            errorCode: 'INTERNAL_ERROR',
            errorMessage: errorMessage,
            data: []
        };
        res.status(500).json(response);
    }
}));
router.delete('/listas/deletePlaylist/:idList', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtén el ID de la lista de reproducción desde los parámetros de la URL
        const idLista = req.params.idList;
        // Verifica si la lista de reproducción existe
        const listaSnapshot = yield firebase_1.db.collection('playlist').doc(idLista).get();
        if (!listaSnapshot.exists) {
            const response = {
                success: false,
                message: 'La lista de reproducción no existe',
                errorCode: 'NOT_FOUND',
                errorMessage: '',
                data: []
            };
            return res.status(404).json(response);
        }
        // Elimina la lista de reproducción
        yield firebase_1.db.collection('playlist').doc(idLista).delete();
        // Envía una respuesta exitosa
        const response = {
            success: true,
            message: 'Lista de reproducción eliminada correctamente',
            errorCode: '',
            errorMessage: '',
            data: []
        };
        res.status(200).json(response);
    }
    catch (error) {
        // Si ocurre un error, envía una respuesta de error
        console.error('Error al eliminar la lista de reproducción:', error);
        const errorMessage = error instanceof Error ? error.message : '';
        const response = {
            success: false,
            message: 'Error al eliminar la lista de reproducción',
            errorCode: 'INTERNAL_ERROR',
            errorMessage: errorMessage,
            data: []
        };
        res.status(500).json(response);
    }
}));
//desactivarPlaylist
router.patch('/listas/deactivatePlaylist/:idList', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtén el ID de la lista de reproducción desde los parámetros de la URL
        const idLista = req.params.idList;
        // Verifica si la lista de reproducción existe
        const listaSnapshot = yield firebase_1.db.collection('playlist').doc(idLista).get();
        if (!listaSnapshot.exists) {
            const response = {
                success: false,
                message: 'La lista de reproducción no existe',
                errorCode: 'NOT_FOUND',
                errorMessage: '',
                data: []
            };
            return res.status(404).json(response);
        }
        // Cambia el campo 'estado' a false para desactivar la lista de reproducción
        yield firebase_1.db.collection('playlist').doc(idLista).update({
            estado: false
        });
        // Envía una respuesta exitosa con los datos actualizados
        const listaData = listaSnapshot.data();
        const updatedData = {
            id: idLista,
            nombre: (listaData === null || listaData === void 0 ? void 0 : listaData.nombre) || '',
            id_usuario: (listaData === null || listaData === void 0 ? void 0 : listaData.id_usuario) || '',
            canciones: (listaData === null || listaData === void 0 ? void 0 : listaData.canciones) || [],
            estado: false,
            publico: (listaData === null || listaData === void 0 ? void 0 : listaData.publico) || false
        };
        const response = {
            success: true,
            message: 'Lista de reproducción desactivada correctamente (estado actualizado a false)',
            errorCode: '',
            errorMessage: '',
            data: [updatedData]
        };
        res.status(200).json(response);
    }
    catch (error) {
        // Si ocurre un error, envía una respuesta de error
        console.error('Error al desactivar la lista de reproducción:', error);
        const errorMessage = error instanceof Error ? error.message : '';
        const response = {
            success: false,
            message: 'Error al desactivar la lista de reproducción',
            errorCode: 'INTERNAL_ERROR',
            errorMessage: errorMessage,
            data: []
        };
        res.status(500).json(response);
    }
}));
//Activar playlist
router.patch('/listas/activatePlaylist/:idList', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtén el ID de la lista de reproducción desde los parámetros de la URL
        const idLista = req.params.idList;
        // Verifica si la lista de reproducción existe
        const listaSnapshot = yield firebase_1.db.collection('playlist').doc(idLista).get();
        if (!listaSnapshot.exists) {
            const response = {
                success: false,
                message: 'La lista de reproducción no existe',
                errorCode: 'NOT_FOUND',
                errorMessage: '',
                data: []
            };
            return res.status(404).json(response);
        }
        // Cambia el campo 'estado' a true para activar la lista de reproducción
        yield firebase_1.db.collection('playlist').doc(idLista).update({
            estado: true
        });
        // Envía una respuesta exitosa con los datos actualizados
        const listaData = listaSnapshot.data();
        const updatedData = {
            id: idLista,
            nombre: (listaData === null || listaData === void 0 ? void 0 : listaData.nombre) || '',
            id_usuario: (listaData === null || listaData === void 0 ? void 0 : listaData.id_usuario) || '',
            canciones: (listaData === null || listaData === void 0 ? void 0 : listaData.canciones) || [],
            estado: true,
            publico: (listaData === null || listaData === void 0 ? void 0 : listaData.publico) || false
        };
        const response = {
            success: true,
            message: 'Lista de reproducción activada correctamente (estado actualizado a true)',
            errorCode: '',
            errorMessage: '',
            data: [updatedData]
        };
        res.status(200).json(response);
    }
    catch (error) {
        // Si ocurre un error, envía una respuesta de error
        console.error('Error al activar la lista de reproducción:', error);
        const errorMessage = error instanceof Error ? error.message : '';
        const response = {
            success: false,
            message: 'Error al activar la lista de reproducción',
            errorCode: 'INTERNAL_ERROR',
            errorMessage: errorMessage,
            data: []
        };
        res.status(500).json(response);
    }
}));
//Cambiar titulo
router.patch('/listas/updateTitle/:idList/:nombre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtén el ID de la lista de reproducción desde los parámetros de la URL
        const idLista = req.params.idList;
        // Obtén el nuevo título del cuerpo de la solicitud
        const nombre = req.params.nombre;
        // Valida los datos recibidos
        if (!nombre) {
            const response = {
                success: false,
                message: 'El título proporcionado es inválido',
                errorCode: 'INVALID_DATA',
                errorMessage: '',
                data: []
            };
            return res.status(400).json(response);
        }
        // Verifica si la lista de reproducción existe
        const listaSnapshot = yield firebase_1.db.collection('playlist').doc(idLista).get();
        if (!listaSnapshot.exists) {
            const response = {
                success: false,
                message: 'La lista de reproducción no existe',
                errorCode: 'NOT_FOUND',
                errorMessage: '',
                data: []
            };
            return res.status(404).json(response);
        }
        // Extrae los datos existentes de la lista de reproducción
        const listaData = listaSnapshot.data();
        // Actualiza el título de la lista de reproducción
        yield firebase_1.db.collection('playlist').doc(idLista).update({
            nombre
        });
        // Envía una respuesta exitosa con los datos actualizados
        const updatedData = {
            id: idLista,
            nombre,
            id_usuario: listaData === null || listaData === void 0 ? void 0 : listaData.id_usuario,
            canciones: listaData === null || listaData === void 0 ? void 0 : listaData.canciones,
            estado: listaData === null || listaData === void 0 ? void 0 : listaData.estado,
            publico: listaData === null || listaData === void 0 ? void 0 : listaData.publico,
        };
        const response = {
            success: true,
            message: 'Título de la lista de reproducción actualizado correctamente',
            errorCode: '',
            errorMessage: '',
            data: [updatedData]
        };
        res.status(200).json(response);
    }
    catch (error) {
        // Si ocurre un error, envía una respuesta de error
        console.error('Error al actualizar el título de la lista de reproducción:', error);
        const errorMessage = error instanceof Error ? error.message : '';
        const response = {
            success: false,
            message: 'Error al actualizar el título de la lista de reproducción',
            errorCode: 'INTERNAL_ERROR',
            errorMessage: errorMessage,
            data: []
        };
        res.status(500).json(response);
    }
}));
//Cambiar estado publico
router.patch('/listas/updatePublic/:idList/:publico', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtén el ID de la lista de reproducción desde los parámetros de la URL
        const idLista = req.params.idList;
        // Obtén el nuevo valor de 'publico' del cuerpo de la solicitud
        const publico = JSON.parse(req.params.publico.toLowerCase());
        // Valida los datos recibidos
        if (typeof publico !== 'boolean') {
            const response = {
                success: false,
                message: 'El valor proporcionado para "publico" es inválido',
                errorCode: 'INVALID_DATA',
                errorMessage: '',
                data: []
            };
            return res.status(400).json(response);
        }
        // Verifica si la lista de reproducción existe
        const listaSnapshot = yield firebase_1.db.collection('playlist').doc(idLista).get();
        if (!listaSnapshot.exists) {
            const response = {
                success: false,
                message: 'La lista de reproducción no existe',
                errorCode: 'NOT_FOUND',
                errorMessage: '',
                data: []
            };
            return res.status(404).json(response);
        }
        // Extrae los datos existentes de la lista de reproducción
        const listaData = listaSnapshot.data();
        if (!listaData) {
            const response = {
                success: false,
                message: 'Error al obtener los datos de la lista de reproducción',
                errorCode: 'DATA_NOT_FOUND',
                errorMessage: '',
                data: []
            };
            return res.status(500).json(response);
        }
        // Actualiza el campo 'publico' de la lista de reproducción
        yield firebase_1.db.collection('playlist').doc(idLista).update({
            publico
        });
        // Envía una respuesta exitosa con los datos actualizados
        const updatedData = {
            id: idLista,
            nombre: listaData.nombre,
            id_usuario: listaData.id_usuario,
            canciones: listaData.canciones,
            estado: listaData.estado,
            publico,
        };
        const response = {
            success: true,
            message: 'Campo "publico" de la lista de reproducción actualizado correctamente',
            errorCode: '',
            errorMessage: '',
            data: [updatedData]
        };
        res.status(200).json(response);
    }
    catch (error) {
        // Si ocurre un error, envía una respuesta de error
        console.error('Error al actualizar el campo "publico" de la lista de reproducción:', error);
        const errorMessage = error instanceof Error ? error.message : '';
        const response = {
            success: false,
            message: 'Error al actualizar el campo "publico" de la lista de reproducción',
            errorCode: 'INTERNAL_ERROR',
            errorMessage: errorMessage,
            data: []
        };
        res.status(500).json(response);
    }
}));
exports.default = router;
