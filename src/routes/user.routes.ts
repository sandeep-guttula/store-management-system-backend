import { Router } from 'express';
import {
  getCurrentUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
  addNewUser,
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { asyncHandler } from '../utils/asyncHandler';


const router = Router();

router.get('/me', authenticate, asyncHandler(getCurrentUser));

router.get('/', authenticate, authorize('ADMIN'), asyncHandler(listUsers));
router.get('/:id', authenticate, authorize('ADMIN'), asyncHandler(getUserById));
router.put('/:id', authenticate, asyncHandler(updateUser));
router.delete('/:id', authenticate, authorize('ADMIN'), asyncHandler(deleteUser));
router.post('/change-password', authenticate, asyncHandler(changePassword));
router.post('/', authenticate, authorize('ADMIN'), asyncHandler(addNewUser));

export default router;
