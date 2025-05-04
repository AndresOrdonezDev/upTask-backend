import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { confirmPassword, handleInputErrors, validateEmail, validatePassword, validateToken } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

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
router.post('/forgot-password',
    handleInputErrors,
    validateEmail,
    AuthController.forgotPassword
)

router.post('/validate-token',
    validateToken,
    AuthController.validateToken
);
router.post('/update-password/:token',
    handleInputErrors,
    validatePassword,
    validateToken,
    AuthController.updatePassword
);

router.get('/user',
    authenticate,
    AuthController.user
)
export default router;