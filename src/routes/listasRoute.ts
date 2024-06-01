import express, { Request, Response, Router } from 'express';
import { db } from '../../firebase';
const router: Router = express.Router();
import {Playlist} from '../models/playlist';
import {PlaylistResponse} from '../dataContract/response/playlistResponse';
import { PlaylistRequest } from '../dataContract/request/playlistRequest';

// getAlllist
router.get('/listas/getAllLists', async (req: Request, res: Response) => {
  try {
    // Realiza una consulta a Firestore para obtener todas las listas de reproducción
    const listasRef = db.collection('playlist');
    const snapshot = await listasRef.get();

    if (snapshot.empty) {
      // Si no hay documentos en la colección, crea un objeto de respuesta y lo envía
      const response: PlaylistResponse = {
        success: false,
        message: 'No se encontraron listas de reproducción',
        errorCode: 'NOT_FOUND',
        errorMessage: 'No hay documentos en la colección',
        data: []  // Asegúrate de incluir la propiedad data, aunque esté vacía
      };
      res.status(404).json(response);
    } else {
      // Si hay documentos, crea un array para almacenar los datos de cada documento
      const listas: Playlist[] = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        const playlist: Playlist = {
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
      const response: PlaylistResponse = {
        success: true,
        message: 'Listas de reproducción obtenidas correctamente',
        errorCode:'',
        errorMessage:'',
        data: listas
      };
      res.status(200).json(response);
    }
  } catch (error) {
    // Si ocurre un error, crea un objeto de respuesta y lo envía
    console.error('Error al obtener las listas de reproducción:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const response: PlaylistResponse = {
      success: false,
      message: 'Error al obtener las listas de reproducción',
      errorCode: 'INTERNAL_ERROR',
      errorMessage,
      data: []  // Asegúrate de incluir la propiedad data, aunque esté vacía
    };
    res.status(500).json(response);
  }
});

// Define la ruta /listas/getList/:idList
router.get('/listas/getList/:idList', async (req: Request, res: Response) => {
  try {
    const idLista: string = req.params.idList;

    // Verifica si la lista de reproducción existe
    const listaSnapshot = await db.collection('playlist').doc(idLista).get();
    if (!listaSnapshot.exists) {
      const response: PlaylistResponse = {
        success: false,
        message: 'La lista de reproducción no existe',
        errorCode: 'NOT_FOUND',
        errorMessage: '',
        data: []
      };
      return res.status(404).json(response);
    }

    const data = listaSnapshot.data();
    const playlist: Playlist = {
      id: idLista,
      nombre: data?.nombre || '',
      id_usuario: data?.id_usuario || '',
      canciones: data?.canciones || [],
      estado: data?.estado || false,
      publico: data?.publico || false
    };

    const response: PlaylistResponse = {
      success: true,
      message: 'Lista de reproducción obtenida correctamente',
      errorCode: '',
      errorMessage: '',
      data: [playlist]
    };
    res.status(200).json(response);
  } catch (error) {
    console.error('Error al obtener la lista de reproducción:', error);
    const errorMessage = error instanceof Error ? error.message : '';
    const response: PlaylistResponse = {
      success: false,
      message: 'Error al obtener la lista de reproducción',
      errorCode: 'INTERNAL_ERROR',
      errorMessage: errorMessage,
      data: []
    };
    res.status(500).json(response);
  }
});

// Define la ruta /listas/getListsByName/:nombreLista
router.get('/listas/getListsByName/:nombreLista', async (req: Request, res: Response) => {
  try {
    const nombreLista: string = req.params.nombreLista;

    // Realiza una consulta a Firestore para encontrar las listas con el mismo nombre
    const querySnapshot = await db.collection('playlist').where('nombre', '==', nombreLista).get();

    const listasEncontradas: Playlist[] = [];

    // Iterar sobre los resultados de la consulta
    querySnapshot.forEach(doc => {
      const data = doc.data();
      const playlist: Playlist = {
        id: doc.id,
        nombre: data.nombre,
        id_usuario: data.id_usuario,
        publico: data.publico,
        canciones: data.canciones,
        estado: data.estado
      };
      listasEncontradas.push(playlist);
    });

    // Verificar si se encontraron listas
    if (listasEncontradas.length === 0) {
      const response: PlaylistResponse = {
        success: false,
        message: 'No se encontraron listas de reproducción con ese nombre',
        errorCode: 'NOT_FOUND',
        errorMessage: '',
        data: []
      };
      return res.status(404).json(response);
    }

    // Devolver las listas encontradas
    const response: PlaylistResponse = {
      success: true,
      message: 'Listas de reproducción obtenidas correctamente',
      errorCode: '',
      errorMessage: '',
      data: listasEncontradas
    };
    res.status(200).json(response);

  } catch (error) {
    console.error('Error al obtener las listas de reproducción por nombre:', error);
    const errorMessage = error instanceof Error ? error.message : '';
    const response: PlaylistResponse = {
      success: false,
      message: 'Error al obtener las listas de reproducción por nombre',
      errorCode: 'INTERNAL_ERROR',
      errorMessage: errorMessage,
      data: []
    };
    res.status(500).json(response);
  }
});

router.get('/listas/getList/:nombreList', async (req: Request, res: Response) => {
  try {
    // Realiza una consulta a Firestore para obtener todas las listas de reproducción
    const idLista: string = req.params.nombreList;

    // Verifica si la lista de reproducción existe
    const listaSnapshot:any = await db.collection('playlist').doc(idLista).get();
    if (!listaSnapshot.exists) {
      return res.status(404).json({ error: 'La lista de reproducción no existe' });
    }

    res.status(200).json(listaSnapshot.data());
    
  } catch (error) {
    console.error('Error al obtener las listas de reproducción:', error);
    res.status(500).json({ error: 'Error al obtener las listas de reproducción' });
  }
});
//AddList
router.post('/listas/addList', async (req: Request, res: Response) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { nombre, id_usuario, publico, canciones }: PlaylistRequest = req.body;

    // Valida los datos recibidos
    if (!nombre || !id_usuario || typeof publico !== 'boolean') {
      const response: PlaylistResponse = {
        success: false,
        message: 'Los datos proporcionados son inválidos',
        errorCode: 'INVALID_DATA',
        errorMessage: '',
        data: []
      };
      return res.status(400).json(response);
    }

    // Crea una nueva lista de reproducción en Firestore
    const nuevaListaRef = await db.collection('playlist').add({
      nombre,
      id_usuario,
      publico,
      canciones: canciones || [],
      estado: true
    });

    // Devuelve el ID de la nueva lista de reproducción
    const response: PlaylistResponse = {
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
  } catch (error) {
    console.error('Error al agregar la lista de reproducción:', error);
    const errorMessage = error instanceof Error ? error.message : '';
    const response: PlaylistResponse = {
      success: false,
      message: 'Error al agregar la lista de reproducción',
      errorCode: 'INTERNAL_ERROR',
      errorMessage: errorMessage,
      data: []
    };
    res.status(500).json(response);
  }
});

// Define la ruta /listas/addListWithSong
router.post('/listas/addListWithSong', async (req: Request, res: Response) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { nombre, id_usuario, publico, canciones }: PlaylistRequest = req.body;

    // Valida los datos recibidos
    if (!nombre || !id_usuario || typeof publico !== 'boolean' || !canciones || !Array.isArray(canciones)) {
      const response: PlaylistResponse = {
        success: false,
        message: 'Los datos proporcionados son inválidos',
        errorCode: 'INVALID_DATA',
        errorMessage: '',
        data: []
      };
      return res.status(400).json(response);
    }

    // Crea una nueva lista de reproducción en Firestore
    const nuevaListaRef = await db.collection('playlist').add({
      nombre,
      id_usuario,
      publico,
      canciones,
      estado: true
    });

    // Devuelve el ID de la nueva lista de reproducción
    const response: PlaylistResponse = {
      success: true,
      message: 'Lista de reproducción con canciones agregada correctamente',
      errorCode: '',
      errorMessage: '',
      data: [{ id: nuevaListaRef.id }]
    };
    res.status(201).json(response);
  } catch (error) {
    console.error('Error al agregar la lista de reproducción con canciones:', error);
    const errorMessage = error instanceof Error ? error.message : '';
    const response: PlaylistResponse = {
      success: false,
      message: 'Error al agregar la lista de reproducción con canciones',
      errorCode: 'INTERNAL_ERROR',
      errorMessage: errorMessage,
      data: []
    };
    res.status(500).json(response);
  }
});




router.post('/listas/addSongs/:idList',async (req: Request, res: Response) => {
  try {
    // Obtén el ID de la lista de reproducción desde los parámetros de la URL
    const idLista: string = req.params.idList;

    // Verifica si la lista de reproducción existe
    const listaSnapshot:any = await db.collection('playlist').doc(idLista).get();
    if (!listaSnapshot.exists) {
      return res.status(404).json({ error: 'La lista de reproducción no existe' });
    }

    // Obtén las nuevas canciones desde el cuerpo de la solicitud
    const { canciones } = req.body;

    // Valida las nuevas canciones
    if (!canciones || !Array.isArray(canciones)) {
      return res.status(400).json({ error: 'Las canciones proporcionadas son inválidas' });
    }

    // Agrega las nuevas canciones a la lista de reproducción
    await db.collection('playlist').doc(idLista).update({
      canciones: [...listaSnapshot.data().canciones, ...canciones]
    });

    // Envía una respuesta exitosa
    res.status(200).json({ message: 'Canciones agregadas correctamente a la lista de reproducción' });
  } catch (error) {
    // Si ocurre un error, envía una respuesta de error
    console.error('Error al agregar canciones a la lista de reproducción:', error);
    res.status(500).json({ error: 'Error al agregar canciones a la lista de reproducción' });
  }
});

// Define la ruta DELETE /listas/deleteCancion/:idLista/
router.delete('/listas/deleteSong/:idList',async (req: Request, res: Response) => {
  try {
    // Obtén el ID de la lista de reproducción y el ID de la canción desde los parámetros de la URL
    const idLista: string = req.params.idList;
    const { idCancion }: { idCancion: string } = req.body;

    if (!idCancion) {
      return res.status(400).json({ error: 'Los datos proporcionados son inválidos' });
    }

    // Verifica si la lista de reproducción existe
    const listaSnapshot:any = await db.collection('playlist').doc(idLista).get();
    if (!listaSnapshot.exists) {
      return res.status(404).json({ error: 'La lista de reproducción no existe' });
    }

    // Verifica si la canción está presente en la lista de reproducción
    const listaData = listaSnapshot.data();
    if (!listaData.canciones.includes(idCancion)) {
      return res.status(404).json({ error: 'La canción no está presente en la lista de reproducción' });
    }

    // Elimina la canción de la lista de reproducción
    await db.collection('playlist').doc(idLista).update({
      canciones: listaData.canciones.filter((cancionId: string) => cancionId !== idCancion)
    });

    // Envía una respuesta exitosa
    res.status(200).json({ message: 'Canción eliminada correctamente de la lista de reproducción' });
  } catch (error) {
    // Si ocurre un error, envía una respuesta de error
    console.error('Error al eliminar la canción de la lista de reproducción:', error);
    res.status(500).json({ error: 'Error al eliminar la canción de la lista de reproducción' });
  }
});

export default router;