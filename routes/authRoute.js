import express from 'express';
import { registerController } from '../controllers/authController.js';

//seperate file me routing krne ke liye routing ka object lgta hai
// router object
const router = express.Router();

router.post('/register', registerController)
//Routing
// REGISTER || METHOD POST



export default router;