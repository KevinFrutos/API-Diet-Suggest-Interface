import { Router } from 'express';
import {authenticate} from "../http/middlewares/authenticate";
import {suggestDiet} from "../controllers/suggest/SuggestController";

const router = Router();

router.post('/suggest', authenticate, suggestDiet);

export default router;
