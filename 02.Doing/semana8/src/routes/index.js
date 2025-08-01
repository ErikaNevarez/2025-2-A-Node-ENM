import { Router } from "express";
import estadoRoutes from "./estadoRoutes.js";
import municipioRoutes from "./municipioRoutes.js";
import usuarioRoutes from "./usuarioRoutes.js";

const router = Router();

router.use("/estados", estadoRoutes);
router.use("/municipios", municipioRoutes);
router.use("/usuarios", usuarioRoutes);

export default router;