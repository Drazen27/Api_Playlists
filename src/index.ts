// src/index.js
import express, { Express, Request, Response,Router } from "express";
import dotenv from "dotenv";
import listaRoute from "./routes/listasRoute"
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from "../swagger.json";
var cors = require('cors')

dotenv.config();
// Configuración de CORS
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

// Middleware personalizado para permitir CORS con las opciones definidas
const allowCors = (req: Request, res: Response, next: () => void) => {
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


const app = express();
const port = process.env.PORT;
//const port = 3000;

app.use(allowCors);

app.use(express.json());

app.use("/api",cors(corsOptions),listaRoute);
app.use("/swagger-ui/index.html",swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;










