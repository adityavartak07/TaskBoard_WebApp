import express from "express";
const router = express.Router();

import { signin, signup, getusers } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", getusers);

export default router;
// module.exports.router=router;
