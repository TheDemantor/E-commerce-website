import express from 'express';
const router = express.Router();
//FROM CONTROLLER
import { authUser, deleteUser, getUserByID, getUserProfile, getUsers, logoutUser, registerUser, updateUser, updateUserProfile } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(admin, getUsers);
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router.route('/profile').get(protect,getUserProfile).put(protect, updateUserProfile);
router.route('/:id').get(admin, getUserByID).delete(admin, deleteUser).put(admin, updateUser);

export default router;