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
  let idsMateriasAprobadas = [];
  let materiasAprobadas = [];
  let idAlumno;

  for(let i = 0; i < alumnos.length; i++) {
    if(alumnos[i].nombre === nombreAlumno) {
      idAlumno = alumnos[i].id;
      break;
    }
  }

  if(idAlumno != undefined) {
    for(let i = 0; i < calificaciones.length; i++) {
      if(calificaciones[i].alumno === idAlumno && calificaciones[i].nota >= 4) {
        idsMateriasAprobadas.push(calificaciones[i].materia);
      }
    }
  
    for(let i = 0; i < materias.length; i++) {
      for(let idx = 0; idx < idsMateriasAprobadas.length; idx++) {
        if(idsMateriasAprobadas[idx] === materias[i].id) {
          materiasAprobadas.push(materias[idx]);
        }
      }
    }
  } else {
    return idAlumno;
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
export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {
  let infoUniversidad = {};
  let universidades = basededatos.universidades;
  let materias = basededatos.materias;
  let profesores = basededatos.profesores;
  let idsProfesores = [];
  let calificaciones = basededatos.calificaciones;
  let alumnos = basededatos.alumnos;
  let idsAlumnos = [];
  let universidad;

  for(let i = 0; i < universidades.length; i++) {
    if(universidades[i].nombre === nombreUniversidad) {
      universidad = universidades[i];
      break;
    }
  }

  if(universidad != undefined) {
    infoUniversidad = {
      id: universidad.id,
      nombre: universidad.nombre,
      direccion: universidad.direccion,
      materias: [],
      profesores:[],
      alumnos: []
    }

    // agrego materias a infoUniversidad.materias
    for(let i = 0; i < materias.length; i++) {
      if(materias[i].universidad === universidad.id) {
        if(!infoUniversidad.materias.includes(materias[i])) {
          infoUniversidad.materias.push(materias[i]);
        }
      }
    }

    let auxArray1 = [];
    if(infoUniversidad.materias.length > 0) {
      for(let i = 0; i < infoUniversidad.materias.length; i++) {
        auxArray1.push(...infoUniversidad.materias[i].profesores);
      }
    }

    // agrego profesores a infoUniversidad.profesores
    idsProfesores = Array.from(new Set(auxArray1));
    if(idsProfesores.length > 0) {
      for(let i = 0; i < profesores.length; i++) {
        for(let idx = 0; idx < idsProfesores.length; idx++) {
          if(profesores[i].id === idsProfesores[idx] && !infoUniversidad.profesores.includes(profesores[i])) {
            infoUniversidad.profesores.push(profesores[i]);
          }
        }
      }
    }

    for(let i = 0; i < calificaciones.length; i++) {
      for(let idx = 0; idx < infoUniversidad.materias.length; idx++) {
        if(calificaciones[i].materia === infoUniversidad.materias[idx].id) {
          if(!idsAlumnos.includes(calificaciones[i].alumno)) {
            idsAlumnos.push(calificaciones[i].alumno);
          }
        }
      }
    }

    // agrego alumnos a infoUniversidad.alumnos
    if(idsAlumnos.length > 0) {
      for(let i = 0; i < alumnos.length; i++) {
        for(let idx = 0; idx < idsAlumnos.length; idx++) {
          if(alumnos[i].id === idsAlumnos[idx] && !infoUniversidad.alumnos.includes(alumnos[i])) {
            infoUniversidad.alumnos.push(alumnos[i]);
          }
        }
      }
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
  let promedio = 0;

  if(alumnos === null) {
    alumnos = basededatos.alumnos;
  }
  let totalEdades = 0;
  let totalAlumnos = 0;

  for(let i = 0; i < alumnos.length; i++) {
    if(Number.isInteger(alumnos[i].edad)) {
      totalAlumnos += 1;
      totalEdades += alumnos[i].edad;
    }
  }

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

  for(let i = 0; i < alumnos.length; i++) {
    let promedioAlumno = 0;
    let cantCalificaciones = 0;
    for(let idx = 0; idx < calificaciones.length; idx++) {
      if(calificaciones[idx].alumno === alumnos[i].id) {
        if(!isNaN(Number(calificaciones[idx].nota))) {
          promedioAlumno += calificaciones[idx].nota;
          cantCalificaciones += 1;
        } else {
          console.log(`La nota ingresada para el alumno ${alumnos[i].id} en la materia ${calificaciones[idx].materia} no es un valor numérico.`);
        }
      }
    }

    if((promedioAlumno / cantCalificaciones) > promedio) {
      mostrarAlumnos.push(alumnos[i])
    }
  }
  return mostrarAlumnos;
};

// /**
//  * Devuelve la lista de materias sin alumnos
//  */

export const materiasSinAlumnosAnotados = () => {
  let calificaciones = basededatos.calificaciones;
  let materias = basededatos.materias;
  let materiasSinAlumnos = [];
  
  for(let i = 0; i < materias.length; i++) {
    let resultado = calificaciones.find(calificacion => calificacion.materia === materias[i].id);
    if(resultado === undefined) {
      materiasSinAlumnos.push(materias[i]);
    }
  }

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
