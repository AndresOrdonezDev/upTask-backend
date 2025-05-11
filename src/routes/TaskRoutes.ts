import { Router } from 'express'
import { TaskController } from '../controllers/TaskController'
import { projectExits } from '../middleware/project'
import { handleInputErrors } from '../middleware/validation'
import { hasAuthorization, taskBelongsToProject, taskExits } from '../middleware/task'
import { authenticate } from '../middleware/auth'

const router = Router()

router.param('projectId',projectExits)
router.param('taskId', taskExits)
router.param('taskId', taskBelongsToProject)

router.use(authenticate)

router.post('/:projectId',
    handleInputErrors,
    hasAuthorization,
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
    hasAuthorization,
    TaskController.updateTask
)
router.delete('/:projectId/task/:taskId',
    hasAuthorization,
    TaskController.deleteTask
)

router.post('/:projectId/task/:taskId/status',
    handleInputErrors,
    TaskController.updateStatus
)


export default router