// i18n.ts
export type Idioma = "es" | "en";

export const traducciones: Record<Idioma, Record<string, string>> = {
  es: {
    inicio: "Inicio",
    adopta: "Adopta",
    apadrina_dona: "Apadrina y Dona",
    apoyanos: "Apóyanos",
    hogares_tepa: "Hogares Tepa",
    blog: "Blog",
    contactanos: "Contáctanos",
  },
  en: {
    inicio: "Home",
    adopta: "Adopt",
    apadrina_dona: "Sponsor & Donate",
    apoyanos: "Support Us",
    hogares_tepa: "Foster Homes",
    blog: "Blog",
    contactanos: "Contact Us",
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