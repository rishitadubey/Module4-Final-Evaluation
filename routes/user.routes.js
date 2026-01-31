import express from 'express'
import {signuo} from '../controllers'

const router = express.Router()
router.post('/signup',signup)
export default router 