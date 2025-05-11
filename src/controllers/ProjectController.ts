import type { Request, Response } from 'express'
import Project from '../models/Project'

export class ProjectController {

    static createProject = async (req: Request, res: Response) => {

        const project = new Project(req.body)
        project.manager = req.user.id

        try {
            await project.save()
            res.send('Proyecto Creado exitosamente')
        } catch (error) {
            const msg = new Error('Hubo un error la crear el proyecto')
            res.status(404).json({ msg: msg.message })
        }
    }

    static getAllProject = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({
                $or:[
                    {manager:{$in:req.user.id}},
                    {team:{$in:req.user.id}}
                ]
            })
            res.json(projects)
        } catch (error) {
            console.log(error);
        }
    }
    
    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findById(id).populate('tasks')
            
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).send(error.message)
                return
            }
            if(project.manager.toString() !== req.user.id.toString() && !project.team.includes(req.user.id)){
                res.status(404).send('Acción no permitida')
                return
            }
            res.json(project)
        } catch (error) {
            console.log(error);
            res.status(400).send('Proyecto no válido')
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findById(id)
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).send(error.message)
                return
            }
            if(project.manager.toString() !== req.user.id.toString()){
                res.status(404).send('Acción no permitida')
                return
            }
            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description = req.body.description

            await project.save()
            res.send('proyecto Actualizado')
        } catch (error) {
            console.log(error);
            res.status(400).json({ msg: 'Project id invalid' })
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findById(id)
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).send(error.message)
                return
            }
            if(project.manager.toString() !== req.user.id.toString()){
                res.status(404).send('Acción no permitida')
                return
            }
            await project.deleteOne()
            res.send('proyecto Eliminado')
        } catch (error) {
            console.log(error);
            res.status(404).send('Acción no permitida')
        }        
    }
}