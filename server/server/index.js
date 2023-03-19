import express from "express";
const app = express();
import cors from 'cors';
const PORT = 8000;
import "./db/conn.js";
import router from "./router/routes.js";
  app.use(cors());
  app.use(express.json());
  app.use(router);
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
  });