import {Router} from "express";
import {authMiddleware} from "../middlewares/auth.middleware.js"
const router = Router();

import {create, findAll, createReview, topTree, searchAll} from "../controllers/game.controller.js"

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top/:plataform", topTree);
router.get("/search", searchAll)
router.put("/review/:_id", authMiddleware, createReview)

export default router;