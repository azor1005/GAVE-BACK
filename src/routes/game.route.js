import {Router} from "express";
import {authMiddleware} from "../middlewares/auth.middleware.js"
const router = Router();

import {create, findAll, createReview, topTree, searchAll, findById} from "../controllers/game.controller.js"

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/search", searchAll)
router.get("/:_id", findById)
router.get("/top/:plataform", topTree);
router.put("/review/:_id", authMiddleware, createReview)

export default router;