import express from "express";
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";

import userRoute from "./src/routes/user.route.js"
import authRoute from "./src/routes/auth.route.js"
import gameRoute from "./src/routes/game.route.js"
import cors from 'cors'

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
connectDatabase();

app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/game", gameRoute);
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));