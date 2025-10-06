import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaApple } from 'react-icons/fa';

interface LoginScreenProps {
  onLogin: (correo: string, contraseña: string) => void;
  mostrarRegistro: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, mostrarRegistro }) => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(correo, contraseña);
  };

  const socialContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    margin: '20px 0'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const btnStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f39c12',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px'
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Inicio de sesión</h2>
      <p style={{ textAlign: 'center', marginBottom: '20px', color: '#2f1818ff' }}>Bienvenido de nuevo</p>

      <form onSubmit={handleLogin}>
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
        <button type="submit" style={btnStyle}>Ingresar</button>
      </form>

      <p style={{ textAlign: 'center', margin: '15px 0', color: '#555' }}>O inicia sesión con</p>

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

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        ¿No tienes cuenta?{' '}
        <button
          onClick={mostrarRegistro}
          style={{ background: 'none', border: 'none', color: '#f39c12', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Crear cuenta
        </button>
      </p>
    </div>
  );
};

export default LoginScreen;




