import { Router } from 'express';
import {
    createStore,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore
} from '../controllers/store.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validation.middleware';
import { storeSchema } from '../utils/validators';

const router = Router();

router.post('/', authenticate, authorize('ADMIN'), validate(storeSchema), createStore);
router.get('/', getAllStores);
router.get('/:id', getStoreById);
console.log("Store routes initialized")
router.put('/:id', authenticate, authorize('ADMIN', 'STORE_OWNER'), updateStore);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteStore);

export default router;