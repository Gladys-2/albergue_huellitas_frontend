import React, { useState, useEffect, type CSSProperties } from "react";
import type { Animal } from "../types/types"; // Ajusta la ruta según tu proyecto

export interface ModalAnimalProps {
  animal: Animal | null;
  onClose: () => void;
  onSave: (animal: Animal) => void;
}

const ModalAnimal: React.FC<ModalAnimalProps> = ({ animal, onClose, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState<number | string>("");
  const [sexo, setSexo] = useState<"Macho" | "Hembra">("Macho");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState<"Disponible" | "Adoptado" | "En cuidado">("Disponible");
  const [fotoUrl, setFotoUrl] = useState(""); // URL de imagen

  useEffect(() => {
    if (animal) {
      setNombre(animal.nombre ?? "");
      setEspecie(animal.especie ?? "");
      setRaza(animal.raza ?? "");
      setEdad(animal.edad ?? "");
      setSexo(animal.sexo ?? "Macho");
      setDescripcion(animal.descripcion ?? "");
      setEstado(animal.estado_animal ?? "Disponible");
      setFotoUrl(animal.foto ?? "");
    } else {
      setNombre("");
      setEspecie("");
      setRaza("");
      setEdad("");
      setSexo("Macho");
      setDescripcion("");
      setEstado("Disponible");
      setFotoUrl("");
    }
  }, [animal]);

  const handleSubmit = () => {
    if (!nombre || !especie || !raza || !edad || !sexo || !descripcion || !fotoUrl) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    const animalAGuardar: Animal = {
      id: animal?.id,
      nombre,
      especie,
      raza,
      sexo,
      edad: Number(edad),
      descripcion,
      estado_animal: estado,
      foto: fotoUrl,
      refugio_id: animal?.refugio_id || 1,
    };

    onSave(animalAGuardar);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={tituloStyle}>{animal ? "Editar Animal" : "Registrar Animal"}</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Especie" value={especie} onChange={e => setEspecie(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Raza" value={raza} onChange={e => setRaza(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Edad" value={edad} onChange={e => setEdad(e.target.value)} style={inputStyle} />

          <select value={sexo} onChange={e => setSexo(e.target.value as "Macho" | "Hembra")} style={inputStyle}>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>

          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            style={{ ...inputStyle, height: 80, resize: "vertical" }}
          />

          <select value={estado} onChange={e => setEstado(e.target.value as any)} style={inputStyle}>
            <option value="Disponible">Disponible</option>
            <option value="Adoptado">Adoptado</option>
            <option value="En cuidado">En cuidado</option>
          </select>

          <input
            type="text"
            placeholder="URL de la imagen"
            value={fotoUrl}
            onChange={e => setFotoUrl(e.target.value)}
            style={inputStyle}
          />

          {fotoUrl && (
            <div style={{ width: "100%", maxHeight: 150, overflow: "hidden", borderRadius: 10, border: "1px solid #ccc" }}>
              <img src={fotoUrl} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, gap: 12 }}>
          <button onClick={handleSubmit} style={buttonGuardar}>Guardar</button>
          <button onClick={onClose} style={buttonCancelar}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 500,
};

const modalStyle: CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "20px",
  padding: "30px 40px",
  width: "100%",
  maxWidth: "500px",
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const tituloStyle: CSSProperties = {
  marginBottom: 20,
  fontSize: 24,
  fontWeight: "bold",
  background: "linear-gradient(90deg, #137497, #f59e0b)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const inputStyle: CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ccc",
  outline: "none",
  fontSize: 14,
  width: "100%",
};

const buttonGuardar: CSSProperties = {
  padding: "10px 20px",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(90deg, #137497, #f59e0b)",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};

const buttonCancelar: CSSProperties = {
  padding: "10px 20px",
  borderRadius: 10,
  border: "1px solid #ccc",
  background: "#fff",
  color: "#333",
  fontWeight: "bold",
  cursor: "pointer",
};

export default ModalAnimal;