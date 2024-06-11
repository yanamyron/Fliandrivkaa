import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/User.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  Goncharstvo,
  Lipka,
  MainEnrole,
  masterclasses,
  Sertificates,
} from "../models/MainEnrole.js";

const router = express.Router();

// Можна додати CORS middleware на рівні окремого маршруту
const corsOptions = {
  origin: 'https://fliandrivka.netlify.app',
  credentials: true,
};

router.get("/users", cors(corsOptions), verifyToken, getUsers);
router.post("/users", cors(corsOptions), Register);
router.post("/login", cors(corsOptions), Login);
router.get("/token", cors(corsOptions), refreshToken);
router.delete("/logout", cors(corsOptions), Logout);

router.post("/mainenrole", cors(corsOptions), async (req, res) => {
  try {
    const newTodo = await MainEnrole.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/goncharstvo", cors(corsOptions), async (req, res) => {
  try {
    const newTodo = await Goncharstvo.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/lipka", cors(corsOptions), async (req, res) => {
  try {
    const newTodo = await Lipka.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/masterclasses", cors(corsOptions), async (req, res) => {
  try {
    const newTodo = await masterclasses.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/sertificates", cors(corsOptions), async (req, res) => {
  try {
    const newTodo = await Sertificates.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dashboard", cors(corsOptions), async (req, res) => {
  try {
    const mainRole = await MainEnrole.findAll();
    const goncharstvo = await Goncharstvo.findAll();
    const lipka = await Lipka.findAll();
    const masterclassestable = await masterclasses.findAll();
    const sertificates = await Sertificates.findAll();

    res.status(201).json({ mainRole, goncharstvo, lipka, masterclassestable, sertificates });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
