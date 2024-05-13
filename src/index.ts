// src/index.js
import express, { Express, Request, Response,Router } from "express";
import dotenv from "dotenv";
import usersRoute from "./routes/listas"
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
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
};


const app = express();
const port = process.env.PORT;

app.use(allowCors);

app.use(express.json());

app.use("/api",cors(corsOptions),usersRoute);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;










