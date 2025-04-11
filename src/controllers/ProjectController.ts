import type { Request, Response } from 'express'
import Project from '../models/Project'

export class ProjectController {

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)
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
            const projects = await Project.find({})
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
                const error = new Error('Project not found')
                res.status(404).json({ msg: error.message })
                return
            }
            res.json(project)
        } catch (error) {
            console.log(error);
            res.status(400).json({ msg: 'Project id invalid' })
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findById(id)
            if (!project) {
                const error = new Error('Project not found')
                res.status(404).json({ msg: error.message })
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
                const error = new Error('Project not found')
                res.status(404).json({ msg: error.message })
                return
            }
            await project.deleteOne()
            res.json({msg:'Project deleted successfully'})
        } catch (error) {
            console.log(error);
            res.status(400).json({ msg: 'Project id invalid' })
        }        
    }
}