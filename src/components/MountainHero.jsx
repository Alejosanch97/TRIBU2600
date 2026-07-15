import { useRef, useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import "../Styles/MountainHero.css";

const SCENE = 'https://prod.spline.design/8uJEw1Qtg5dF3cln/scene.splinecode';
const CAMERA_NAME = 'Camera 18';
const ORBIT_TURNS = 0.8;


const HOTSPOTS = [
  { id: 1, at: 0.22, x: '24%', y: '55%', title: 'ACATENANGO', text: 'Erupción cada 20 minutos. Dormimos frente al Fuego.' },
];

export const MountainHero = ({ onExplore }) => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);       // ⬅️ NUEVO: ref al wrapper de Spline
  const camRef = useRef(null);
  const baseRef = useRef(null);
  const rafRef = useRef(null);

  const targetP = useRef(0);
  const currentP = useRef(0);
  const loopRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [armed, setArmed] = useState(false);

  const onLoad = (spline) => {
    const cam = spline.findObjectByName(CAMERA_NAME);

    if (!cam) {
      console.warn(`⚠️ No encontré "${CAMERA_NAME}". Objetos:`);
      console.log(spline.getAllObjects().map(o => o.name));
      setReady(true);
      return;
    }

    const { x, y, z } = cam.position;
    baseRef.current = {
      y,
      radius: Math.sqrt(x * x + z * z),
      angle: Math.atan2(x, z),
    };
    camRef.current = cam;
    setReady(true);
  };

  /* ============================================
     ⚠️ EL FIX: interceptamos el "wheel" ANTES
     de que Spline lo capture, y lo reenviamos
     a la ventana. El mousemove pasa intacto.
     ============================================ */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onWheel = (e) => {
      e.stopPropagation();
      window.scrollBy({ top: e.deltaY, behavior: 'instant' });
    };

    wrapper.addEventListener('wheel', onWheel, { capture: true, passive: true });

    return () => {
      wrapper.removeEventListener('wheel', onWheel, { capture: true });
    };
  }, []);        // ⬅️ ERA [ready]. Ahora [] — se monta de inmediato.

  /* Loop de la órbita */
  useEffect(() => {
    const loop = () => {
      loopRef.current = requestAnimationFrame(loop);
      currentP.current += (targetP.current - currentP.current) * 0.08;

      const cam = camRef.current;
      const base = baseRef.current;
      if (!cam || !base) return;

      const p = currentP.current;
      const angle = base.angle + p * Math.PI * 2 * ORBIT_TURNS;

      cam.position.x = Math.sin(base.angle) * base.radius;
      cam.position.z = Math.cos(base.angle) * base.radius;
      cam.position.y = base.y 

      if (cam.lookAt) cam.lookAt(0, 0, 0);
    };

    loopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(loopRef.current);
  }, []);

  /* Scroll -> progreso */
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const el = sectionRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        // usa la altura del sticky, no window.innerHeight
        const vh = el.firstElementChild?.offsetHeight || window.innerHeight;
        const total = el.offsetHeight - vh;
        const p = Math.min(Math.max(-rect.top / total, 0), 1);

        targetP.current = p;
        setProgress(p);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="mountain-hero">
      <div className="mountain-sticky">

        {/* ⬅️ pointer-events ACTIVO: el mousemove llega a Spline */}
        <div className="spline-wrapper" ref={wrapperRef}>
          <Spline scene={SCENE} onLoad={onLoad} />
        </div>

        {!ready && (
          <div className="loader-3d">
            <div className="loader-num">TRIBU 2600</div>
            <div className="loader-bar"><span className="loader-indet" /></div>
          </div>
        )}

        <div className="mountain-vignette" />
        <div className="spline-logo-cover" />

        <div className="mountain-overlay">
          <div
            className="hero-text-block"
            style={{
              opacity: Math.max(0, 1),

            }}
          >
            <h1 className="hero-title-3d">
              <span className="line-1">TRIBU 2600</span>
              <span className="line-2">EL MUNDO ESPERA.</span>
            </h1>

            <p className="hero-sub-3d">
              NACIMOS PARA EXPLORAR.
            </p>
          </div>

          <button
            className="btn-orbit"
            onClick={onExplore}
            style={{ opacity: Math.max(0, 1) }}
          >
            <span className="btn-orbit-ring" />
            <span className="btn-orbit-arc" />
            <span className="btn-orbit-core">
              MIRA LOS<br />DESTINOS
            </span>
          </button>

        </div>

      </div>
    </section>
  );
};