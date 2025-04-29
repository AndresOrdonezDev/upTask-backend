import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { confirmPassword, handleInputErrors, validateEmail, validatePassword, validateToken } from "../middleware/validation";

const router = Router();

router.post('/create-account',
    handleInputErrors,
    validateEmail,
    validatePassword,
    confirmPassword,
    AuthController.createAccount
)
router.post('/confirm-account',
    validateToken,
    AuthController.confirmAccount
);

router.post('/login',
    handleInputErrors,
    validateEmail,
    validatePassword,
    AuthController.login
)
router.post('/request-code',
    handleInputErrors,
    validateEmail,
    AuthController.requestConfirmationCode
)
export default router;