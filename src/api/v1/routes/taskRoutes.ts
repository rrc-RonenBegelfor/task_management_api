import express, { Router} from "express";
import * as branchController from "../controllers/taskController";

const router: Router = express.Router();

router.post("/", createTask);

export default router;