import { Router } from 'express';
import {authenticate} from "../http/middlewares/authenticate";
import {
    createUserAttributes,
    findUserAttributesByUserId,
    updateUserAttributes
} from "../controllers/userAttributes/UserAttributesController";

const router = Router();

router.post('/create', authenticate, createUserAttributes);
router.put('/update', authenticate, updateUserAttributes);
router.get('/get', authenticate, findUserAttributesByUserId);

export default router;
