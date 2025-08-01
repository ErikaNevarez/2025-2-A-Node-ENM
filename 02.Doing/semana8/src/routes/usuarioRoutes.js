import { Router } from "express";
import {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../controllers/usuarioController.js";

const router = Router();

router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuario);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;