const express = require('express');
const calificacionesRoutes = require('./calificacionesRoutes');

const router = express.Router();

// Ruta principal de bienvenida
router.get('/', (req, res) => {
    res.json({
        mensaje: "🧠 API de Relaciones entre Entidades",
        descripcion: "Sistema de gestión de estudiantes, cursos y calificaciones",
        rutas: {
            calificaciones: "GET /calificaciones",
            filtros: {
                por_curso: "GET /calificaciones?curso=Matemáticas",
                por_estudiante: "GET /calificaciones?estudiante=Ana",
                calificacion_minima: "GET /calificaciones?minima=90",
                combinado: "GET /calificaciones?curso=Historia&minima=85"
            },
            validacion: "GET /calificaciones/validar"
        },
        entidades: {
            estudiantes: "5 estudiantes registrados",
            cursos: "5 cursos disponibles", 
            calificaciones: "10 calificaciones registradas"
        }
    });
});

// Usar las rutas de calificaciones
router.use('/calificaciones', calificacionesRoutes);

module.exports = router;