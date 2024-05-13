import express, { Request, Response, Router } from 'express';
import { db } from '../../firebase';

const router: Router = express.Router();

// Define la ruta /listas/getAllListas
router.get('/listas/getAllLists', async (req: Request, res: Response) => {
  try {
    // Realiza una consulta a Firestore para obtener todas las listas de reproducción
    const listasRef = db.collection('playlist');
    const snapshot = await listasRef.get();

    if (snapshot.empty) {
      // Si no hay documentos en la colección, devuelve un código de estado 404
      res.sendStatus(404);
    } else {
      // Si hay documentos, crea un array para almacenar los datos de cada documento
      const listas: any[] = [];
      snapshot.forEach(doc => {
        listas.push({
          id: doc.id,
          ...doc.data()
        });
      });
      // Envía la lista de reproducción como respuesta
      res.status(200).json(listas);
    }
  } catch (error) {
    // Si ocurre un error, envía una respuesta de error
    console.error('Error al obtener las listas de reproducción:', error);
    res.status(500).json({ error: 'Error al obtener las listas de reproducción' });
  }
});


router.post('/listas/addListWithSong', async (req: Request, res: Response) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { nombre, id_usuario, publico, canciones } = req.body;

    // Valida los datos recibidos
    if (!nombre || !id_usuario || typeof publico !== 'boolean' || !canciones || !Array.isArray(canciones)) {
      return res.status(400).json({ error: 'Los datos proporcionados son inválidos' });
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
    res.status(201).json({ id: nuevaListaRef.id });
  } catch (error) {
    // Si ocurre un error, envía una respuesta de error
    console.error('Error al agregar la lista de reproducción:', error);
    res.status(500).json({ error: 'Error al agregar la lista de reproducción' });
  }
});

router.post('/listas/addList', async (req: Request, res: Response) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { nombre, id_usuario, publico } = req.body;

    // Valida los datos recibidos
    if (!nombre || !id_usuario || typeof publico !== 'boolean') {
      return res.status(400).json({ error: 'Los datos proporcionados son inválidos' });
    }

    // Crea una nueva lista de reproducción en Firestore
    const nuevaListaRef = await db.collection('playlist').add({
      nombre,
      id_usuario,
      publico,
      canciones: [],
      estado: true
    });

    // Devuelve el ID de la nueva lista de reproducción
    res.status(201).json({ id: nuevaListaRef.id });
  } catch (error) {
    // Si ocurre un error, envía una respuesta de error
    console.error('Error al agregar la lista de reproducción:', error);
    res.status(500).json({ error: 'Error al agregar la lista de reproducción' });
  }
});


router.post('/listas/addSongs/:idList', async (req: Request, res: Response) => {
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
router.delete('/listas/deleteSong/:idList', async (req: Request, res: Response) => {
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