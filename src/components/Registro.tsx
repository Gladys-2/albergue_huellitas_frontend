import { useState } from 'react';
import type { Usuario } from '../types';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaApple } from 'react-icons/fa';

interface RegistroProps {
  onRegister: (usuario: Omit<Usuario, 'id'>) => void;
  mostrarLogin: () => void;
}

const Registro: React.FC<RegistroProps> = ({ onRegister, mostrarLogin }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleRegistro = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister({ nombre, correo, contraseña });
  };

  return (
    <div
      style={{
        width: '400px',          // ancho fijo igual para todos los formularios
        margin: '50px auto',     
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <section
        style={{
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
          backgroundColor: '#fff',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
          Registro de Usuario
        </h2>

        <form onSubmit={handleRegistro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Crear cuenta
          </button>
        </form>

        <p style={socialTextStyle}>O regístrate con</p>

        <div style={socialContainerStyle}>
          <a href="https://accounts.google.com/signin" target="_blank" rel="noopener noreferrer">
            <FcGoogle style={{ fontSize: '28px' }} />
          </a>
          <a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer" style={{ color: '#4267B2' }}>
            <FaFacebookF style={{ fontSize: '28px' }} />
          </a>
          <a href="https://appleid.apple.com/sign-in" target="_blank" rel="noopener noreferrer" style={{ color: '#000' }}>
            <FaApple style={{ fontSize: '28px' }} />
          </a>
        </div>

        <p style={footerTextStyle}>
          ¿Ya tienes cuenta?{' '}
          <span onClick={mostrarLogin} style={{ cursor: 'pointer', color: '#f39c12', fontWeight: 'bold' }}>
            Inicia sesión
          </span>
        </p>
      </section>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  padding: '12px 15px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  outline: 'none',
  fontSize: '14px',
  transition: '0.3s all',
  width: '100%',
};

const buttonStyle: React.CSSProperties = {
  padding: '14px',
  background: 'linear-gradient(90deg, #f39c12, #f1c40f)',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: '0.3s all',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};

const socialTextStyle: React.CSSProperties = {
  textAlign: 'center',
  margin: '20px 0 10px',
  color: '#666',
  fontSize: '14px',
};

const socialContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginBottom: '25px',
};

const footerTextStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '14px',
  color: '#666',
};

export default Registro;