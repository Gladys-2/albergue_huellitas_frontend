interface WelcomeScreenProps {
  continuar: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ continuar }) => {
  return (
    <div className="container">
      <section className="screen active">
        <h2>Pantalla de bienvenida</h2>
        <p>Explora la aplicación y todas sus funcionalidades</p>
        <button className="btn" onClick={continuar}>Vamos allá</button>
      </section>
    </div>
  );
};

export default WelcomeScreen;
