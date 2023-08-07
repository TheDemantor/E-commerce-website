import express from 'express';
const router = express.Router();
//FROM CONTROLLER
import { authUser, deleteUser, getUserByID, getUserProfile, getUsers, logoutUser, registerUser, updateUser, updateUserProfile } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout',logoutUser);
router.post('/auth', authUser);
// router.route('/profile').get(protect,getUserProfile).put(protect, updateUserProfile);
router.route('/profile').get(protect,getUserProfile).put( updateUserProfile);
router.route('/:id').get(protect, admin, getUserByID).delete(protect, admin, deleteUser).put(protect, admin, updateUser);

export default router;