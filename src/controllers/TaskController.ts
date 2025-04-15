import type { Request, Response } from 'express'
import Task from '../models/Task'

export class TaskController {

    static createTask = async (req: Request, res: Response) => {

        try {
            const task = new Task({ ...req.body, project: req.project.id })
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])
            res.send('Tarea creada correctamente')

        } catch (error) {
            console.log(error);
            res.status(404).json({ msg: 'Project id invalid' })
        }
    }

    static getProjectTask = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({project:req.project.id}).populate('project')
            res.json(tasks)
        } catch (error) {
            res.status(500).json({msg:'There was an error to getting project tasks'})
        }
    }

    static getTaskById = async (req: Request, res: Response) => {  
        try {
            res.json(req.task)
        } catch (error) {
            res.send('Error al obtener la tarea')
        }
    }

    static updateTask = async (req: Request, res: Response) => {
       
        try {
            req.task.taskName = req.body.taskName
            req.task.description = req.body.description
            await req.task.save()
            res.send('Se actualizó la tarea')

        } catch (error) {
            res.status(500).json({msg:'There was an error to updating the task'})
        }
    }

    static deleteTask = async (req: Request, res: Response) => {
        try {            
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString())
            await Promise.allSettled([req.task.deleteOne(),req.project.save()])

            res.send('Tarea Eliminada')
        } catch (error) {
            res.status(500).send('Error al eliminar')
        }
    }

    static updateStatus = async(req: Request, res: Response) => {
        const {status} = req.body
        try {
            req.task.status = status
            await req.task.save()
            res.json({msg:'Task updated successfully'})
        } catch (error) {
            res.status(500).json({msg:'There was an error to deleting the task'})
        }
    }
}