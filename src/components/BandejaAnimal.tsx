import React, { useState } from "react";
import { FaEdit, FaToggleOn, FaToggleOff, FaPlus, FaSearch } from "react-icons/fa";
import type { Animal, Usuario } from "../types/types";

interface BandejaAnimalesProps {
  animales: Animal[];
  usuarioLogueado: Usuario | null;
  onEdit: (animal: Animal) => void;
  onToggle: (animal: Animal) => void;
  onAdd: () => void;
}

const BandejaAnimales: React.FC<BandejaAnimalesProps> = ({ animales, usuarioLogueado, onEdit, onToggle, onAdd }) => {
  const esAdministrador = usuarioLogueado?.rol?.toLowerCase() === "administrador";
  const [buscar, setBuscar] = useState("");

  const animalesFiltrados = animales.filter(a =>
    (a.nombre ?? "").toLowerCase().includes(buscar.toLowerCase()) ||
    (a.especie ?? "").toLowerCase().includes(buscar.toLowerCase()) ||
    (a.raza ?? "").toLowerCase().includes(buscar.toLowerCase())
  );

  const styles: { [key: string]: React.CSSProperties } = {
    container: { padding: "2rem", backgroundColor: "#f7fafc", borderRadius: "1rem", boxShadow: "0 8px 25px rgba(0,0,0,0.15)" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" },
    buscarContainer: { display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#fff", padding: "0.4rem 0.6rem", borderRadius: "0.5rem", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
    inputBuscar: { padding: "0.5rem 0.75rem", borderRadius: "0.5rem", border: "1px solid #ccc", width: "300px", outline: "none" },
    btnAgregar: { padding: "0.6rem 1.2rem", backgroundColor: "#38a169", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" },
    tableContainer: { overflowX: "auto" },
    table: { width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", minWidth: "1000px", borderRadius: "0.75rem", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
    th: { padding: "1rem", textAlign: "left", borderBottom: "2px solid #e2e8f0", backgroundColor: "#edf2f7", position: "sticky", top: 0, zIndex: 1, color: "#2d3748" },
    td: { padding: "0.85rem", borderBottom: "1px solid #e2e8f0", verticalAlign: "middle", color: "#4a5568" },
    img: { width: "70px", height: "70px", objectFit: "cover", borderRadius: "0.5rem" },
    accionesBtn: { display: "flex", gap: "0.5rem" },
    toggleIcon: { cursor: "pointer", fontSize: "1.2rem" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.buscarContainer}>
          <FaSearch style={{ color: "#718096" }} />
          <input type="text" placeholder="Buscar..." value={buscar} onChange={e => setBuscar(e.target.value)} style={styles.inputBuscar} />
        </div>
        {esAdministrador && <button style={styles.btnAgregar} onClick={onAdd}><FaPlus /> Agregar Animal</button>}
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Foto</th>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Especie</th>
              <th style={styles.th}>Raza</th>
              <th style={styles.th}>Sexo</th>
              <th style={styles.th}>Edad</th>
              <th style={styles.th}>Descripción</th>
              <th style={styles.th}>Estado</th>
              {esAdministrador && <th style={styles.th}>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {animalesFiltrados.map(animal => (
              <tr key={animal.id}>
                <td style={styles.td}>
                  {animal.foto ? <img src={animal.foto.startsWith("http") ? animal.foto : `http://localhost:5000/${animal.foto}`} alt={animal.nombre || "Foto"} style={styles.img} /> : "—"}
                </td>
                <td style={styles.td}>{animal.nombre || "—"}</td>
                <td style={styles.td}>{animal.especie || "—"}</td>
                <td style={styles.td}>{animal.raza || "—"}</td>
                <td style={styles.td}>{animal.sexo || "—"}</td>
                <td style={styles.td}>{animal.edad ?? "—"}</td>
                <td style={styles.td}>{animal.descripcion || "—"}</td>
                <td style={styles.td}>
                  <span style={{ fontWeight: "bold", color: animal.estado_animal === "Disponible" ? "#276749" : animal.estado_animal === "Adoptado" ? "#dd6b20" : "#c53030" }}>
                    {animal.estado_animal}
                  </span>
                </td>
                {esAdministrador && (
                  <td style={styles.td}>
                    <div style={styles.accionesBtn}>
                      <button onClick={() => onEdit(animal)}><FaEdit /></button>
                      <button onClick={() => onToggle(animal)}>{animal.estado_animal === "Disponible" ? <FaToggleOn style={styles.toggleIcon} /> : <FaToggleOff style={styles.toggleIcon} />}</button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BandejaAnimales;