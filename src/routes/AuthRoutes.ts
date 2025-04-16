import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { confirmPassword, handleInputErrors, validateEmail, validatePassword } from "../middleware/validation";

const router = Router();

router.post('/create-account',
    handleInputErrors,
    validateEmail,
    validatePassword,
    confirmPassword,
    AuthController.register
)

export default router;