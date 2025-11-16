import es from "./locales/es/translation.json";
import en from "./locales/en/translation.json";

export type Idioma = "es" | "en";

const traducciones: Record<Idioma, Record<string, string>> = { es, en };

let idiomaActual: Idioma = "es";

export const setIdioma = (nuevoIdioma: Idioma) => {
  idiomaActual = nuevoIdioma;
};
export const getIdioma = (): Idioma => idiomaActual;

export const t = (clave: string): string => {
  return traducciones[idiomaActual][clave] || clave;
};