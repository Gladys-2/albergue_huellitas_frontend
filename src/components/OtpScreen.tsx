import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';

interface OtpScreenProps {
  verificarOtp: (codigo: string) => void;
  regresarLogin: () => void;
}

const OtpScreen: React.FC<OtpScreenProps> = ({ verificarOtp, regresarLogin }) => {
  const [codigo, setCodigo] = useState(['', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const nuevoCodigo = [...codigo];
    nuevoCodigo[index] = value;
    setCodigo(nuevoCodigo);

    // mover foco automáticamente
    if (value && index < codigo.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verificarOtp(codigo.join(''));
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
      <section className="screen active" style={{ padding: '30px', borderRadius: '12px', boxShadow: '0 6px 18px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#333' }}>Verificación de seguridad</h2>
        <p style={{ textAlign: 'center', marginBottom: '25px', color: '#666', fontSize: '14px' }}>
          Ingresa el código de verificación que enviamos a tu correo
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-box" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '25px' }}>
            {codigo.map((num, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                value={num}
                onChange={(e) => handleChange(i, e.target.value)}
                style={{
                  width: '60px',
                  height: '60px',
                  textAlign: 'center',
                  fontSize: '22px',
                  borderRadius: '10px',
                  border: '1px solid #ccc',
                  transition: '0.2s all',
                  outline: 'none'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#f39c12')}
                onBlur={(e) => (e.target.style.borderColor = '#ccc')}
              />
            ))}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(90deg, #f39c12, #f1c40f)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              transition: '0.3s all'
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Confirmar 
          </button>
        </form>

        <p className="alt-login" style={{ textAlign: 'center', margin: '20px 0 10px', color: '#666', fontSize: '14px' }}>O continúa con</p>
        <div className="socials" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '25px' }}>
          <a href="https://accounts.google.com/signin" target="_blank" rel="noopener noreferrer" style={{ fontSize: '28px' }}><FcGoogle /></a>
          <a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '28px', color: '#4267B2' }}><FaFacebookF /></a>
          <a href="https://appleid.apple.com/sign-in" target="_blank" rel="noopener noreferrer" style={{ fontSize: '28px', color: '#000' }}><FaApple /></a>
        </div>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
          ¿Ya tienes cuenta?{' '}
          <button
            onClick={regresarLogin}
            style={{ background: 'none', border: 'none', color: '#f39c12', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Iniciar sesión
          </button>
        </p>
      </section>
    </div>
  );
};

export default OtpScreen;