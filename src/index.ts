// src/index.js
import express, { Express, Request, Response,Router } from "express";
import dotenv from "dotenv";
import usersRoute from "./routes/listas"
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from "../swagger.json";


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api",usersRoute);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;










