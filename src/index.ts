// src/index.js
import express, { Express, Request, Response,Router } from "express";
import dotenv from "dotenv";
import listaRoute from "./routes/listasRoute"
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from "./swagger/swagger.json";
import swaggerJsDoc from "swagger-jsdoc";
import path from "path";
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";

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
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "https://nodejs-swagger-api.vercel.app/",
        description: "My API Documentation",
      },
    ],
  },
  path:["src/swagger/swagger.json"],
  // This is to call all the file
  apis: ["src/**/*.ts"],
};
const specs = swaggerJsDoc(options);
const app = express();
const port = process.env.PORT;
//const port = 3000;

app.use(allowCors);

app.use(express.json());


app.use("/api",cors(corsOptions),listaRoute);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs));

app.get("/swagger.json", (req: Request, res: Response) => {
  res.json(swaggerDocument);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;










