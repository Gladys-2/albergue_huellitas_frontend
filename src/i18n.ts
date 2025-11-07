export type Idioma = "es" | "en";

export const traducciones: Record<Idioma, Record<string, string>> = {
  es: {

    // Proyecto
    huellitas: "Huellitas",
    administrador: "Administrador",

    // Filtros
    especie: "Especie",
    estado: "Estado",
    sexo: "Sexo",
    tamano: "Tamaño",
    ubicacion: "Ubicación",
    todos: "Todos",
    buscar: "Buscar",
    cerrar: "Cerrar",

    // Ubicaciones
    lapaz: "La Paz",

    // Opciones especies
    perro: "Perro",
    gato: "Gato",
    conejo: "Conejo",
    hamster: "Hámster",

    // Estado
    disponible: "Disponible",
    urgente: "Urgente",
    invisible: "Invisible",

    // Sexo
    macho: "Macho",
    hembra: "Hembra",

    // Tamaño
    mini: "Mini",
    pequeno: "Pequeño",
    mediano: "Mediano",
    grande: "Grande",
    gigante: "Gigante"
  },

  en: {

    // Proyecto
    huellitas: "Little Paws",
    administrador: "Administrator",

    // Filtros
    especie: "Species",
    estado: "Status",
    sexo: "Gender",
    tamano: "Size",
    ubicacion: "Location",
    todos: "All",
    buscar: "Search",
    cerrar: "Close",

    // Ubicaciones
    lapaz: "La Paz",

    // Opciones especies
    perro: "Dog",
    gato: "Cat",
    conejo: "Rabbit",
    hamster: "Hamster",

    // Estado
    disponible: "Available",
    urgente: "Urgent",
    invisible: "Invisible",

    // Sexo
    macho: "Male",
    hembra: "Female",

    // Tamaño
    mini: "Mini",
    pequeno: "Small",
    mediano: "Medium",
    grande: "Large",
    gigante: "XL"
  },
};

let idiomaActual: Idioma = "es";

export const setIdioma = (nuevoIdioma: Idioma) => {
  idiomaActual = nuevoIdioma;
};

export const getIdioma = (): Idioma => idiomaActual;

export const t = (clave: string) => {
  return traducciones[idiomaActual][clave] || clave;
};