import { Router } from 'express'
import { handleInputErrors } from '../middleware/validation'
import { authenticate } from '../middleware/auth'
import { taskExits } from '../middleware/task'
import { projectExits } from '../middleware/project'

import { NoteController } from '../controllers/NoteController'

const router = Router()
router.use(authenticate)

router.param('taskId', taskExits)
router.param('projectId',projectExits)

router.post('/:ProjectId/tasks/:taskId/notes',
    handleInputErrors,
    NoteController.createNote
)
router.get('/:ProjectId/tasks/:taskId/notes',
    NoteController.getAllNotes
)
router.delete('/:ProjectId/tasks/:taskId/notes/:noteId',
    NoteController.deleteNote
)
export default router