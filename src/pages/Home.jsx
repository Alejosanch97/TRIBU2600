import React, { useState, useEffect, useRef } from 'react';
const video1 = "https://res.cloudinary.com/deafueoco/video/upload/v1776440899/02_1_rhsmu5.mov";

import "../Styles/home.css";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { MountainHero } from "../components/MountainHero";


// !!! SIMULACIÓN DE IMÁGENES: USARÉMOS TUS ENLACES DE PINTEREST PARA ESTE EJEMPLO !!!
const luxuryTrainImage = "https://i.pinimg.com/736x/ef/57/a0/ef57a0b2abf1eea377df36bcb10b872f.jpg";
const horsebackRidingImage = "https://i.pinimg.com/736x/1e/4a/68/1e4a687e8e603fa952e56478bbe89d8b.jpg";
// Usaremos una imagen diferente para la tercera tarjeta y para el carrusel, basada en tus imágenes
const mountainsImage = "https://i.pinimg.com/736x/a1/39/76/a13976e8f3a047bc081b942ee54ca96a.jpg";
const romeImage = "https://i.pinimg.com/736x/44/e6/3f/44e63fd319fe4ca864502c5819b45a6e.jpg";
const japanImage = "https://i.pinimg.com/736x/76/56/76/7656762ab886421ab64256716679d719.jpg"; // Usado para simular la pagoda de Japón
const costaRicaImage = "https://i.pinimg.com/736x/86/72/da/8672da141690b9098c9c433f1aae593b.jpg"; // Usado para simular la selva de Costa Rica
const europa = "https://i.pinimg.com/736x/74/f7/a0/74f7a0855a495544833890b5d76a27db.jpg";
const mexico = "https://i.pinimg.com/1200x/46/53/35/465335513731ac681e8d36069f85bb8f.jpg";

// Definimos la URL temporal de la imagen que quieres usar
const placeholderImage = "https://i.pinimg.com/1200x/f6/93/41/f693414005b0587cf29b3108560f0587.jpg";

// Datos para la nueva sección
const destinations = [
    { name: 'COLOMBIA', image: "https://i.pinimg.com/736x/4b/58/ae/4b58ae589fc8ce36b39ab2f10ed0cc3d.jpg" }, // Usando mountainsImage
    { name: 'PERU', image: "https://i.pinimg.com/736x/94/50/bd/9450bd49fb017c52b98e547e0c80997b.jpg" },
    { name: 'BOLIVIA', image: "https://i.pinimg.com/736x/e5/7d/76/e57d768313b871ffcb9bc15d829a550c.jpg" },
    { name: 'GUATEMALA', image: "https://i.pinimg.com/1200x/21/cc/c8/21ccc846e7dddb3b9aecec100ad2f300.jpg" },
    { name: 'MEXICO', image: "https://i.pinimg.com/736x/2f/f4/0d/2ff40d06f7e6fda235ea0fb00e6cd0b8.jpg" },
    { name: 'EUROPA', image: "https://i.pinimg.com/736x/8e/d0/2d/8ed02daed42b64b471af335418476f6f.jpg" }, // Usada antes para Europa
    { name: 'MEDITERRANEO', image: "https://i.pinimg.com/736x/4d/9e/7b/4d9e7be6d441142be895a0bceb03b285.jpg" },
    { name: 'ASIA', image: "https://i.pinimg.com/1200x/aa/df/ba/aadfba80c32936d84af2d27769dc73ab.jpg" },
];
const months = [
    { name: 'ENERO', image: "https://i.pinimg.com/1200x/59/80/a6/5980a68f9ee2f1f7ebf5167328755ebe.jpg" },
    { name: 'FEBRERO', image: "https://i.pinimg.com/1200x/de/e0/6b/dee06b291d70f5459e965e44efacf0be.jpg" },
    { name: 'MARZO', image: "https://i.pinimg.com/1200x/68/af/54/68af548a1630be18b563e648a84e6ffe.jpg" },
    { name: 'ABRIL', image: "https://i.pinimg.com/736x/74/fb/6d/74fb6df7ee3236bbc06c7651d0608489.jpg" },
    { name: 'MAYO', image: "https://i.pinimg.com/736x/47/cd/df/47cddf83fa7faaf352bc94c4aba68537.jpg" },
    { name: 'JUNIO', image: "https://i.pinimg.com/736x/20/9d/47/209d47305b5aa7ce86c04384c584ad50.jpg" },
    { name: 'JULIO', image: "https://i.pinimg.com/1200x/f8/8e/51/f88e510b0b5757e5cce2555ae7fd6636.jpg" },
    { name: 'AGOSTO', image: "https://i.pinimg.com/736x/32/2b/5b/322b5b7565606dab511e4dec4a51e718.jpg" },
    { name: 'SEPTIEMBRE', image: "https://i.pinimg.com/1200x/de/43/9a/de439a3eb58f2bae6ae8b3ba3f7b977f.jpg" },
    { name: 'OCTUBRE', image: "https://i.pinimg.com/736x/13/9a/dc/139adc9311f86bb537e7d0a6647b7727.jpg" },
    { name: 'NOVIEMBRE', image: "https://i.pinimg.com/1200x/14/93/98/149398dd95d4be3e1fbb1537ece43a4c.jpg" },
    { name: 'DICIEMBRE', image: "https://i.pinimg.com/736x/50/bc/3e/50bc3e37f2f9954a96412a9cafc6da55.jpg" },
];

const testimonials = [
    {
        // 1. Avistamiento de Ballenas (Colombia)
        quote: "¡MAJESTUOSO! SENTIR LA FUERZA DE LAS JOROBADAS TAN CERCA FUE UN REGALO DE LA VIDA. LA NATURALEZA EN SU MÁXIMO ESPLENDOR.",
        author: "Camila Restrepo, Medellín, Colombia",
        image: "https://i.pinimg.com/736x/b9/d5/02/b9d5028ea1af229ab2ef328dfbd64853.jpg" // Simulación: Foto de una ballena jorobada saltando o aletas
    },
    {
        // 2. Nevado del Cocuy (Colombia)
        quote: "VER EL COCUY FUE UNA EXPERIENCIA QUE NOS CAMBIÓ LA PERCEPCIÓN DEL SILENCIO. UN DESAFÍO FÍSICO CON UNA RECOMPENSA VISUAL INCOMPARABLE.",
        author: "Andrés y Sofía, Bogotá, Colombia",
        image: "https://i.pinimg.com/736x/df/97/ed/df97ed33b3101aa5a7c85b06f1bc8eb3.jpg" // Simulación: Foto del glaciar o frailejones en el Cocuy
    },
    {
        // 3. Guatapé y El Peñol (Colombia)
        quote: "LOS COLORES DE GUATAPÉ SON UN ABRAZO AL ALMA. SUBIR EL PEÑOL Y VER ESE PAISAJE FUE VER CÓMO LA ALEGRÍA COLOMBIANA PINTÓ LA TIERRA.",
        author: "Ricardo Gómez, Cali, Colombia",
        image: "https://i.pinimg.com/736x/c1/ff/d0/c1ffd0f94d731160f7e1b2e40eaab7b2.jpg" // Simulación: Vista panorámica de Guatapé y el embalse desde el Peñol
    },
    {
        // 4. Perú (Mundo - Machu Picchu)
        quote: "¡LA PRIMERA VEZ HACIENDO SANDBOARD! QUÉ ADRENALINA. NO HAY MEJOR FORMA DE BAJAR ESAS DUNAS QUE CON LA ENERGÍA Y EL EQUIPO DE ADVENTURE. HUACACHINA ES INCREÍBLE.",
        author: "Alejo, Bogotá, Colombia",
        image: "https://i.pinimg.com/736x/2b/a7/0f/2ba70f8f93d72d0589613f8d9c1cfe26.jpg" // Simulación: Foto de Machu Picchu al amanecer
    },
    {
        // 5. Guatemala (Mundo - Tikal/Atitlán)
        quote: "Tikal y Atitlán son la prueba de que la magia existe. VOLVIMOS LLENOS DE NUEVAS AMISTADES Y CON LA CERTEZA DE QUE EL MUNDO ES UN TESORO.",
        author: "Juan Pablo, Pereira, Colombia",
        image: "https://i.pinimg.com/1200x/a1/9a/34/a19a34d7e160eba46686cb67bc020a6c.jpg" // Simulación: Foto del Lago Atitlán con volcanes
    },
    {
        // 6. Día de Muertos (Mundo - México)
        quote: "¡MÉXICO SUPERÓ TODO! NUNCA PENSÉ PASARLA TAN BIEN. CUMPLÍ EL SUEÑO DE CONOCER EL ORIGEN DE ESA MÚSICA QUE ME ENAMORÓ DE NIÑO. FUE PURA MAGIA Y ALEGRÍA.",
        author: "Don Lucho, Colombia",
        image: "https://i.pinimg.com/736x/5c/79/0d/5c790dae77314e59fdda693795a94bdd.jpg" // Simulación: Foto de una ofrenda colorida o catrinas en México
    }

];

// ===============================================
// FUNCIÓN CLAVE: Determina la ruta de navegación
// ===============================================
const getCountryPath = (countryName) => {
    const normalizedName = countryName.toUpperCase();
    if (normalizedName === 'COLOMBIA') {
        // Ruta fija para Colombia
        return '/colombia';
    } else {
        // Ruta dinámica para viajes internacionales (ej: /viajes-internacionales/peru)
        // Convertimos el nombre a minúsculas para el parámetro de la URL
        return `/viajes-internacionales/${countryName.toLowerCase()}`;
    }
};

export const Home = () => {
    const videoSources = [video1];
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState('destination'); // Estado para controlar el filtro activo
    // *** ESTADO Y DATOS PARA EL CARRUSEL DE TESTIMONIOS ***
    const [currentIndex, setCurrentIndex] = useState(0);

    // Ref para la animación de scroll en la sección Manifiesto
    const manifestoRef = useRef(null);
    const expedicionesRef = useRef(null);
    const horizontalRef = useRef(null);
    const trackRef = useRef(null);
    const [hProgress, setHProgress] = useState(0);


    // CLAVE: Clonamos el primer testimonio al final para el loop
    const carouselItems = [...testimonials, testimonials[0]];
    const totalOriginalItems = testimonials.length;
    const totalCarouselItems = carouselItems.length; // N + 1

    // Efecto para detectar scroll usando IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                    } else {
                        entry.target.classList.remove("in-view");
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
        );

        if (manifestoRef.current) observer.observe(manifestoRef.current);
        if (expedicionesRef.current) observer.observe(expedicionesRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const onScroll = () => {
            const section = horizontalRef.current;
            const track = trackRef.current;
            if (!section || !track) return;

            const rect = section.getBoundingClientRect();
            const total = section.offsetHeight - window.innerHeight;
            if (total <= 0) return;

            const p = Math.min(Math.max(-rect.top / total, 0), 1);
            setHProgress(p);

            // El track recorre exactamente su ancho excedente
            const maxX = Math.max(0, track.scrollWidth - window.innerWidth);
            track.style.transform = `translateX(-${p * maxX}px)`;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        onScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    // *** LÓGICA DE MOVIMIENTO AUTOMÁTICO (Loop Infinito) ***
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = prevIndex + 1;

                // Si el índice es el último (el clon: N)
                if (nextIndex >= totalCarouselItems) {
                    return 0; // Regresa al índice 0 (T0 original)
                }

                // CLAVE DEL LOOP: Cuando se desliza al clon (índice N-1), 
                // debemos saltar instantáneamente al índice 0.
                if (nextIndex === totalCarouselItems - 1) {

                    // 1. Espera la duración de la transición (800ms)
                    setTimeout(() => {
                        const carousel = document.querySelector('.testimonial-content-scroll');
                        if (carousel) {
                            // 2. Desactivamos la transición para el salto instantáneo
                            carousel.style.transition = 'none';
                            setCurrentIndex(0); // Saltamos al T0 original

                            // 3. Reactivamos la transición para el siguiente deslizamiento suave
                            setTimeout(() => {
                                carousel.style.transition = 'transform 0.8s ease-in-out';
                            }, 50); // Pequeño retraso
                        }
                    }, 800); // Duración de la transición CSS

                    return nextIndex; // Devolvemos el índice del clon (N-1) para que el deslizamiento se complete
                }

                return nextIndex; // Continúa el movimiento normal (0 -> 1 -> 2)
            });
        }, 5000); // Cambia cada 5 segundos

        return () => clearInterval(interval);
    }, [totalCarouselItems]);

    // Función para manejar el cambio manual (al hacer clic en los puntos)
    const handleDotClick = (index) => {
        const carousel = document.querySelector('.testimonial-content-scroll');
        if (carousel) {
            carousel.style.transition = 'transform 0.8s ease-in-out';
            setCurrentIndex(index);
        }
    };

    // CLAVE: Calculamos el índice para los puntos (excluyendo el clon)
    const dotIndex = currentIndex % totalOriginalItems;

    // CLAVE: Desactivamos la transición en el JSX cuando el índice es 0, 
    // pero solo si estamos viniendo del clon (para el salto instantáneo).
    const isInstantJump = currentIndex === 0 && document.querySelector('.testimonial-content-scroll')?.style.transition === 'none';
    // **********************************************
    // * CAMBIO CLAVE: Videos cambian cada 5 segundos *
    // **********************************************
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex(prevIndex =>
                (prevIndex + 1) % videoSources.length
            );
        }, 4000); // 5000ms = 5 segundos
        return () => clearInterval(interval);
    }, [videoSources.length]);

    // *** FUNCIÓN CLAVE PARA NAVEGAR Y FILTRAR ***
    const handleNavigateToMonth = () => {
        // 1. Establece el filtro a 'month'
        setActiveFilter('month');

        // 2. Espera un ciclo de renderizado (setTimeout 0) para asegurar que el estado se actualice
        // y luego desplázate al ID deseado.
        setTimeout(() => {
            const section = document.getElementById('viajes-por-mes');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 0);
    };

    return (
        <main>
            {/* ======================================= */}
            {/* SECCIÓN 1: HERO/VIDEO BACKGROUND (DISEÑO MEJORADO) */}
            {/* ======================================= */}
            {/* ======================================= */}
            {/* SECCIÓN 1: HERO 3D — MONTAÑA INTERACTIVA */}
            {/* ======================================= */}
            <MountainHero onExplore={handleNavigateToMonth} />

            {/* ======================================= */}
            {/* SECCIÓN 2A: MANIFIESTO — fondo oscuro   */}
            {/* ======================================= */}
            <section ref={manifestoRef} className="manifesto-section">
                {/* Grid sutil de fondo */}
                <div className="manifesto-grid-bg" />

                <div className="manifesto-inner">

                    {/* Columna izquierda: el statement */}
                    <div className="manifesto-left">
                        <span className="manifesto-tag">EL MANIFIESTO</span>

                        <h2 className="manifesto-title">
                            NO SOMOS UNA<br />
                            AGENCIA DE VIAJES.<br />
                            <span className="mf-accent">SOMOS UNA TRIBU.</span>
                        </h2>

                        <p className="manifesto-lead">
                            Existe una diferencia entre <em>ver</em> una montaña y <em>subirla</em>.
                            Entre tomarle una foto al glaciar y sentir cómo te quema los pulmones
                            a 4.800 metros.
                        </p>

                        <p className="manifesto-body">
                            Nosotros no vendemos postales. Diseñamos travesías para gente que
                            entrena, que suda, que se levanta a las 3 a.m. porque la cumbre
                            no espera. Rutas exigentes, logística impecable, y un precio que
                            no te obliga a elegir entre la aventura y el arriendo.
                        </p>

                        <div className="manifesto-cta-row">
                            <Link to="/todos-los-viajes" className="btn-manifesto">
                                <span>VER LAS TRAVESÍAS</span>
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Columna derecha: los 3 pilares */}
                    <div className="manifesto-right">

                        <article className="pillar">
                            <span className="pillar-num">01</span>
                            <div className="pillar-content">
                                <h3>EXIGENTE POR DISEÑO</h3>
                                <p>
                                    Acatenango. El Cocuy. Ciudad Perdida. Rutas que piden
                                    preparación física real — porque la recompensa está
                                    del otro lado del esfuerzo.
                                </p>
                            </div>
                        </article>

                        <article className="pillar">
                            <span className="pillar-num">02</span>
                            <div className="pillar-content">
                                <h3>PREMIUM SIN LA FACTURA PREMIUM</h3>
                                <p>
                                    Guías certificados, equipo de primera, campamentos que
                                    funcionan. Sin fees ocultos ni sobreprecios de intermediario.
                                </p>
                            </div>
                        </article>

                        <article className="pillar">
                            <span className="pillar-num">03</span>
                            <div className="pillar-content">
                                <h3>VUELVES CON UNA TRIBU</h3>
                                <p>
                                    Grupos pequeños de gente que comparte tu ritmo. Los que
                                    suben contigo hoy son con los que entrenas el próximo mes.
                                </p>
                            </div>
                        </article>

                        {/* Barra de datos duros */}
                        <div className="manifesto-stats">
                            <div className="stat">
                                <strong>2.600</strong>
                                <span>msnm de origen</span>
                            </div>
                            <div className="stat">
                                <strong>12</strong>
                                <span>máx. por grupo</span>
                            </div>
                            <div className="stat">
                                <strong>0</strong>
                                <span>fees ocultos</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ======================================= */}
            {/* SECCIÓN 3: EXPEDICIONES — scroll horizontal */}
            {/* ======================================= */}
            <section ref={expedicionesRef} className="expediciones-section">

                {/* Marcos decorativos en las esquinas */}
                <span className="frame-corner tl" />
                <span className="frame-corner tr" />
                <span className="frame-corner bl" />
                <span className="frame-corner br" />

                {/* Cabecera */}
                <div className="exp-header">
                    <div className="exp-head-left">
                        <span className="exp-tag">EXPEDICIONES 2026</span>
                        <h2 className="exp-title">
                            <span className="exp-line">LA MONTAÑA</span>
                            <span className="exp-line exp-accent">NO ESPERA.</span>
                        </h2>
                    </div>

                    <div className="exp-head-right">
                        <p className="exp-desc">
                            Cinco travesías. Cinco formas distintas de descubrir
                            de qué estás hecho.
                        </p>
                        <div className="exp-scroll-hint">
                            <span>DESLIZA</span>
                            <svg viewBox="0 0 40 8" fill="none">
                                <path d="M0 4h34M30 1l4 3-4 3" stroke="currentColor" strokeWidth="1" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* CONTENEDOR PIN: scroll vertical -> movimiento horizontal */}
                <div ref={horizontalRef} className="exp-pin-wrapper">
                    <div className="exp-pin-inner">

                        {/* Barra de progreso */}
                        <div className="exp-progress">
                            <span
                                className="exp-progress-fill"
                                style={{ width: `${hProgress * 100}%` }}
                            />
                        </div>

                        <div ref={trackRef} className="exp-track">

                            {/* ---------- EXPEDICIÓN 01 ---------- */}
                            <article className="exp-card">
                                <span className="exp-card-index">01</span>
                                <div className="exp-card-media">
                                    <img src={japanImage} alt="Guatemala" />
                                    <span className="exp-card-glow" />
                                </div>
                                <div className="exp-card-body">
                                    <div className="exp-card-meta">
                                        <span className="exp-meta-item">
                                            <em>PAÍS</em>
                                            <strong>GUATEMALA</strong>
                                        </span>
                                        <span className="exp-meta-item">
                                            <em>DURACIÓN</em>
                                            <strong>8–12 NOCHES</strong>
                                        </span>
                                        <span className="exp-meta-item">
                                            <em>NIVEL</em>
                                            <strong>EXTREMO</strong>
                                        </span>
                                    </div>
                                    <h3 className="exp-card-title">
                                        ENTRE VOLCANES, SELVA Y CULTURA
                                    </h3>
                                    <p className="exp-card-text">
                                        Acatenango de noche, con el Fuego rugiendo
                                        cada veinte minutos frente a tu carpa.
                                    </p>
                                    <button
                                        className="exp-card-btn"
                                    >
                                        <span>VER ITINERARIO</span>
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            </article>
                            
                            {/* ---------- EXPEDICIÓN 02 ---------- */}
                            <article className="exp-card">
                                <span className="exp-card-index">02</span>
                                <div className="exp-card-media">
                                    <img src={romeImage} alt="Perú" />
                                    <span className="exp-card-glow" />
                                </div>
                                <div className="exp-card-body">
                                    <div className="exp-card-meta">
                                        <span className="exp-meta-item">
                                            <em>PAÍS</em>
                                            <strong>PERÚ</strong>
                                        </span>
                                        <span className="exp-meta-item">
                                            <em>DURACIÓN</em>
                                            <strong>8 NOCHES</strong>
                                        </span>
                                        <span className="exp-meta-item">
                                            <em>NIVEL</em>
                                            <strong>EXIGENTE</strong>
                                        </span>
                                    </div>
                                    <h3 className="exp-card-title">
                                        LA RUTA AL CORAZÓN DE LOS ANDES
                                    </h3>
                                    <p className="exp-card-text">
                                        Machu Picchu al amanecer, dunas de Huacachina y
                                        el aire delgado del Valle Sagrado.
                                    </p>
                                    <button
                                        className="exp-card-btn"
                                        >
                                        <span>VER ITINERARIO</span>
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            </article>

                            {/* ---------- EXPEDICIÓN 03 ---------- */}
                            <article className="exp-card">
                                <span className="exp-card-index">03</span>
                                <div className="exp-card-media">
                                    <img src={costaRicaImage} alt="Bolivia" />
                                    <span className="exp-card-glow" />
                                </div>
                                <div className="exp-card-body">
                                    <div className="exp-card-meta">
                                        <span className="exp-meta-item">
                                            <em>PAÍS</em>
                                            <strong>BOLIVIA</strong>
                                        </span>
                                        <span className="exp-meta-item">
                                            <em>DURACIÓN</em>
                                            <strong>8 NOCHES</strong>
                                        </span>
                                        <span className="exp-meta-item">
                                            <em>NIVEL</em>
                                            <strong>MODERADO</strong>
                                        </span>
                                    </div>
                                    <h3 className="exp-card-title">
                                        SURREALISMO ANDINO
                                    </h3>
                                    <p className="exp-card-text">
                                        Uyuni, Titicaca y el Desierto Dalí. Paisajes
                                        que no parecen de este planeta.
                                    </p>
                                    <button
                                        className="exp-card-btn"
                                    >
                                        <span>VER ITINERARIO</span>
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            </article>

                            {/* ---------- EXPEDICIÓN 04 ---------- */}
                            <article className="exp-card">
                                <span className="exp-card-index">04</span>
                                <div className="exp-card-media">
                                    <img src={europa} alt="Europa" />
                                    <span className="exp-card-glow" />
                                </div>
                                <div className="exp-card-body">
                                    <div className="exp-card-meta">
                                        <span className="exp-meta-item">
                                            <em>DESTINO</em>
                                            <strong>EUROPA</strong>
                                        </span>
                                        <span className="exp-meta-item">
                                            <em>DURACIÓN</em>
                                            <strong>17 NOCHES</strong>
                                        </span>
                                        <span className="exp-meta-item">
                                            <em>NIVEL</em>
                                            <strong>ACCESIBLE</strong>
                                        </span>
                                    </div>
                                    <h3 className="exp-card-title">
                                        ARTE, GASTRONOMÍA Y CIUDADES
                                    </h3>
                                    <p className="exp-card-text">
                                        La travesía larga. Diecisiete noches para
                                        entender por qué todos vuelven.
                                    </p>
                                    <button className="exp-card-btn">
                                        <span>VER ITINERARIO</span>
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            </article>

                            {/* ---------- EXPEDICIÓN 05 ---------- */}
                            <article className="exp-card">
                                <span className="exp-card-index">05</span>
                                <div className="exp-card-media">
                                    <img src={mexico} alt="México" />
                                    <span className="exp-card-glow" />
                                </div>
                                <div className="exp-card-body">
                                    <div className="exp-card-meta">
                                        <span className="exp-meta-item">
                                            <em>PAÍS</em>
                                            <strong>MÉXICO</strong>
                                        </span>
                                        <span className="exp-meta-item">
                                            <em>DURACIÓN</em>
                                            <strong>8 NOCHES</strong>
                                        </span>
                                        <span className="exp-meta-item">
                                            <em>NIVEL</em>
                                            <strong>MODERADO</strong>
                                        </span>
                                    </div>
                                    <h3 className="exp-card-title">
                                        MAYAS, SABORES Y FESTEJOS
                                    </h3>
                                    <p className="exp-card-text">
                                        Cenotes, pirámides y Día de Muertos. La magia
                                        no es una metáfora aquí.
                                    </p>
                                    <button className="exp-card-btn">
                                        <span>VER ITINERARIO</span>
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            </article>

                            {/* ---------- CIERRE ---------- */}
                            <article className="exp-card exp-card-end">
                                <div className="exp-end-content">
                                    <span className="exp-end-tag">¿NO ENCUENTRAS LA TUYA?</span>
                                    <h3>DISEÑAMOS<br />LA RUTA<br />CONTIGO.</h3>
                                    <Link to="/todos-los-viajes" className="exp-end-btn">
                                        HABLEMOS
                                    </Link>
                                </div>
                            </article>

                        </div>
                    </div>
                </div>
            </section>
            {/* ======================================= */}
            {/* SECCIÓN 4: HOW DO YOU TRAVEL? (FILTROS CORREGIDOS) */}
            {/* ======================================= */}
            <section className="travel-finder-section" id="viajes-por-mes">
                <div className="container">
                    <h2 className="finder-main-title">¿CUÁL SERÁ TU PRÓXIMO GRAN VIAJE?</h2>

                    {/* Controles de Filtro */}
                    <div className="finder-filters">
                        <button
                            className={`filter-btn ${activeFilter === 'destination' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('destination')}
                        >
                            POR DESTINO
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'month' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('month')}
                        >
                            POR MES
                        </button>
                    </div>

                    {/* Contenido de las Tarjetas (Grid) */}
                    <div className={`finder-content-grid ${activeFilter === 'destination' ? 'grid-4-cols' : 'grid-6-cols'}`}>

                        {/* Renderizar Destinos */}
                        {activeFilter === 'destination' && destinations.map((item, index) => (
                            // *** RUTA DINÁMICA POR PAÍS ***
                            <Link
                                key={`dest-${index}`}
                                to={getCountryPath(item.name)}
                                className="grid-item destination-link"
                            >
                                <img src={item.image} alt={item.name} className="grid-image" />
                                <span className="item-label">{item.name}</span>
                            </Link>
                        ))}

                        {/* Renderizar Meses - ¡CORRECCIÓN APLICADA AQUÍ! */}
                        {activeFilter === 'month' && months.map((item, index) => (
                            // *** RUTA DINÁMICA POR MES HACIA MonthlyTripPage ***
                            <Link
                                key={`month-${index}`}
                                // to debe apuntar a la nueva ruta y pasar el mes en minúsculas
                                to={`/viajes-por-mes/${item.name.toLowerCase()}`}
                                className="grid-item month-link"
                            >
                                <img src={item.image} alt={item.name} className="grid-image" />
                                <span className="item-label">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            {/* ======================================= */}
            {/* SECCIÓN 5: TESTIMONIOS / COMENTARIOS (LOOP INFINITO) */}
            {/* ======================================= */}
            <section className="testimonials-section">
                <div className="container">
                    <h2 className="testimonials-main-title">¿POR QUÉ LOS VIAJEROS ELIGEN NUESTRA PASIÓN?</h2>

                    <div className="testimonial-carousel-wrapper">

                        <div
                            className="testimonial-content-scroll"
                            style={{
                                // Se mueve al 50% por cada tarjeta (muestra 2 a la vez)
                                transform: `translateX(-${currentIndex * 50}%)`,
                                // CLAVE: Se maneja la transición directamente en el useEffect/CSS
                            }}
                        >
                            {/* *** Usamos el array CLONADO *** */}
                            {carouselItems.map((testimonial, index) => (
                                <div key={index} className="testimonial-card">

                                    <div className="testimonial-image-wrapper">
                                        <img
                                            src={testimonial.image}
                                            alt={`Testimonio de ${testimonial.author}`}
                                            className="testimonial-image"
                                        />
                                    </div>

                                    <div className="testimonial-text-content">
                                        <span className="quote-icon">“</span>
                                        <p className="quote-text">{testimonial.quote}</p>
                                        <p className="quote-author">{testimonial.author}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* *** INDICADORES DE PUNTOS (Dots) *** */}
                    <div className="carousel-dots">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === dotIndex ? 'active' : ''}`}
                                onClick={() => handleDotClick(index)}
                                aria-label={`Ir al testimonio ${index + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </section>

        </main>
    );
};