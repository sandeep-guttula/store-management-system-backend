import { Router } from 'express';
import { signup } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { signupSchema } from '../utils/validators';
import { login } from '../controllers/auth.controller';
import { loginSchema } from '../utils/validators';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);


export default router;
