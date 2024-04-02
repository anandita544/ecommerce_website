import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import requireSignIn from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.get("/test", requireSignIn, isAdmin, testController);
router.get("user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
