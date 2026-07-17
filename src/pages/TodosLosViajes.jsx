import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/todosViajes.css";

const API_URL = 'https://script.google.com/macros/s/AKfycbyR_OJ-FPsj56ilTlkX6hG1wfzJLhcthjeH5UWLx8WDBxobpDYvDizkkXVhcLIX1ND_/exec';

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
    const d = new Date(f + 'T00:00:00');
    if (isNaN(d)) return f;
    return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short' });
};

export const TodosLosViajes = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paisFilter, setPaisFilter] = useState('TODOS');
    const [tipoFilter, setTipoFilter] = useState('TODOS');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetch(API_URL)
            .then((r) => r.json())
            .then((data) => {
                if (data.error) throw new Error(data.error);
                setTrips(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const paises = useMemo(() => {
        const set = new Set(trips.map((t) => t.pais).filter(Boolean));
        return ['TODOS', ...Array.from(set)];
    }, [trips]);

    const tipos = useMemo(() => {
        const set = new Set(trips.map((t) => t.tipo_viaje).filter(Boolean));
        return ['TODOS', ...Array.from(set)];
    }, [trips]);

    const filtered = useMemo(() => {
        return trips.filter((t) => {
            const okPais = paisFilter === 'TODOS' || t.pais === paisFilter;
            const okTipo = tipoFilter === 'TODOS' || t.tipo_viaje === tipoFilter;
            return okPais && okTipo;
        });
    }, [trips, paisFilter, tipoFilter]);

    return (
        <div className="tv-page">
            <header className="tv-hero">
                <div className="tv-hero-grid-bg" />
                <div className="tv-hero-inner">
                    <span className="tv-hero-tag">CATÁLOGO COMPLETO · 2026</span>
                    <h1 className="tv-hero-title">
                        <span>TODAS LAS</span>
                        <span className="tv-hero-accent">TRAVESÍAS.</span>
                    </h1>
                    <p className="tv-hero-sub">
                        Cada expedición es un capítulo distinto. Elige el tuyo.
                    </p>
                </div>
                <div className="tv-hero-fade" />
            </header>

            {loading && (
                <div className="tv-state">
                    <div className="tv-loader"><span /></div>
                    <p>Cargando expediciones…</p>
                </div>
            )}

            {error && (
                <div className="tv-state">
                    <p className="tv-error">No pudimos cargar los viajes.</p>
                    <p className="tv-error-detail">{error}</p>
                </div>
            )}

            {!loading && !error && filtered.length === 0 && (
                <div className="tv-state">
                    <p>No hay viajes con esos filtros.</p>
                    <button
                        className="tv-reset"
                        onClick={() => { setPaisFilter('TODOS'); setTipoFilter('TODOS'); }}
                    >
                        VER TODOS
                    </button>
                </div>
            )}

            {!loading && !error && filtered.length > 0 && (
                <div className="tv-grid">
                    {filtered.map((trip, i) => (
                        <TripCard key={trip.id_viaje || i} trip={trip} index={i} />
                    ))}
                </div>
            )}

            <section className="tv-cta">
                <h2>¿NO ENCUENTRAS<br />LO QUE BUSCAS?</h2>
                <p>Diseñamos expediciones a la medida. Cuéntanos tu sueño.</p>
                <a
                    href="https://wa.me/573173769865"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tv-cta-btn"
                >
                    HABLEMOS POR WHATSAPP
                </a>
            </section>
        </div>
    );
};

const TripCard = ({ trip, index }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

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

    const cupos = Number(trip.cupos_disponibles);
    const pocos = cupos > 0 && cupos <= 3;

    const wa = trip.texto_whatsapp
        ? `https://wa.me/573173769865?text=${encodeURIComponent(trip.texto_whatsapp)}`
        : `https://wa.me/573173769865`;

    return (
        <article
            ref={ref}
            className={`tv-card ${visible ? 'in-view' : ''}`}
            style={{ '--i': index % 3 }}
        >
            <div className="tv-card-media">
                <img src={trip.imagen_url} alt={trip.destino_especifico || trip.pais} loading="lazy" />
                <div className="tv-card-shade" />

                {trip.tipo_viaje && (
                    <span className="tv-card-badge">{trip.tipo_viaje}</span>
                )}
                {pocos && (
                    <span className="tv-card-urgent">¡ÚLTIMOS {cupos} CUPOS!</span>
                )}

                <div className="tv-card-country">
                    <span className="tv-card-country-line" />
                    {trip.pais}
                </div>
            </div>

            <div className="tv-card-body">
                <h3 className="tv-card-dest">{trip.destino_especifico || trip.pais}</h3>

                {trip.frase_motivacional && (
                    <p className="tv-card-phrase">"{trip.frase_motivacional}"</p>
                )}

                <div className="tv-card-meta">
                    {(trip.fecha_inicio || trip.mes_inicio) && (
                        <div className="tv-meta-item">
                            <span className="tv-meta-label">FECHAS</span>
                            <span className="tv-meta-value">
                                {trip.fecha_inicio
                                    ? `${fmtFecha(trip.fecha_inicio)} — ${fmtFecha(trip.fecha_fin)}`
                                    : trip.mes_inicio}
                            </span>
                        </div>
                    )}
                    <div className="tv-meta-item">
                        <span className="tv-meta-label">DESDE</span>
                        <span className="tv-meta-value tv-price">
                            {fmtPrecio(trip.valor_total, trip.moneda)}
                        </span>
                    </div>
                </div>

                {trip.incluye && (
                    <div className="tv-card-incluye">
                        <span className="tv-incluye-label">INCLUYE</span>
                        <p>{trip.incluye}</p>
                    </div>
                )}

                <div className="tv-card-actions">
                    {trip.detalle_adicional_url && (
                        <a
                            href={trip.detalle_adicional_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tv-btn-detail"
                        >
                            VER ITINERARIO
                        </a>
                    )}
                    <a
                        href={wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tv-btn-reserve"
                    >
                        RESERVAR
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    );
};