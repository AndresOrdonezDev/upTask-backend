import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors, validateEmail} from '../middleware/validation'
import { authenticate } from '../middleware/auth'
import { TeamMemberController } from '../controllers/TeamConstroller'
import { projectExits } from '../middleware/project'
const router = Router()

router.use(authenticate)

router.post('/',
    handleInputErrors,
    ProjectController.createProject
)

router.get('/', 
    ProjectController.getAllProject 
)

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

// teams

router.post('/:projectId/team/find',
    projectExits,
    validateEmail,
    handleInputErrors,
    TeamMemberController.findMemberByEmail
)
router.post('/:projectId/team',
    projectExits,
    handleInputErrors,
    TeamMemberController.addMemberById
)
router.delete('/:projectId/team/:userId',
    projectExits,
    TeamMemberController.removeMemberById
)
router.get('/:projectId/team',
    projectExits,
    TeamMemberController.getMembersProject
)
export default router