import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

const perrosData = [
    { nombre: "Daizon", edad: "2 años", raza: "Labrador", imagen: "https://i.postimg.cc/Yq6rk9bK/Whats-App-Image-2025-11-03-at-19-26-44.jpg", descripcion: "Daizon es un compañero lleno de vida, muy cariñoso y juguetón. Le encanta jugar con niños, acurrucarse y demostrar su cariño con gestos simples como mover la cola. Es ideal para familias que buscan un amigo leal y alegre que llene su hogar de ternura." },
    { nombre: "Lucas", edad: "3 años", raza: "Bulldog", imagen: "https://i.postimg.cc/8Cq9jdzx/Whats-App-Image-2025-11-03-at-19-29-41.jpg", descripcion: "Lucas es un compañero lleno de energía, muy activo y leal. Necesita ejercicio diario y disfruta jugar, correr y compartir momentos con su familia. Es ideal para quienes buscan un amigo divertido y cariñoso que llene el hogar de alegría." },
    { nombre: "Luna", edad: "1 año", raza: "Pastor Alemán", imagen: "https://i.postimg.cc/jddgq3hR/Whats-App-Image-2025-11-03-at-19-30-59.jpg", descripcion: "Luna es una compañera alegre y curiosa, muy inteligente y siempre lista para aprender cosas nuevas. Le encanta explorar, jugar y llenar el hogar de energía y ternura." },
];

const carouselPerros = [...perrosData, ...perrosData];

const blogsData = [
    { 
        titulo: "Día Mundial del Perro Adoptado", 
        contenido: "El 23 de septiembre es uno de esos días que, a los amantes de los animales, nos llegan especialmente. El Día Mundial del Perro Adoptado es la ocasión perfecta para recordaros las ventajas de adoptar y acoger en nuestro Refugio de Animales.Durante toda la historia, estos animales de (casi siempre) cuatro patas, nos han fascinado y se les ha dedicado eventos y fiestas. Y no, no solo en la actualidad. De hecho, ya en la Antigua Roma se celebraran las lupercales o Lupercalia, la fiesta que representa el origen del imperio.En ella,  algunos de los miembros más ilustres de la ciudad se disfrazaban de perros y lobos, honrando a los hermanos Rómulo y Remo, fundadores de la ciudad, que fueron amamantados por la Loba Capitolina o Luperca.Mucho más actuales podemos disfrutar de las Fiestas de San Antón en enero, el Día Mundial del Perro el 21 de julio o el Día Internacional del Perro Callejero el 27 del mismo mes. Esto es en el caso de España, ya que como imaginarás, estas festividades varían, en muchas ocasiones, dependiendo del país.Eso sí, que haya varias de ellas en los meses de verano… ¿no te parece curioso? No hay una fuente oficial que indique por qué es el 23 de septiembre el Día Mundial del Perro Adoptado, pero conociendo que es uno de los momentos clave en el abandono de perros y gatos, debido a la época estival, nos lo imaginamos.a que sus dueños deciden desprenderse de estos animales para irse de vacaciones. Unido a eso, es también un momento clave en la “devolución” de los animales regalados durante las Navidades.Porque, por duro y terrible que parezca, para muchas personas, los perros y gatos siguen siendo regalos, como un objeto inanimado y sin sentimientos. Igual que un teléfono móvil o un perfume.Aunque también tenemos que tener en cuenta que según el Informe de Fundación Affinity de 2019 (el último publicado hasta la fecha), la llegada de animales a refugios y el abandono por parte de sus dueños es un dato bastante estable durante el año, que aumenta ligeramente de mayo a octubre.",
        imagen: "https://i.postimg.cc/ncTpPW3G/Whats-App-Image-2025-11-03-at-20-14-48-1.jpg" 
    },
    { 
        titulo: "Día Internacional de los derechos de los Animales", 
        contenido: "Celebramos cada 10 de diciembre el Día Internacional de los Derechos de los Animales. Una fecha que no pasa desapercibida para las personas amantes de los perros, gatos y cualquier tipo de animal. Ya que se trata de la confirmación de su importancia en todo el mundo.Y, por supuesto, en nuestro Refugio de Animales nos importa esta efeméride tan especial y de trascendencia internacional, que reconoce la importancia de la compañía animal ¡y sus derechos!.Comencemos con un poco de historia sobre este día. Y es que, aunque siempre hayan acompañado a las personas, no fue hasta 1977 que la Liga de los Derechos del animal y las Ligas Nacionales afiliadas adoptaron esta Declaración.Un año después, en 1978, se proclamó en la sede de la Organización de las Naciones Unidas para la Educación, la Ciencia y la Cultura (UNESCO) esta Declaración de Derechos. Cuyo cumpleaños coincide, como ya sabrás, con la Declaración Universal de los Derechos Humanos. Porque animales y personas siempre deberíamos ir de la mano.El texto recoge una serie de artículos donde se pone de manifiesto la importancia de las vidas animales. Así como una indicación con respecto a estos seres vivos: todos tienen derecho a vivir en libertad y a no experimentar maltrato o ser utilizados en experimentación.Pero ¿para qué sirve en realidad esta fecha? Es relevante por varios motivos, que te vamos a explicar a continuación:1.Visibiliza la situación de muchos animales en el mundo. Ya que no solamente existe por la protección de perros o gatos, sino que abarca todo tipo de seres animales. Desde elefantes hasta cabras. Y al ser internacional, denuncia su situación de maltrato en muchos países del mundo.2.Da la importancia que merecen a estos compañeros de vida de muchas personas a lo largo y ancho del planeta Tierra.Demuestra el aumento de la concienciación animal y cómo ha evolucionado a lo largo de los años. Ya que cada vez en más países existen leyes en contra del maltrato y abandono animal, no solamente para perros y gatos.Es decir: extendiéndose la importancia y relevancia de su bienestar más allá del ámbito doméstico. Prohibiendo ciertos espectáculos en todo el mundo.Fomentando el cuidado y supervivencia de todos los animales, ya que a diario se cometen graves delitos contra ellos. Como el tráfico ilegal o la caza furtiva.",
        imagen: "https://i.postimg.cc/PrDRRVdn/Whats-App-Image-2025-11-03-at-20-31-11.jpg"
    },
    { 
        titulo: "Amar a los animales a través de la donación y el cuidado diario", 
        contenido: "Donar a animales es un acto de amor que va más allá del afecto físico, significa ayudar a quienes sufren ya sea apoyando organizaciones benéficas, recaudando fondos o mostrando empatía por las necesidades de los animales en nuestra comunidad este amor se refleja en el respeto, la sensibilidad y el cuidado, reconociendo su lenguaje en gestos como mover la cola o ronronear y respondiendo a su cariño de manera que realmente los beneficie.Una forma de demostrar amor es apoyar a organizaciones benéficas donar a santuarios o refugios es una manera directa de ayudar a animales que han sido maltratados, abandonados o que sufren condiciones de explotación si no puedes donar dinero puedes organizar eventos o pedir donaciones en lugar de regalos para amigos y familiares también puedes difundir la causa compartir información sobre la importancia de la donación y el cuidado animal en redes sociales o con tu círculo cercano ayuda a crear conciencia y anima a más personas a involucrarse.El amor por los animales también se manifiesta en el día a día ser sensibles y empáticos nos hace más conscientes de sus necesidades, de su bienestar y de sus problemas nos impulsa a cuidarlos y a preocuparnos por ellos conectar emocionalmente con ellos nos enseña sobre el amor, la lealtad y la alegría que nos brindan al recibirnos moviendo la cola, acurrucándose o ronroneando corresponder a ese amor de manera correcta fortalece el vínculo entre ambos y demostrar amor es también respetar su lenguaje no verbal acariciarlos con paciencia, ofrecerles un entorno seguro y lleno de cariño es parte de esa conexión especial que nos une.Amar a los animales no es solo un sentimiento, es una acción constante que transforma vidas y nos hace mejores seres humanos.",
        imagen: "https://i.postimg.cc/qB5PYCnv/Whats-App-Image-2025-11-03-at-20-45-06.jpg" 
    },
];

const Inicio: React.FC = () => {

    const fullCss = `
        /* Estilos globales */
        html, body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            scroll-behavior: smooth;
            overflow-x: hidden;
            overflow-y: auto; /* scroll vertical */
        }

        .container {
            margin: 0;
            padding: 0;
        }

        /* HERO */
        .hero-section {
            height: 90vh;
            background-image: url('https://i.postimg.cc/DyMgvvZB/Whats-App-Image-2025-11-03-at-19-32-41.jpg');
            background-size: cover;
            background-position: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
            padding: 0 10px;
        }

        .hero-section h1 {
            font-size: 3.5rem;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
        }

        .hero-section p {
            font-size: 1.2rem;
            max-width: 500px;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
        }

        /* CARRUSEL */
        .carousel-section {
            background-color: #fef6e4;
            padding: 20px 0;
        }

        .carousel-container {
            width: 100%;
            overflow: hidden;
            margin: 0 auto;
        }

        .carousel-track {
            display: flex;
            width: 300%;
            animation: slideShow 15s linear infinite;
        }

        .carousel-track:hover {
            animation-play-state: paused;
        }

        .carousel-item {
            flex: 0 0 25%;
            margin: 0 10px;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            background-color: white;
        }

        .carousel-item img {
            width: 100%;
            height: 600px;
            object-fit: cover;
        }

        .carousel-item h3 {
            text-align: center;
            margin: 10px 0 5px;
        }

        .carousel-item p {
            text-align: center;
            margin: 0 10px 10px;
            font-size: 0.9rem;
        }

        @keyframes slideShow {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        /* SECCIÓN DE INFORMACIÓN */
        .info-section {
            text-align: center;
            padding: 30px 16px;
            background-color: #e5d8bcff;
        }

        .info-section h2 {
            font-size: 2rem;
            margin-bottom: 20px;
        }

        .info-section p {
            font-size: 1rem;
            max-width: 700px;
            margin: 0 auto;
            color: #333;
        }

        /* BLOGS */
        .blog-section {
            padding: 50px 20px;
            background-color: #fff;
            text-align: center;
        }

        .blog-section h2 {
            font-size: 2rem;
            margin-bottom: 30px;
        }

        .blogs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }

        .blog-card {
            background: #fef6e4;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .blog-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 10px;
        }

        .blog-card h3 {
            margin-bottom: 10px;
        }

        .blog-card p {
            font-size: 0.95rem;
            color: #333;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
            .hero-section h1 { font-size: 3rem; }
            .hero-section p { font-size: 1.1rem; }
            .carousel-item { flex: 0 0 30%; }
            .carousel-item img { height: 400px; }
        }

        @media (max-width: 768px) {
            .hero-section h1 { font-size: 2.2rem; }
            .hero-section p { font-size: 1rem; }
            .carousel-item { flex: 0 0 45%; }
            .carousel-item img { height: 300px; }
        }

        @media (max-width: 480px) {
            .hero-section h1 { font-size: 1.5rem; }
            .hero-section p { font-size: 0.9rem; }
            .carousel-item { flex: 0 0 70%; }
            .carousel-item img { height: 200px; }
        }
    `;
return (
  <>
    <style dangerouslySetInnerHTML={{ __html: fullCss }} />

    <div className="container">

      {/* HERO */}
      <header className="hero-section">
        <h1>Bienvenido a Huellitas</h1>
        <p>Un lugar donde los perros encuentran amor, cuidado y un hogar para siempre.</p>
      </header>

      {/* CARRUSEL */}
      <section className="carousel-section">
        <div className="carousel-container">
          <div className="carousel-track">
            {carouselPerros.map((perro, idx) => (
              <div className="carousel-item" key={idx}>
                <img src={perro.imagen} alt={perro.nombre} />
                <h3>{perro.nombre}</h3>
                <p>{perro.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section className="blog-section">
        <h2>Últimos Blogs</h2>
        <div className="blogs-grid">
          {blogsData.map((blog, idx) => (
            <div className="blog-card" key={idx}>
              {blog.imagen && <img src={blog.imagen} alt={blog.titulo} />}
              <h3>{blog.titulo}</h3>
              <p>{blog.contenido}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INFORMACIÓN */}
      <section className="info-section">
        <h2>Acerca de Huellitas</h2>
        <p>
          En Huellitas nos dedicamos a rescatar y cuidar perros que necesitan un hogar. 
          Nuestro equipo trabaja diariamente para garantizar bienestar, alimentación adecuada y cariño para cada uno de ellos.
          ¡Visítanos y encuentra a tu nuevo mejor amigo!
        </p>
      </section>

      {/* CONTACTO Y SUSCRIPCIÓN */}
      <section
        className="contact-section"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: '50px 20px',
          backgroundColor: '#fef6e4',
          gap: '40px',
          alignItems: 'flex-start',
        }}
      >
        {/* Información de Contacto */}
        <div className="contact-info" style={{ flex: '1 1 300px' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Información de Contacto</h2>
          <p style={{ margin: '5px 0' }}>Dirección: La Paz, Bolivia #2311</p>
          <p style={{ margin: '5px 0' }}>Teléfono: +591 78788729</p>
          <p style={{ margin: '5px 0' }}>Fax: 902955354</p>
          <p style={{ margin: '5px 0' }}>Email: huellitas@gmail.com</p>

          <h3 style={{ marginTop: '30px', marginBottom: '10px', color: '#333' }}>Síguenos en redes</h3>
          <div style={{ display: 'flex', gap: '20px', fontSize: '1.5rem' }}>
            <a
              href="https://www.facebook.com/p/Huellitas-SOS-La-Paz-100064678990800/?locale=es_LA"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1877f2', transition: 'color 0.3s' }}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/huellitas.lapaz/?hl=es-la"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#e1306c', transition: 'color 0.3s' }}
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/discover/huellitas-la-paz"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#000', transition: 'color 0.3s' }}
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Suscripción */}
        <div
          className="subscribe-form"
          style={{
            flex: '1 1 300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h2 style={{ marginBottom: '15px', color: '#333' }}>Suscríbete</h2>
          <p style={{ color: '#555', lineHeight: '1.6' }}>
            Suscríbete a nuestro Albergue Huellitas y mantente al día con noticias, adopciones y eventos especiales.
          </p>
          <div style={{ display: 'flex', marginTop: '15px' }}>
            <input
              className="subscribe-input"
              type="email"
              placeholder="Ingresa tu correo aquí"
              style={{
                flex: '1',
                padding: '10px',
                borderRadius: '5px 0 0 5px',
                border: '1px solid #ccc',
                outline: 'none',
              }}
            />
            <button
              className="subscribe-button"
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '0 5px 5px 0',
                backgroundColor: '#eebd5c',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c0cd09ff')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#eebd5c')}
            >
              Suscribirse
            </button>
          </div>
        </div>
      </section>

    </div>
  </>
);

}
export default Inicio;