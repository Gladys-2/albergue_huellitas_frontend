import React from 'react';

const perrosData = [
    { nombre: "Firulais", edad: "2 años", raza: "Labrador", imagen: "https://placedog.net/400/300?id=1", descripcion: "Cariñoso y juguetón, ideal para familias" },
    { nombre: "Rocky", edad: "3 años", raza: "Bulldog", imagen: "https://placedog.net/400/300?id=2", descripcion: "Activo y leal, necesita ejercicio diario" },
    { nombre: "Luna", edad: "1 año", raza: "Pastor Alemán", imagen: "https://placedog.net/400/300?id=3", descripcion: "Alegre y curiosa, muy inteligente" },
    { nombre: "Milo", edad: "4 años", raza: "Beagle", imagen: "https://placedog.net/400/300?id=4", descripcion: "Tranquilo y amigable con niños" },
];

const carouselPerros = [...perrosData, ...perrosData];

const Inicio: React.FC = () => {

    const fullCss = `
        /* Estilos globales */
        .container {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        /* HERO */
        .hero-section {
            height: 90vh;
            background-image: url('https://placedog.net/1200/600?id=5');
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
            margin: 8 auto;
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
            padding: 50px 20px;
            background-color: #d69721ff;
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
    `;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: fullCss }} />

            <div className="container">

                {/* Bienvenida..*/}
                <header className="hero-section">
                    <h1>Bienvenido a Huellitas</h1>
                    <p>Un lugar donde los perros encuentran amor, cuidado y un hogar para siempre.</p>
                </header>

                {/* carrusel de los perros */}
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

                {/*inf. del albergue*/}
                <section className="info-section">
                    <h2>Acerca de Huellitas</h2>
                    <p>
                        En Huellitas nos dedicamos a rescatar y cuidar perros que necesitan un hogar. 
                        Nuestro equipo trabaja diariamente para garantizar bienestar, alimentación adecuada y cariño para cada uno de ellos.
                        ¡Visítanos y encuentra a tu nuevo mejor amigo!
                    </p>
                </section>

            </div>
        </>
    );
};

export default Inicio;