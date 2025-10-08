import express, { Router} from "express";
import * as taskController from "../controllers/taskController"

const router: Router = express.Router();

router.post("/", taskController.createTask);
router.delete("/:id", taskController.deleteTask);

export default router;