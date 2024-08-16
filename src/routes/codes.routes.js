import { Router } from "express";
import { getVerificationCode, postVerificationCode } from "../controllers/codes.controller.js";

const router = Router()

router.get('/getverificationcode/:mail', getVerificationCode)
router.post('/postverificationcode', postVerificationCode)


export default router