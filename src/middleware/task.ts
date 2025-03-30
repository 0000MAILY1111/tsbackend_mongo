import { Request, Response, NextFunction } from 'express';
import Project, {  } from '../models/Project';
import Task, { Itask } from '../models/Task';


declare global {
    namespace Express {
        interface Request {
            task: Itask
        }
        
    }
}
export async function TaskExists ( req: Request, res: Response, next: NextFunction) {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) {
            const error = new Error("proyecto no encontrado");
            res.status(404).json({ error: error.message });
        }
        req.task = task 
        next ()

    } catch (error) {
        res.status (500).json({error : "Error en el servidor"});


    }

}

export async function taskBelongsToProject ( req: Request, res: Response, next: NextFunction) {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId).populate("project");
        if (!task) {
            const error = new Error("proyecto no encontrado");
            res.status(404).json({ error: error.message });
        }
        if (task.project._id.toString() !== req.project.id) {
            const error = new Error("No tienes permiso para ver esta tarea");
            return res.status(400).json({ error: error.message });
        }
        req.task = task 
        next ()

    } catch (error) {
        res.status (500).json({error : "Error en el servidor"});


    }

}
