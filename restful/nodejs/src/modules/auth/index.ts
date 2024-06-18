import { Router } from "express";
import * as authService from "./service";

const router = Router()

router.post('/signup', authService.createAdmin)
router.post('/login', authService.login)



export default router