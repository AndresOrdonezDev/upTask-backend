import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors} from '../middleware/validation'
const router = Router()

router.post('/',
    handleInputErrors,
    ProjectController.createProject
)

router.get('/', ProjectController.getAllProject )
router.get('/:id',
    ProjectController.getProjectById
)
router.put('/:id',
    handleInputErrors,
    ProjectController.updateProject
)
router.delete('/:id',
    ProjectController.deleteProject
)

export default router