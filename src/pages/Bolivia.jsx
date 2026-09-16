import React, { useEffect } from 'react';
import "../Styles/bolivia.css";

const DAYS = [
    {
        n: '01', date: 'Lun 4 – Mar 5 ene', tag: 'La Paz · 3.600 m', title: 'LLEGADA Y CITY TOUR',
        img: 'https://i.pinimg.com/1200x/d8/29/14/d829148e7339266caf6df762eddb3549.jpg',
        text: 'Llegamos de madrugada a La Paz. Descansamos y por la tarde city tour: Valle de la Luna, teleféricos, calle Jaén, Plaza Murillo y el Mercado de las Brujas. En la noche tomamos el bus cama al salar.',
        facts: [['pin', 'Valle de la Luna'], ['bus', 'Teleféricos']],
        hotel: 'Bus cama nocturno → Uyuni',
        tour: 'City tour + teleférico + Valle de la Luna', tcost: '140.600',
        tl: [['Madrugada', 'llegada a El Alto + traslado'], ['Tarde', 'city tour + Mercado de las Brujas'], ['Noche', 'bus cama La Paz → Uyuni']]
    },
    {
        n: '02', date: 'Mar 6 ene', tag: 'Salar de Uyuni · 3.660 m', title: 'CAMINAR SOBRE EL CIELO',
        img: 'https://i.pinimg.com/736x/07/d5/a7/07d5a7e49fcd5ab9707f9ac7a7b9ca3c.jpg',
        text: 'Llegamos temprano, desayuno y ducha en el hotel. A las 10:30 arranca el tour de día completo: Cementerio de Trenes, Colchani, ingreso al salar, Isla Incahuasi, atardecer con vino y observación de estrellas. Noche en hotel de sal.',
        facts: [['train', 'Cementerio de Trenes'], ['pin', 'Isla Incahuasi']],
        hotel: 'Hotel Palacio de Sal 5★ · 1 noche',
        tour: 'Paquete salar + hotel (Hidalgo Tours)', tcost: '862.847',
        tl: [['Mañana', 'llegada, desayuno y ducha'], ['Día', 'Trenes, Colchani, Incahuasi'], ['Atardecer', 'efecto espejo, vino y estrellas']]
    },
    {
        n: '03', date: 'Mié 7 ene', tag: 'Uyuni → La Paz', title: 'EL PUEBLO DE SAL',
        img: 'https://i.pinimg.com/1200x/07/d5/a7/07d5a7e49fcd5ab9707f9ac7a7b9ca3c.jpg',
        text: 'Mañana libre en Uyuni para desayunar con calma, comprar artesanías de sal y tomar las últimas fotos del pueblo. Por la noche, bus cama de regreso a La Paz.',
        facts: [['pin', 'Artesanías de sal'], ['bus', 'Bus cama premium']],
        hotel: 'Bus cama nocturno → La Paz',
        tour: 'Mañana libre + bus Uyuni → La Paz', tcost: 'incluido',
        tl: [['Mañana', 'tiempo libre y compras'], ['Tarde', 'últimas fotos del pueblo'], ['Noche', 'bus cama Uyuni → La Paz']]
    },
    {
        n: '04', date: 'Jue 8 ene', tag: 'La Paz · 3.600 m', title: 'DESCANSO REAL',
        img: 'https://i.pinimg.com/1200x/d8/29/14/d829148e7339266caf6df762eddb3549.jpg',
        text: 'Llegamos a La Paz de madrugada y hoy el cuerpo manda: día de descanso después de dos noches de bus y el salar. Recuperamos energía antes de arrancar con las actividades de altura.',
        facts: [['bed', 'Descanso'], ['pin', 'La Paz a tu ritmo']],
        hotel: 'Hotel en La Paz · noche 1',
        tour: 'Día libre de recuperación', tcost: 'libre',
        tl: [['Mañana', 'llegada y traslado al hotel'], ['Día', 'descanso y recuperación'], ['Tarde', 'opcional: mercados o café']]
    },
    {
        n: '05', date: 'Vie 9 ene', tag: 'Lago Titicaca · 3.812 m', title: 'COPACABANA E ISLA DEL SOL',
        img: 'https://i.pinimg.com/1200x/98/04/f8/9804f8ca974c014d3635ab8c26a52d97.jpg',
        text: 'Día completo al lago navegable más alto del planeta: Copacabana, mirador de Tiquina, navegación a la Isla del Sol, caminata en Yumani y el Templo del Sol Pilkokaina. Regreso a La Paz.',
        facts: [['boat', 'Navegación al lago'], ['pin', 'Isla del Sol']],
        hotel: 'Hotel en La Paz · noche 2',
        tour: 'Full day Copacabana + Isla del Sol', tcost: '193.000',
        tl: [['Mañana', 'ruta a Copacabana + Tiquina'], ['Mediodía', 'navegación a la Isla del Sol'], ['Tarde', 'Yumani y regreso a La Paz']]
    },
    {
        n: '06', date: 'Sáb 10 ene', tag: 'Nevado Charquini · 5.024 m', title: 'MONTAÑA 1 · LAGUNA ESMERALDA',
        img: 'https://i.pinimg.com/1200x/1b/02/c2/1b02c2ff6d4ce7e59494e19f2ad88a05.jpg',
        text: 'Primera montaña, sin técnica de hielo: caminata de altura hasta la Laguna Esmeralda (~5.024 m), con vistas al Huayna Potosí, Chacaltaya y la Laguna Milluni. A tu ritmo, unas 3 horas de sendero.',
        facts: [['mtn', 'Nevado Charquini'], ['pin', 'Laguna Esmeralda']],
        hotel: 'Hotel en La Paz · noche 3',
        tour: 'Charquini + Laguna Esmeralda (4,8★)', tcost: '147.200',
        tl: [['Mañana', 'ruta al Charquini (~1h30)'], ['Día', 'caminata a la Laguna Esmeralda'], ['Tarde', 'regreso a La Paz (~15:30)']]
    },
    {
        n: '07', date: 'Mar 13 ene', tag: 'Cordillera Real · 5.300 m', title: 'MONTAÑA 2 · PICO AUSTRIA',
        img: 'https://i.pinimg.com/736x/a1/ad/a3/a1ada3dbbaa2802f13be74d525ad3ff0.jpg',
        text: 'El cierre de altura: trekking de un día entre lagunas glaciares a los pies del Condoriri y el Pico Austria. Caminata de altura sin ascenso técnico, ya con el cuerpo listo. La montaña que define a la Tribu.',
        facts: [['mtn', 'Condoriri / Pico Austria'], ['pin', 'Lagunas glaciares']],
        hotel: 'Hotel en La Paz · noche 6',
        tour: 'Condoriri + Pico Austria (5★)', tcost: '376.100',
        tl: [['Mañana', 'ruta a la Cordillera Real'], ['Día', 'trekking entre lagunas glaciares'], ['Tarde', 'regreso a La Paz']]
    },
    {
        n: '08', date: 'Dom 11 ene', tag: 'Valles andinos', title: 'PARAPENTE',
        img: 'https://i.pinimg.com/736x/ad/4c/6d/ad4c6df4bd7fde48ab4fb57e0c56acd9.jpg',
        text: 'Día de bajo desgaste físico, perfecto después de la montaña. Vuelo en parapente sobre los valles andinos cercanos a La Paz: adrenalina suave y vistas imposibles, sin exigir las piernas.',
        facts: [['pin', 'Vuelo en parapente'], ['bed', 'Bajo desgaste']],
        hotel: 'Hotel en La Paz · noche 4',
        tour: 'Parapente sobre valles andinos', tcost: '327.100',
        tl: [['Mañana', 'traslado a la zona de vuelo'], ['Día', 'vuelo en parapente'], ['Tarde', 'regreso y tarde libre']]
    },
    {
        n: '09', date: 'Lun 12 ene', tag: 'Yungas · descenso a 1.100 m', title: 'EL CAMINO DE LA MUERTE',
        img: 'https://i.pinimg.com/736x/15/52/d9/1552d94b1189d436fb998a189f7e2271.jpg',
        text: 'Ya descansados y aclimatados, el gran descenso: 64 km en bici desde La Cumbre (4.700 m) hasta los Yungas, con parada en el refugio de fauna La Senda Verde. Curvas, precipicios y selva.',
        facts: [['bike', 'Bici de montaña'], ['pin', 'La Senda Verde']],
        hotel: 'Hotel en La Paz · noche 5',
        tour: 'Death Road en bici + almuerzo (grupo)', tcost: '278.000',
        tl: [['Mañana', 'ascenso a La Cumbre + briefing'], ['Día', 'descenso de 64 km en bici'], ['Tarde', 'La Senda Verde y regreso']]
    },
    {
        n: '10', date: 'Mié 13 – Jue 14 ene', tag: 'Regreso · La Paz', title: 'HASTA EL PRÓXIMO VIAJE',
        img: 'https://i.pinimg.com/1200x/6f/e0/5e/6fe05e420faf33156cccdd7925f828e4.jpg',
        text: 'Última noche en La Paz y madrugada tranquila hacia el aeropuerto de El Alto para el vuelo de regreso. Sin correr: cerramos en la ciudad, con la tribu completa y Bolivia entera en la memoria.',
        facts: [['plane', 'Vuelo a Bogotá'], ['bus', 'Traslado al aeropuerto']],
        hotel: 'Vuelo de salida (madrugada)',
        tour: 'Traslado al aeropuerto de El Alto', tcost: 'incluido',
        tl: [['Madrugada', 'traslado a El Alto'], ['03:25', 'vuelo LPB → BOG'], ['06:10', 'llegada a Bogotá']]
    }
];

const ICONS = {
    pin: '<path d="M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10z"/><circle cx="12" cy="11" r="2"/>',
    bed: '<path d="M3 12v7M3 12h18v7M3 12V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4"/>',
    bus: '<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M7 20v-3M17 20v-3"/>',
    bike: '<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h4l-2 8M14 9l2-3h2"/>',
    boat: '<path d="M3 16h18l-2 4H5zM12 3v9M6 12l6-3 6 3"/>',
    mtn: '<path d="M3 20l6-11 4 6 2-3 6 8z"/>',
    train: '<rect x="6" y="4" width="12" height="12" rx="2"/><path d="M6 10h12M9 20l-2 2M15 20l2 2M9 16v4M15 16v4"/>',
    plane: '<path d="M21 15l-8-4V5a1.5 1.5 0 0 0-3 0v6l-8 4v2l8-2v3l-2 1.5V21l3-1 3 1v-1.5L13 18v-3l8 2z"/>'
};

const YES = ['Alojamiento 7 noches (hotel de sal Uyuni + 6 en La Paz)', 'Bus cama premium La Paz ↔ Uyuni (ida y vuelta)', 'Salar de Uyuni día completo en grupo', 'Copacabana + Isla del Sol (Lago Titicaca)', 'Dos montañas: Charquini y Pico Austria', 'Death Road en bici con equipo y guía', 'Parapente sobre los valles andinos', 'City tour La Paz + teleférico + Valle de la Luna', 'Guías profesionales locales en cada actividad'];
const NO = ['Vuelos internacionales', 'Seguro de asistencia médica (obligatorio)', 'Algunas comidas libres', 'Tour de estrellas opcional', 'Propinas y gastos personales'];

const NIGHTS = [
    ['Hotel Palacio de Sal 5★', 'Salar de Uyuni', 1, 'Noche del 6 ene · el mejor hotel de sal'],
    ['Hotel en La Paz', 'DREAM by Stannum', 5, 'Noches del 8, 9, 10, 11 y 12 ene'],
    ['Bus cama premium', 'La Paz ↔ Uyuni', 2, 'Noches del 5 y 7 ene · en ruta']
];

const ALT_PTS = [
    ['La Paz', 3600], ['Uyuni', 3660], ['La Paz', 3600], ['Titicaca', 3812],
    ['Charquini', 5024], ['Parapente', 3800], ['Yungas', 1100], ['Pico Austria', 5300], ['La Paz', 3600]
];

export const Bolivia = () => {

    // Reveal on scroll + nav solid
    useEffect(() => {
        window.scrollTo(0, 0);

        const nav = document.getElementById('bo-nav');
        const onScroll = () => nav && nav.classList.toggle('solid', window.scrollY > 40);
        window.addEventListener('scroll', onScroll);

        const io = new IntersectionObserver((es) => {
            es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { threshold: .12 });
        document.querySelectorAll('.bo-reveal').forEach(el => io.observe(el));

        return () => {
            window.removeEventListener('scroll', onScroll);
            io.disconnect();
        };
    }, []);

    // Altímetro SVG
    const alt = (() => {
        const W = 1000, H = 150, pad = 14, min = 800, max = 5600;
        const x = i => pad + i * ((W - pad * 2) / (ALT_PTS.length - 1));
        const y = v => H - pad - ((v - min) / (max - min)) * (H - pad * 2);
        let line = '', area = `M ${x(0)} ${H} `;
        ALT_PTS.forEach((p, i) => { line += (i ? 'L' : 'M') + ` ${x(i).toFixed(1)} ${y(p[1]).toFixed(1)} `; area += `L ${x(i).toFixed(1)} ${y(p[1]).toFixed(1)} `; });
        area += `L ${x(ALT_PTS.length - 1)} ${H} Z`;
        let dots = '';
        ALT_PTS.forEach((p, i) => {
            dots += `<circle class="bo-alt-dot" cx="${x(i).toFixed(1)}" cy="${y(p[1]).toFixed(1)}" r="4"/>`;
            const anchor = i === 0 ? 'start' : i === ALT_PTS.length - 1 ? 'end' : 'middle';
            dots += `<text class="bo-alt-val" x="${x(i).toFixed(1)}" y="${(y(p[1]) - 12).toFixed(1)}" text-anchor="${anchor}">${p[1].toLocaleString('es')}</text>`;
            dots += `<text class="bo-alt-label" x="${x(i).toFixed(1)}" y="${H - 2}" text-anchor="${anchor}">${p[0]}</text>`;
        });
        return `<defs><linearGradient id="boAltFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5c518" stop-opacity=".28"/><stop offset="1" stop-color="#f5c518" stop-opacity="0"/></linearGradient></defs><path d="${area}" fill="url(#boAltFill)"/><path d="${line}" fill="none" stroke="#f5c518" stroke-width="2" stroke-linejoin="round"/>${dots}`;
    })();

    const check = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
    const cross = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';

    return (
        <div className="bolivia-page">

            {/* HERO */}
            <header className="bo-hero">
                <div className="bo-hero-bg"></div>
                <div className="bo-hero-inner">
                    <span className="bo-eyebrow">Expedición Tribu 2600 · 5 – 14 Enero 2027</span>
                    <h1>SALAR DE<span className="l2">UYUNI</span></h1>
                    <p className="bo-hero-sub">Diez días donde el cielo se vuelve espejo, la carretera más temida se convierte en descenso y la montaña te dice de qué estás hecho. Empezamos por el gran salar y cerramos en las alturas de La Paz.</p>
                    <div className="bo-hero-meta">
                        <div className="item"><span className="k">Duración</span><span className="v">10 días<small> / 9 noches</small></span></div>
                        <div className="item"><span className="k">Nivel</span><span className="v">Exigente</span></div>
                        <div className="item"><span className="k">Altura máx.</span><span className="v">5.300<small> msnm</small></span></div>
                        <div className="item"><span className="k">Temporada</span><span className="v">Efecto espejo</span></div>
                    </div>
                </div>
                <div className="bo-scroll-cue"><span>Desliza</span><span className="bar"></span></div>
            </header>

            {/* INTRO */}
            <section className="bo-intro" id="bo-ruta">
                <div className="bo-intro-grid bo-reveal">
                    <div>
                        <div className="bo-section-label">La travesía</div>
                        <h2>DEL ESPEJO<br />A LA CUMBRE</h2>
                        <p>Llegamos a La Paz, la ciudad más alta del mundo, y nos lanzamos hasta el Salar de Uyuni en temporada de espejo: un desierto infinito que se convierte en cielo, donde cada paso parece de otro planeta. Dormimos en medio del salar y regresamos al norte con una aventura que simplemente no te puedes perder.</p>
                        <p>De vuelta, los Andes suben la apuesta: el lago Titicaca y la Isla del Sol, las cumbres de Charquini y Pico Austria, un vuelo en parapente sobre La Paz y la adrenalina de bajar en bici por el Camino de la Muerte. Todo con tiempo para respirar, disfrutar y recargar antes de la siguiente aventura. Terminamos en La Paz, pero con ganas de volver a empezar.</p>
                    </div>
                    <div className="bo-stat-stack">
                        <div className="row"><span className="n">10</span><span className="lbl">Días de expedición</span></div>
                        <div className="row"><span className="n">2<span className="u"> montañas</span></span><span className="lbl">Charquini · Pico Austria</span></div>
                        <div className="row"><span className="n">1<span className="u"> espejo</span></span><span className="lbl">El salar más grande del mundo</span></div>
                    </div>
                </div>

                <div className="bo-altimeter bo-reveal">
                    <div className="bo-altimeter-head">
                        <h3>Perfil de altitud</h3>
                        <span>La altura es el hilo de todo el viaje</span>
                    </div>
                    <div className="bo-alt-chart">
                        <svg viewBox="0 0 1000 150" preserveAspectRatio="none" dangerouslySetInnerHTML={{ __html: alt }} />
                    </div>
                </div>
            </section>

            {/* DÍAS */}
            <section className="bo-days" id="bo-dias">
                {DAYS.map((d, i) => {
                    const side = i % 2 ? 'right' : 'left';
                    return (
                        <article key={d.n} className={`bo-day ${side} bo-reveal`}>
                            <div className="bo-day-media">
                                <div className="ph" style={{ backgroundImage: `url('${d.img}')` }}></div>
                                <div className="bo-day-num">{d.n}<em>{d.tag}</em></div>
                            </div>
                            <div className="bo-day-body">
                                <div className="bo-day-date">Día {parseInt(d.n)} · {d.date}</div>
                                <h3>{d.title}</h3>
                                <p>{d.text}</p>
                                <div className="bo-day-facts">
                                    {d.facts.map((f, k) => (
                                        <span key={k} className="bo-fact">
                                            <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[f[0]] || ICONS.pin }} />
                                            <b>{f[1]}</b>
                                        </span>
                                    ))}
                                </div>
                                <div className="bo-day-logi">
                                    <div className="bo-logi"><span className="lk">Dónde duermes</span><span className="lv">{d.hotel}</span></div>
                                    <div className="bo-logi"><span className="lk">Actividad del día</span><span className="lv">{d.tour}</span></div>
                                </div>
                                <ul className="bo-day-timeline">
                                    {d.tl.map((t, k) => (
                                        <li key={k}><b>{t[0]}</b> — {t[1]}</li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    );
                })}
            </section>

            {/* HOTELES */}
            <section className="bo-lodging" id="bo-hoteles">
                <div className="bo-reveal">
                    <div className="bo-section-label">Dónde dormir</div>
                    <h2>EL ALOJAMIENTO<br />TAMBIÉN ES EL VIAJE</h2>
                    <p className="bo-lede">No elegimos simplemente dónde dormir. En los puntos que importan, elegimos dormir dentro del paisaje: en el corazón del salar y frente al Titicaca.</p>
                </div>
                <div className="bo-hotel-grid">
                    <article className="bo-hotel bo-reveal">
                        <div className="img" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfojX2W-VAGkznDaBl58Oa-dBJ8Ph6oP1z-D2HeTValOYf7XpPGXEutrQ&s=10')" }}></div>
                        <div className="in">
                            <div className="place">Salar de Uyuni</div>
                            <h4>Hotel Palacio de Sal</h4>
                            <div className="stars">★★★★★</div>
                            <div className="rate">5★ · construido 100% en sal</div>
                            <p>Construido en bloques de sal al borde del salar. Dormir dentro del paisaje, literal. (Alternativa: Casa de Sal.)</p>
                            <span className="premium">Premium</span>
                        </div>
                    </article>
                    <article className="bo-hotel bo-reveal">
                        <div className="img" style={{ backgroundImage: "url('https://media.tacdn.com/media/attractions-splice-spp-674x446/0f/63/19/a4.jpg')" }}></div>
                        <div className="in">
                            <div className="place">La Paz ↔ Uyuni</div>
                            <h4>Bus cama premium</h4>
                            <div className="stars">★★★</div>
                            <div className="rate">2 noches en ruta · ida y vuelta</div>
                            <p>Bus cama de lujo con asientos reclinables, mantas, calefacción y wifi. Dormimos en ruta y ganamos días completos para el salar sin perder tiempo.</p>
                        </div>
                    </article>
                    <article className="bo-hotel bo-reveal">
                        <div className="img" style={{ backgroundImage: "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/749428852.jpg?k=a72e1d8ca01220c011d421a8b03ef2a1a4fd01257748fb76106a08511075c2ce&o=')" }}></div>
                        <div className="in">
                            <div className="place">La Paz</div>
                            <h4>DREAM by Stannum / Casa Fusión</h4>
                            <div className="stars">★★★★</div>
                            <div className="rate">9,0 · Fantástico (298 reseñas)</div>
                            <p>Boutique cómodo y bien ubicado en el corazón de la ciudad. Tu base para explorar La Paz y descansar antes del vuelo.</p>
                        </div>
                    </article>
                </div>
            </section>

            {/* INCLUYE */}
            <section className="bo-includes" id="bo-incluye">
                <div className="bo-inc-grid">
                    <div className="bo-inc-col bo-reveal">
                        <h3 className="yes">Incluye</h3>
                        <ul className="yes">
                            {YES.map((t, k) => (
                                <li key={k}><span dangerouslySetInnerHTML={{ __html: check }} /><span>{t}</span></li>
                            ))}
                        </ul>
                    </div>
                    <div className="bo-inc-col bo-reveal">
                        <h3 className="no">No incluye</h3>
                        <ul className="no">
                            {NO.map((t, k) => (
                                <li key={k}><span dangerouslySetInnerHTML={{ __html: cross }} /><span>{t}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* RESUMEN DE NOCHES */}
            <section className="bo-costs">
                <div className="bo-reveal">
                    <div className="bo-section-label">Resumen de noches</div>
                    <h2 style={{ fontSize: 'clamp(24px,3.6vw,38px)', textTransform: 'uppercase', marginBottom: '24px' }}>CUÁNTAS NOCHES EN CADA HOTEL</h2>
                </div>
                <div className="bo-nights-grid">
                    {NIGHTS.map((h, k) => (
                        <div key={k} className="bo-night-card">
                            <span className="np">{h[1]}</span>
                            <span className="nh">{h[0]}</span>
                            <span className="nn">{h[2]} <small>noche{h[2] > 1 ? 's' : ''}</small></span>
                            <span className="nd">{h[3]}</span>
                        </div>
                    ))}
                    <div className="bo-night-card" style={{ borderColor: 'rgba(245,197,24,.3)', background: 'rgba(245,197,24,.06)' }}>
                        <span className="np">Total</span>
                        <span className="nh">9 noches</span>
                        <span className="nn">10 <small>días</small></span>
                        <span className="nd">5 al 14 de enero de 2027</span>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bo-footer">
                <div className="bo-logo">TRIBU <span>2600</span></div>
                <div className="bo-tag">Nacimos para explorar</div>
                <div className="bo-contact"><span>@tribu2600</span><a href="#">Contáctanos</a></div>
                <p className="bo-fine">Enero es temporada de lluvia en el altiplano: el efecto espejo del salar es más probable, y algunos traslados pueden ajustarse por clima. La ascensión al nevado depende de las condiciones del grupo y del tiempo. Itinerario de referencia sujeto a cambios operativos.</p>
            </footer>
        </div>
    );
};