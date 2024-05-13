// src/index.js
import express, { Express, Request, Response,Router } from "express";
import dotenv from "dotenv";
import usersRoute from "./routes/listas"
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from "../swagger.json";
var cors = require('cors')

dotenv.config();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const app = express();
const port = process.env.PORT;

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api",cors(),usersRoute);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;










