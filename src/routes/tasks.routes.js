import { Router } from "express";
import { authRequires } from "../middlewares/validateToken.js";
import {getTasks,getTask,register,update,destroy} from '../controllers/tasks.controller.js';

const router = Router()


router.get('/tasks', authRequires, getTasks)
router.get('/tasks/:id', authRequires, getTask)
router.post('/tasks', authRequires, register)
router.put('/tasks/:id', authRequires, update)
router.delete('/tasks/:id', authRequires, destroy)


export default router;