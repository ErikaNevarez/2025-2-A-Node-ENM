const estudiantes = require('../data/estudiantes');
const cursos = require('../data/cursos');
const calificaciones = require('../data/calificaciones');

/**
 * Obtiene todas las calificaciones con información relacionada
 */
const obtenerCalificaciones = (req, res) => {
  try {
    // Obtener parámetros de consulta para filtros (bonus)
    const { curso, estudiante, minima } = req.query;

    // Combinar los datos usando las relaciones
    let resultados = calificaciones.map(calificacion => {
      // Buscar el estudiante relacionado
      const estudianteEncontrado = estudiantes.find(e => e.id === calificacion.estudianteId);

      // Buscar el curso relacionado
      const cursoEncontrado = cursos.find(c => c.id === calificacion.cursoId);

      // Validar que existan las relaciones
      if (!estudianteEncontrado) {
        throw new Error(`Estudiante con ID ${calificacion.estudianteId} no encontrado`);
      }

      if (!cursoEncontrado) {
        throw new Error(`Curso con ID ${calificacion.cursoId} no encontrado`);
      }

      // Retornar el objeto con la estructura deseada
      return {
        nombre: estudianteEncontrado.nombre,
        curso: cursoEncontrado.nombre,
        calificacion: calificacion.calificacion
      };
    });

    // Aplicar filtros (bonus)
    if (curso) {
      resultados = resultados.filter(r => r.curso.toLowerCase().includes(curso.toLowerCase()));
    }

    if (estudiante) {
      resultados = resultados.filter(r => r.nombre.toLowerCase().includes(estudiante.toLowerCase()));
    }

    if (minima) {
      const minimaNum = parseFloat(minima);
      if (!isNaN(minimaNum)) {
        resultados = resultados.filter(r => r.calificacion >= minimaNum);
      }
    }

    res.status(200).json(resultados);

  } catch (error) {
    res.status(500).json({
      error: "Error al procesar las calificaciones",
      detalle: error.message
    });
  }
};

/**
 * Validar integridad de datos (bonus)
 */
const validarIntegridad = (req, res) => {
  try {
    const errores = [];

    // Verificar que todas las calificaciones tengan estudiante válido
    calificaciones.forEach(calificacion => {
      const estudiante = estudiantes.find(e => e.id === calificacion.estudianteId);
      if (!estudiante) {
        errores.push(`Calificación ID ${calificacion.id}: Estudiante ${calificacion.estudianteId} no existe`);
      }
    });

    // Verificar que todas las calificaciones tengan curso válido
    calificaciones.forEach(calificacion => {
      const curso = cursos.find(c => c.id === calificacion.cursoId);
      if (!curso) {
        errores.push(`Calificación ID ${calificacion.id}: Curso ${calificacion.cursoId} no existe`);
      }
    });

    if (errores.length > 0) {
      return res.status(400).json({
        error: "Errores de integridad encontrados",
        errores
      });
    }

    res.status(200).json({
      mensaje: "Integridad de datos verificada correctamente",
      total_calificaciones: calificaciones.length,
      total_estudiantes: estudiantes.length,
      total_cursos: cursos.length
    });

  } catch (error) {
    res.status(500).json({
      error: "Error al validar integridad",
      detalle: error.message
    });
  }
};

module.exports = {
  obtenerCalificaciones,
  validarIntegridad
};