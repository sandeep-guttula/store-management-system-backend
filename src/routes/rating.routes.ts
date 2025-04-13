import { Router } from 'express';
import {
    createRating,
    updateRating,
    getStoreRatings,
} from '../controllers/rating.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validation.middleware';
import { ratingSchema } from '../utils/validators';

const router = Router();

router.post('/', authenticate, authorize('USER'), validate(ratingSchema), createRating);
router.put('/:id', authenticate, authorize('USER'), validate(ratingSchema), updateRating);
router.get('/store/:storeId', authenticate, authorize('ADMIN', 'STORE_OWNER'), getStoreRatings);

export default router;
