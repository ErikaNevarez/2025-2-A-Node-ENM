import { Router } from "express";
import {
  obtenerEstados,
  obtenerEstado,
  crearEstado,
  actualizarEstado,
  eliminarEstado
} from "../controllers/estadoController.js";

const router = Router();

router.get("/", obtenerEstados);
router.get("/:id", obtenerEstado);
router.post("/", crearEstado);
router.put("/:id", actualizarEstado);
router.delete("/:id", eliminarEstado);

export default router;