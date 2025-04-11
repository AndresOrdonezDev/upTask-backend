import { Router } from 'express'
import { TaskController } from '../controllers/TaskController'
import { projectExits } from '../middleware/project'
import { handleInputErrors } from '../middleware/validation'
import { taskBelongsToProject, taskExits } from '../middleware/task'

const router = Router()

router.param('projectId',projectExits)
router.param('taskId', taskExits)
router.param('taskId', taskBelongsToProject)

router.post('/:projectId',
    handleInputErrors,
    TaskController.createTask
)
router.get('/:projectId',
    TaskController.getProjectTask
)

router.get('/:projectId/task/:taskId',
    TaskController.getTaskById
)
router.put('/:projectId/task/:taskId',
    handleInputErrors,
    TaskController.updateTask
)
router.delete('/:projectId/task/:taskId',
    TaskController.deleteTask
)

router.post('/:projectId/task/:taskId/status',
    handleInputErrors,
    TaskController.updateStatus
)
export default router