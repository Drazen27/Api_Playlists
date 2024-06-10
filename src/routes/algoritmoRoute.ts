import express, { Request, Response, Router } from 'express';
import axios from 'axios';
const router: Router = express.Router();

interface EstadoGlobal {
    marcadorRecibido: boolean;
    mensajesEnTransito: string[];
    canalesMarcador: Set<string>;
    estadoLocal: string | null;
  }
  
  const estadoGlobal: EstadoGlobal = {
    marcadorRecibido: false,
    mensajesEnTransito: [],
    canalesMarcador: new Set<string>(),
    estadoLocal: null,
  };
  
  router.post('/iniciar', async (req: Request, res: Response) => {
    try {
      grabarEstadoLocal();
      await enviarMarcadorATodos();
      res.status(200).send("Algoritmo iniciado");
    } catch (error) {
      res.status(500).send("Error al iniciar el algoritmo");
    }
  });
  
  router.post('/recibirMarcador', async (req: Request, res: Response) => {
    const from = req.query.from as string;
    if (!from) {
      return res.status(400).send("Parámetro 'from' es requerido");
    }
  
    try {
      if (!estadoGlobal.marcadorRecibido) {
        grabarEstadoLocal();
        estadoGlobal.marcadorRecibido = true;
        await enviarMarcadorATodos();
      }
      estadoGlobal.canalesMarcador.add(from);
      if (todosMarcadoresRecibidos()) {
        completarEstadoGlobal();
      }
      res.status(200).send("Marcador recibido");
    } catch (error) {
      res.status(500).send("Error al recibir el marcador");
    }
  });
  
  router.post('/recibirMensaje', (req: Request, res: Response) => {
    const mensaje = req.query.mensaje as string;
    const from = req.query.from as string;
  
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
  
  async function enviarMarcadorATodos() {
    const otrosMicroservicios = ['https://www.andsoundapi.somee.com/api/algoritmo/recibirMarcador', 'https://apilikesandino.onrender.com/api/algoritmo/recibirMarcador'];
    console.log(otrosMicroservicios);
    const promises = otrosMicroservicios.map(url =>
      axios.post(url, null, { params: { from: 'express' } })
      
    );
    console.log(promises);
    await Promise.all(promises);
    
  }
  
  function todosMarcadoresRecibidos(): boolean {
    // Aquí asumimos que sabemos cuántos microservicios hay.
    return estadoGlobal.canalesMarcador.size === 2;
  }
  
  function completarEstadoGlobal() {
    console.log("Estado global completado con mensajes en tránsito: " + estadoGlobal.mensajesEnTransito);
  }

export default router;