import { Router } from "express";
import {
  obtenerMunicipios,
  obtenerMunicipio,
  crearMunicipio,
  actualizarMunicipio,
  eliminarMunicipio
} from "../controllers/municipioController.js";

const router = Router();

router.get("/", obtenerMunicipios);
router.get("/:id", obtenerMunicipio);
router.post("/", crearMunicipio);
router.put("/:id", actualizarMunicipio);
router.delete("/:id", eliminarMunicipio);

export default router;