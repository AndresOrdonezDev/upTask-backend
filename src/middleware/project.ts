import type {Request, Response, NextFunction} from 'express'
import Project from '../models/Project'
import { IProject } from '../models/Project'

declare global {
    namespace Express{
        interface Request{
            project:IProject
        }
    }
}
export const projectExits = async (req:Request, res:Response, next:NextFunction)=>{
    const { projectId } = req.params
    
    try {
        const project = await Project.findById(projectId)

            if (!project) {
                res.status(404).json({ msg: 'Project not found' })
                return
            }
            req.project = project
            next()
    } catch (error) {
        res.status(500).json({msg:'There was an error to creating the task'})
    }
}