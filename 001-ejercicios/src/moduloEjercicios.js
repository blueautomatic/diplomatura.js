import basededatos from './basededatos';

/**
 * Obtiene la lista de materias aprobadas (nota >= 4) para el nombre de alumno dado.
 * En caso de no existir el alumno, devolver undefined.
 * En caso de que no encuentre ninguna materia para el alumno, devuelve un array vacio []
 * Ejemplo del formato del resultado suponiendo que el alumno cursa dos materias y tiene mas de 4.
 *  [
    {
      id: 1,
      nombre: 'Análisis matemático',
      profesores: [1, 2],
      universidad: 1,
    },
    {
      id: 2,
      nombre: 'Corte y confección de sabanas',
      profesores: [3],
      universidad: 2,
    }
  ]
 * @param {string} nombreAlumno el nombre del alumno
 */
export const materiasAprobadasByNombreAlumno = (nombreAlumno) => {
  // Ejemplo de como accedo a datos dentro de la base de datos
  // console.log(basededatos.alumnos);

  let alumnos = basededatos.alumnos;
  let calificaciones = basededatos.calificaciones;
  let materias = basededatos.materias;
  let materiasAprobadas = [];

  let alumno = alumnos.find(alumno => alumno.nombre === nombreAlumno);

  if(alumno != undefined) {
    let listaCalificaciones = calificaciones.filter(calificacion => calificacion.nota >= 4 && calificacion.alumno === alumno.id);

    if(listaCalificaciones.length > 0) {
      listaCalificaciones.forEach(function(calificacion) {
        materiasAprobadas.push(materias.find(materia => materia.id === calificacion.materia));
      });
    }
  } else {
    return alumno;
  }

  return materiasAprobadas;
};

/**
 * Devuelve informacion ampliada sobre una universidad.
 * Si no existe la universidad con dicho nombre, devolvemos undefined.
 * Ademas de devolver el objeto universidad,
 * agregar la lista de materias dictadas por la universidad y
 * tambien agrega informacion de los profesores y alumnos que participan.
 * Ejemplo de formato del resultado (pueden no ser correctos los datos en el ejemplo):
 *{
      id: 1,
      nombre: 'Universidad del Comahue',
      direccion: {
        calle: 'Av. Siempre viva',
        numero: 2043,
        provincia: 'Neuquen',
      },
      materias: [
        {
          id: 1,
          nombre: 'Análisis matemático',
          profesores: [1, 2],
          universidad: 1,
        },
        {
          id: 4,
          nombre: 'Programación orientada a objetos',
          profesores: [1, 3],
          universidad: 1,
        },
      ],
      profesores:[
        { id: 1, nombre: 'Jorge Esteban Quito' },
        { id: 2, nombre: 'Marta Raca' },
        { id: 3, nombre: 'Silvia Torre Negra' },
      ],
      alumnos: [
         { id: 1, nombre: 'Rigoberto Manchu', edad: 22, provincia: 1 },
         { id: 2, nombre: 'Alina Robles', edad: 21, provincia: 2 },
      ]
    }
 * @param {string} nombreUniversidad
 */

 /**
 * Devuelve un array de profesores o un array vacío.
 * @param {array} materias
 */
const getListaProfesores = (materias) => {
  let profesores = basededatos.profesores;
  let auxArray = [];
  let arrProfesores = [];

  materias.forEach((materia) => {
    auxArray.push(...materia.profesores);
  });

  let idsProfesores = Array.from(new Set(auxArray));

  if(idsProfesores.length > 0) {
    idsProfesores.forEach((idProfesor) => {
      let profesor = profesores.find(profesor => profesor.id === idProfesor);
      
      if(profesor != undefined) {
        arrProfesores.push(profesor);
      }
    });
  }

  return arrProfesores;
}

/**
 * Devuelve un array de alumnos o un array vacío.
 * @param {array} materias
 */
const getListaAlumnos = (materias) => {
  let calificaciones = basededatos.calificaciones;
  let alumnos = basededatos.alumnos;
  let auxArray = [];
  let arrAlumnos = [];

  materias.forEach((materia) => {
    let idsDeAlumnos = calificaciones.filter(calificacion => materia.id === calificacion.materia).map(calificacion => calificacion.alumno);

    if(idsDeAlumnos.length > 0) {
      auxArray.push(...idsDeAlumnos);
    }
  });
  
  let idsAlumnos = Array.from(new Set(auxArray));

  idsAlumnos.forEach((idAlumno) => {
    let alumno = alumnos.find(alumno => alumno.id === idAlumno);

    if(alumno != undefined) {
      arrAlumnos.push(alumno);
    }
  });

  return arrAlumnos;
}

export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {
  let infoUniversidad = {};
  let universidades = basededatos.universidades;
  let materias = basededatos.materias;

  let universidad = universidades.find(universidad => universidad.nombre === nombreUniversidad);

  if(universidad != undefined) {
    infoUniversidad = {
      id: universidad.id,
      nombre: universidad.nombre,
      direccion: universidad.direccion
    }

    // agrego materias a infoUniversidad.materias
    infoUniversidad.materias = materias.filter(materia => materia.universidad === infoUniversidad.id);

    if(infoUniversidad.materias.length > 0) {
      // agrego profesores y alumnos
      infoUniversidad.profesores = getListaProfesores(infoUniversidad.materias);
      infoUniversidad.alumnos = getListaAlumnos(infoUniversidad.materias);
    }
  } else {
    return universidad;
  }

  return infoUniversidad;
};

/**
 * Devuelve el promedio de edad de los alumnos.
 * @param {array} alumnos
 */
export const promedioDeEdad = (alumnos = null) => {
  let promedio;
  let totalEdades = 0;
  let totalAlumnos = 0;

  if(alumnos === null) {
    alumnos = basededatos.alumnos;
  }

  alumnos.forEach((alumno) => {
    if(Number.isInteger(alumno.edad)) {
      totalAlumnos += 1;
      totalEdades += alumno.edad;
    }
  });

  promedio = Number((totalEdades / totalAlumnos).toFixed(2));

  return promedio;
};

/**
 * Devuelve la lista de alumnos con promedio mayor al numero pasado
 * por parametro.
 * @param {number} promedio
 */
export const alumnosConPromedioMayorA = (promedio) => {
  let alumnos = basededatos.alumnos;
  let calificaciones = basededatos.calificaciones;
  let mostrarAlumnos = [];

  alumnos.forEach((alumno) => {
    let promedioAlumno = 0;
    let cantCalificaciones = 0;

    calificaciones.forEach((calificacion) => {
      if(alumno.id === calificacion.alumno) {
        if(!isNaN(Number(calificacion.nota))) {
          promedioAlumno += calificacion.nota;
          cantCalificaciones += 1;
        } else {
          console.log(`La nota ingresada para el alumno ${alumno.id} en la materia ${calificacion.materia} no es un valor numérico.`);
        }
      }
    })

    if((promedioAlumno / cantCalificaciones) > promedio) {
      mostrarAlumnos.push(alumno)
    }
  });

  return mostrarAlumnos;
};

// /**
//  * Devuelve la lista de materias sin alumnos
//  */

export const materiasSinAlumnosAnotados = () => {
  let calificaciones = basededatos.calificaciones;
  let materias = basededatos.materias;
  let materiasSinAlumnos = [];

  materias.forEach((materia) => {
    let calificacion = calificaciones.find(calificacion => calificacion.materia === materia.id);

    if(calificacion === undefined) {
      materiasSinAlumnos.push(materia);
    }
  });

  return materiasSinAlumnos;
};

// /**
//  * Devuelve el promdedio de edad segun el id de la universidad.
//  * @param {number} universidadId
//  */
export const promedioDeEdadByUniversidadId = (universidadId) => {
  let materias = basededatos.materias;
  let calificaciones = basededatos.calificaciones;
  let alumnos = basededatos.alumnos;
  let promedio;

  let arrIdsMaterias = Array.from(new Set(materias.filter(materia => materia.universidad === universidadId).map(materia => materia.id)));

  if(arrIdsMaterias.length > 0) {
    let arrIdsAlumnos = Array.from(new Set(calificaciones.filter(calificacion => arrIdsMaterias.includes(calificacion.materia)).map(calificacion => calificacion.alumno)));
  
    let arrAlumnos = alumnos.filter(alumno => arrIdsAlumnos.includes(alumno.id))

    promedio = promedioDeEdad(arrAlumnos);
  }
  return promedio;
};
