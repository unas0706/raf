import { Router } from "express";
import {
  addAdmin,
  addSalon,
  getAllAdmins,
  getAllSaloon,
  getAllUsers,
  getSalon,
} from "../controllers/salon.controller.js";
import {
  addUser,
  bookSlot,
  slotsAvail,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/getSalon/:place", getSalon);
router.get("/getAllAdmins", getAllAdmins);
router.get("/getAllSalons", getAllSaloon);
router.get("/getAllUsers", getAllUsers);

router.post("/addAdmin", addAdmin);
router.post("/addSalon", addSalon);

router.post("/bookSlot", slotsAvail, addUser, bookSlot);

export default router;
