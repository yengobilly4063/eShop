import express from "express"
const router = express.Router()
import {authUser, getUserProfile, getAllUsers, registerUser, updateUserProfile } from "../controllers/userController.js"
import {protect} from "../middleware/authMiddleware.js"

router.route("/").get(getAllUsers)
router.route("/").post(registerUser)
router.route("/login").post(authUser)
router.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)


export default router
