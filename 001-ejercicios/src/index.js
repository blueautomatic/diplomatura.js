import {
  materiasAprobadasByNombreAlumno,
  expandirInfoUniversidadByNombre,
  promedioDeEdad,
  alumnosConPromedioMayorA,
  materiasSinAlumnosAnotados,
  promedioDeEdadByUniversidadId
} from './moduloEjercicios';

import baseDeDatos from './basededatos';

// materiasAprobadasByNombreAlumno
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicios materiasAprobadasByNombreAlumno.');

const materiasAprobadasPorSuzana = materiasAprobadasByNombreAlumno(
  'Suzana Mendez'
);
console.log('\nMaterias aprobadas por Suzana:', materiasAprobadasPorSuzana);

const materiasAprobadasPorAlina = materiasAprobadasByNombreAlumno(
  'Alina Robles'
);
console.log('\nMaterias aprobadas por Alina:', materiasAprobadasPorAlina);

const materiasAprobadasPorCosme = materiasAprobadasByNombreAlumno(
  'Cosme Fulanito'
);
console.log('\nMaterias aprobadas por Cosme:', materiasAprobadasPorCosme);

const materiasAprobadasPorPablo = materiasAprobadasByNombreAlumno(
  'Pablo Tomafi'
);
console.log('\nMaterias aprobadas por Pablo:', materiasAprobadasPorPablo);

// expandirInfoUniversidadByNombre
console.log('\n------------------------------------------------------');
console.log('Ejecutando ejercicios expandirInfoUniversidadByNombre.\n');

const infoUniversidadComahue = expandirInfoUniversidadByNombre(
  'Universidad del Comahue'
);
console.log('Info comahue:', infoUniversidadComahue);

const infoUniversidadRio = expandirInfoUniversidadByNombre(
  'Universidad de Rio Negro'
);
console.log('Info rio negro:', infoUniversidadRio);

const infoUniversidadInventada = expandirInfoUniversidadByNombre(
  'Universidad ABCD'
);
console.log('Info ABCD:', infoUniversidadInventada);

// promedioDeEdad
console.log('\n------------------------------------------------------');
console.log('Ejecutando ejercicios promedioDeEdad.');

const promedio = promedioDeEdad();
console.log('\nEl promedio de edad de alumnos es: ', promedio);

// alumnosConPromedioMayorA
console.log('\n------------------------------------------------------');
console.log('Ejecutando ejercicios alumnosConPromedioMayorA.');

const alumnosConPromedioMayorA75 = alumnosConPromedioMayorA(
  7.5
);
console.log('\nAlumnos con promedio mayor a 7.5: ', alumnosConPromedioMayorA75);

const alumnosConPromedioMayorA3 = alumnosConPromedioMayorA(
  3
);
console.log('\nAlumnos con promedio mayor a 3: ', alumnosConPromedioMayorA3);

// materiasSinAlumnosAnotados
console.log('\n------------------------------------------------------');
console.log('Ejecutando ejercicios materiasSinAlumnosAnotados.');

const materiasSinAlumnos = materiasSinAlumnosAnotados();
console.log('\nMaterias sin alumnos: ', materiasSinAlumnos);

// promedioDeEdadByUniversidadId
console.log('\n------------------------------------------------------');
console.log('Ejecutando ejercicios promedioDeEdadByUniversidadId.');

const promedioByUniversidad = promedioDeEdadByUniversidadId(1);
console.log('\nPromedio de edad en Universidad del Comahue: ', promedioByUniversidad);

const promedioByUniversidad2 = promedioDeEdadByUniversidadId(2);
console.log('\nPromedio de edad en universidad de Río Negro: ', promedioByUniversidad2);

const promedioByUniversidad3 = promedioDeEdadByUniversidadId(3);
console.log('\nPromedio de edad en universidad con ID 3: ', promedioByUniversidad3);
