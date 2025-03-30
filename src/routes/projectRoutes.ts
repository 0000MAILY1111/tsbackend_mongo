import { Router } from "express";

import { ProjectController } from "../controllers/ProjectControllers";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import Project from "../models/Project";
import { TaskController } from "../controllers/TasksControllers";
import { ProjectExists } from "../middleware/project";
import { taskBelongsToProject } from "../middleware/task";


const router = Router();

router.param ("projectId", ProjectExists)


router.post("/",
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es requerido'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es requerido'),
    body('description')
        .notEmpty().withMessage('La descripción del proyecto es requerida'),
    handleInputErrors,
    ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get("/:id",
    param('id').isMongoId().withMessage('El id del proyecto no es válido'),
    handleInputErrors,
    ProjectController.getAllProjects);

router.put("/:id",
    param('id').isMongoId().withMessage('El id del proyecto no es válido'),
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es requerido'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es requerido'),
    body('description')
        .notEmpty().withMessage('La descripción del proyecto es requerida'),
    handleInputErrors,
    ProjectController.getAllProjects);

router.delete("/:id",
    param('id').isMongoId().withMessage('El id del proyecto no es válido'),
    handleInputErrors,
    ProjectController.deleteProject);

router.param ("projectId", ProjectExists)
router.param ("taskId", taskBelongsToProject)

///routes 
///para las tareas
router.post("/:projectId/tasks",
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es requerido'),
    body('description')
        .notEmpty().withMessage('La descripción de la tarea es requerida'),
    handleInputErrors,
    TaskController.createProject
)

router.get ("/:projectId/tasks",
    TaskController.getProjectTasks
)

router.get ("/ :taskId/tasks",
    param ("taskId").isMongoId().withMessage("El id de la tarea no es valido"),
    handleInputErrors,
    TaskController.getProjectTasks
)


router.get ("/ :projectId/tasks/:taskId",
    param ("taskId").isMongoId().withMessage("El id de la tarea no es valido"),
    handleInputErrors,
    TaskController.getTaskById
)
router.put ("/ :projectId/tasks/:taskId",
    param ("taskId").isMongoId().withMessage("El id de la tarea no es valido"),
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es requerido'),
    body('description')
        .notEmpty().withMessage('La descripción de la tarea es requerida'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete ("/ :projectId/tasks/:taskId",
    param ("taskId").isMongoId().withMessage("El id de la tarea no es valido"),
    handleInputErrors,
    TaskController.deleteTask
)

router.post ("/:projectId/tasks/:taskId/status",
    param ("taskId").isMongoId().withMessage("El id de la tarea no es valido"),
    body("status")
    .notEmpty().withMessage("El estado de la tarea es requerido"),
    handleInputErrors,



)

export default router;

