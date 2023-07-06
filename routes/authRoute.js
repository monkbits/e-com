import express from 'express';
import { registerController, loginController, testController } from '../controllers/authController.js';
import { isAdmin, requiredSignIn } from './../middlewares/authMiddleware.js';
//seperate file me routing krne ke liye routing ka object lgta hai
// router object
const router = express.Router();

router.post('/register', registerController)
//Routing
// REGISTER || METHOD POST

router.post('/login', loginController)

router.get('/test', requiredSignIn, isAdmin, testController);

export default router;