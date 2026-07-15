// MonthlyTripPage.jsx
import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../Styles/todosViajes.css";
import "../Styles/colombiaExtra.css";

const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbyD_LV9XzHTtluFMsC4jyu8ZHdo-hIyqWyujQEeSdJ_AhziBhHpSq3rFoUhj0eMvPohpA/exec';

const fmtPrecio = (valor, moneda) => {
    const n = Number(valor);
    if (isNaN(n) || n === 0) return 'Consultar';
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: moneda || 'COP',
        maximumFractionDigits: 0,
    }).format(n);
};

const fmtFecha = (f) => {
    if (!f) return '';
    const d = new Date(f);
    if (isNaN(d)) return f;
    return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short' });
};

// ========== TARJETA ==========
const TripCard = ({ viaje, index }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [showInc, setShowInc] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const cupos = Number(viaje.cupos_disponibles);
    const pocos = cupos > 0 && cupos <= 3;

    const date1 = new Date(viaje.fecha_inicio);
    const date2 = new Date(viaje.fecha_fin);
    const diff = Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    const nights = diff > 0 ? diff : 1;

    const inclusions = viaje.incluye
        ? String(viaje.incluye).split(',').map((i) => i.trim()).filter(Boolean)
        : [];

    const hasDetail = viaje.detalle_adicional_url && String(viaje.detalle_adicional_url).startsWith('http');

    const waText = viaje.texto_whatsapp || viaje.texto_especifico || `Viaje a ${viaje.destino_especifico}`;
    const waLink = `https://wa.me/573023042213?text=${encodeURIComponent(`Hola, vi tu web y estoy interesado en el viaje a ${waText}`)}`;

    return (
        <article
            ref={ref}
            className={`tv-card ${visible ? 'in-view' : ''}`}
            style={{ '--i': index % 3 }}
        >
            <div className="tv-card-media">
                <img src={viaje.imagen_url} alt={viaje.destino_especifico} loading="lazy" />
                <div className="tv-card-shade" />

                <span className="tv-card-badge">{nights} NOCHES</span>
                {pocos
                    ? <span className="tv-card-urgent">¡ÚLTIMOS {cupos} CUPOS!</span>
                    : <span className="tv-card-cupos">{cupos} CUPOS</span>
                }

                <div className="tv-card-country">
                    <span className="tv-card-country-line" />
                    {viaje.pais || viaje.tipo_viaje}
                </div>
            </div>

            <div className="tv-card-body">
                <h3 className="tv-card-dest">{viaje.destino_especifico}</h3>

                {viaje.frase_motivacional && (
                    <p className="tv-card-phrase">"{viaje.frase_motivacional}"</p>
                )}

                <div className="tv-card-meta">
                    <div className="tv-meta-item">
                        <span className="tv-meta-label">FECHAS</span>
                        <span className="tv-meta-value">
                            {fmtFecha(viaje.fecha_inicio)} — {fmtFecha(viaje.fecha_fin)}
                        </span>
                    </div>
                    <div className="tv-meta-item">
                        <span className="tv-meta-label">DESDE</span>
                        <span className="tv-meta-value tv-price">
                            {fmtPrecio(viaje.valor_total, viaje.moneda)}
                        </span>
                    </div>
                </div>

                {inclusions.length > 0 && (
                    <div className="tv-inc">
                        <button
                            className="tv-inc-toggle"
                            onClick={() => setShowInc(!showInc)}
                        >
                            <span>{showInc ? 'OCULTAR DETALLES' : 'VER QUÉ INCLUYE'}</span>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`tv-inc-chevron ${showInc ? 'open' : ''}`}
                            >
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <div className={`tv-inc-collapse ${showInc ? 'open' : ''}`}>
                            <ul className="tv-inc-list">
                                {inclusions.map((item, i) => (
                                    <li key={i}>
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="tv-card-actions">
                    {hasDetail && (
                        <a
                            href={viaje.detalle_adicional_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tv-btn-detail"
                        >
                            VER DETALLES
                        </a>
                    )}
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tv-btn-reserve"
                    >
                        EXPLORAR VIAJE
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    );
};

// ========== PÁGINA ==========
export const MonthlyTripPage = () => {
    const { month } = useParams();
    const displayMonth = month
        ? month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()
        : 'Este Mes';
    const filterMonth = displayMonth.toUpperCase();

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Scroll al inicio al montar o cambiar de mes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [month]);

    useEffect(() => {
        const fetchTrips = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(GAS_API_URL);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const data = await res.json();
                if (data.error) throw new Error(data.message || 'Error de la API');

                const filtered = data.filter(
                    (t) => t.mes_inicio && String(t.mes_inicio).toUpperCase() === filterMonth
                );

                filtered.sort((a, b) => (a.id_viaje > b.id_viaje ? 1 : -1));

                setTrips(filtered);
            } catch (err) {
                setError('Error al cargar los datos: ' + err.message);
                console.error('Fetch Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, [month, filterMonth]);

    if (loading) {
        return (
            <div className="tv-page">
                <div className="tv-state">
                    <div className="tv-loader"><span /></div>
                    <p>Cargando expediciones…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="tv-page">
            {/* HERO */}
            <header className="tv-hero">
                <div className="tv-hero-grid-bg" />
                <div className="tv-hero-inner">
                    <p className="tv-breadcrumb">
                        <Link to="/">Inicio</Link>
                        <span>/</span> Viajes por mes
                        <span>/</span> <strong>{displayMonth}</strong>
                    </p>
                    <span className="tv-hero-tag">LA VENTANA PERFECTA · 2026</span>
                    <h1 className="tv-hero-title">
                        <span>VIAJES EN</span>
                        <span className="tv-hero-accent">{displayMonth.toUpperCase()}.</span>
                    </h1>
                    <p className="tv-hero-sub">
                        Cada mes abre una puerta distinta.
                        {trips.length > 0 && ` ${trips.length} ${trips.length === 1 ? 'expedición' : 'expediciones'} disponibles.`}
                    </p>
                </div>
                <div className="tv-hero-fade" />
            </header>

            {/* ESTADOS */}
            {error && (
                <div className="tv-state">
                    <p className="tv-error">No pudimos cargar los viajes.</p>
                    <p className="tv-error-detail">{error}</p>
                </div>
            )}

            {!error && trips.length === 0 && (
                <div className="tv-state">
                    <p>No encontramos viajes con cupos disponibles para {displayMonth}.</p>
                    <Link to="/todos-los-viajes" className="tv-reset">VER TODOS LOS VIAJES</Link>
                </div>
            )}

            {/* GRID */}
            {!error && trips.length > 0 && (
                <div className="col-month">
                    <div className="tv-grid" style={{ paddingTop: '40px' }}>
                        {trips.map((trip, i) => (
                            <TripCard key={trip.id_viaje || i} viaje={trip} index={i} />
                        ))}
                    </div>
                </div>
            )}

            {/* CTA FINAL */}
            <section className="tv-cta">
                <h2>¿FLEXIBLE CON<br />LAS FECHAS?</h2>
                <p>Explora todas nuestras travesías del año.</p>
                <Link to="/todos-los-viajes" className="tv-cta-btn">
                    VER TODAS LAS TRAVESÍAS
                </Link>
            </section>
        </div>
    );
};