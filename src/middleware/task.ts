import type { Request, Response, NextFunction } from 'express'
import Task, { ITask } from '../models/Task'

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}
export const taskExits = async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params

    try {
        const task = await Task.findById(taskId)

        if (!task) {
            res.status(404).json({ message: 'Tarea no encontrada' })
            return
        }
        req.task = task
        next()
    } catch (error) {
        res.status(500).json({ message: 'There was an found task' })
    }
}

export const taskBelongsToProject = async (req: Request, res: Response, next: NextFunction) => {

    if (req.task.project.toString() !== req.project.id.toString()) {
        res.status(400).send('Acción invalida')
        return
    }
    next()

}

export const hasAuthorization = async (req: Request, res: Response, next: NextFunction) => {

    if (req.user.id.toString() !== req.project.manager.toString()) {
        res.status(400).send('No autorizado')
        return
    }
    next()

}