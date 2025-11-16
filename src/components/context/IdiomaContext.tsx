import React, { createContext, useContext, useState, type ReactNode } from "react";
import { type Idioma, setIdioma, getIdioma } from "../../i18n";

interface IdiomaContextProps {
  idioma: Idioma;
  cambiarIdioma: (nuevoIdioma: Idioma) => void;
}

const IdiomaContext = createContext<IdiomaContextProps>({
  idioma: getIdioma(),
  cambiarIdioma: () => {},
});

export const IdiomaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [idioma, setIdiomaState] = useState<Idioma>(getIdioma());

  const cambiarIdioma = (nuevoIdioma: Idioma) => {
    setIdioma(nuevoIdioma);   // actualiza el idioma global
    setIdiomaState(nuevoIdioma); // actualiza el estado del contexto
  };

  return (
    <IdiomaContext.Provider value={{ idioma, cambiarIdioma }}>
      {children}
    </IdiomaContext.Provider>
  );
};

export const useIdioma = () => useContext(IdiomaContext);