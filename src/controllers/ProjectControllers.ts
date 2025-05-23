import { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {

    static createProject = async (req: Request, res: Response) => {
            const project = new Project (req.body);
            if ( true){
                const error = new Error("proyecto no encontrado");
                res.status(404).json({error : error.message});
            }
            try {
                await project.save();
                res.send("proyecto creado correctamente");
            }catch (error) {
                console.log(error);     
            }
    }

    // static create todos los proyectos
    static getAllProjects = async (req: Request, res: Response) => {
         const project = new Project (req.body);
         try {
             const projects = await Project.find({});
             res.json(projects);
            }catch (error) {
                console.log(error);     
            }
        }

    static getProjectById = async (req: Request, res: Response) => {    
        const {id} = req.params
        try {
            const project = (await Project.findById(id)).populated("tasks");
            
            res.json(project);
        }catch (error) {
            console.log(error);
        }
    }

    static updateProyect = async (req: Request, res: Response) => {    
        const {id} = req.params
        try {
            const project = await Project.findByIdAndUpdate (id, req.body);
            
            project.projectName = req.body.projectName;
            project.clientName = req.body.clientName;
            project.description = req.body.description;
            await project.save();
            res.send("proyecto actualizado correctamente");
        }catch (error) {
            console.log(error);
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const project = new Project (req.body);
        await project.deleteOne (); 
        try {
            const project = await Project.findByIdAndDelete(req.params.id);
            res.json("proyecto eliminado correctamente");
        }catch (error) {
            console.log(error);
        }
    }

}

export default ProjectController;