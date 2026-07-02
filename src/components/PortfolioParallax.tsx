import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import type { Project } from "../data/projects";

// PortfolioParallax recibe los projects con `image` ya resuelto a un string
// (optimizado vía astro:assets getImage() en Portfolio.astro), no el ImageMetadata crudo.
type ParallaxProject = Omit<Project, "image"> & { image: string | null };

interface Props {
  projects: ParallaxProject[];
}

export default function PortfolioParallax({ projects }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const real = projects.filter((p) => !p.reserved);
  const row1 = [...real].reverse();
  const row2 = real;
  const row3 = [...real].reverse();

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const spring = { stiffness: 300, damping: 30, bounce: 100 };

  // Fase 1 (0–0.15): 3D tilt se aplana + fade in
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.15], [15, 0]),  spring);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.15], [20, 0]),  spring);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.15], [0.2, 1]), spring);

  // Fase 2 (0–0.65): cards se deslizan horizontalmente
  const translateX        = useSpring(useTransform(scrollYProgress, [0, 0.85], [0,    500]), spring);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 0.85], [0,   -500]), spring);

  // Fase 3 (0.4–0.85): Y empieza después del X — da más tiempo de vista
  const translateY = useSpring(useTransform(scrollYProgress, [0.4, 0.85], [0, -400]), spring);

  // Reduced motion: nada de scroll-jacking pineado — grid estático simple.
  if (prefersReducedMotion) {
    return (
      <div className="mx-auto grid max-w-[1440px] grid-cols-3 gap-8 px-8 py-16">
        {real.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    );
  }

  return (
    // Contenedor exterior: define la duración del scroll (más alto = más tiempo en pantalla)
    <div ref={ref} className="relative mx-auto h-[550vh] max-w-[1440px]">

      {/* Contenido sticky: se queda fijo mientras el usuario scrollea por h-[400vh] */}
      <div
        className="sticky top-0 h-[100dvh] antialiased [perspective:1000px] [transform-style:preserve-3d]"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <motion.div style={{ rotateX, rotateZ, translateY, opacity }} className="pt-56">
          <motion.div className="mb-16 flex flex-row-reverse space-x-reverse space-x-12">
            {row1.map((p) => (
              <ProjectCard key={p.name + "-r1"} project={p} translate={translateX} />
            ))}
          </motion.div>
          <motion.div className="mb-16 flex flex-row space-x-12">
            {row2.map((p) => (
              <ProjectCard key={p.name + "-r2"} project={p} translate={translateXReverse} />
            ))}
          </motion.div>
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-12">
            {row3.map((p) => (
              <ProjectCard key={p.name + "-r3"} project={p} translate={translateX} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  translate,
}: {
  project: ParallaxProject;
  translate?: MotionValue<number>;
}) {
  const inner = (
    <>
      {/* Chrome bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 border-b border-white/[0.06] bg-[#0c0c22] px-3 py-2 flex-shrink-0">
        <span className="h-2 w-2 rounded-full bg-[#6b3535]" />
        <span className="h-2 w-2 rounded-full bg-[#5c4f2a]" />
        <span className="h-2 w-2 rounded-full bg-[#2a4a35]" />
        <span className="ml-2 flex-1 rounded bg-[#080818] px-2 py-0.5 font-mono text-[9px] text-[#3A3A5C] truncate">
          {project.link?.replace('https://', '') ?? project.name.toLowerCase().replace(/\s+/g, '-') + '.vercel.app'}
        </span>
      </div>

      {/* Screenshot — escala full-page a tamaño card */}
      <div className="absolute inset-0 top-[30px] overflow-hidden bg-bg-surface">
        {project.image ? (
          <img
            src={project.image}
            alt={`Captura del proyecto ${project.name}`}
            loading="lazy"
            style={{
              position: 'absolute',
              top: '10px',
              left: '-52px',
              width: '540%',
              maxWidth: 'none',
              height: 'auto',
              transform: 'scale(0.239)',
              transformOrigin: 'top left',
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-bg-surface to-bg-primary" />
        )}
      </div>

      {/* overlay + info en hover */}
      <div className="pointer-events-none absolute inset-0 top-[30px] bg-bg-primary opacity-0 transition-opacity duration-300 group-hover/card:opacity-80" />
      <div className="absolute bottom-4 left-4 right-4 top-[30px] flex flex-col justify-end translate-y-2 opacity-0 transition-[opacity,transform] duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
        <p className="text-sm font-semibold text-text-primary">{project.name}</p>
        <p className="mt-0.5 text-xs text-text-secondary">{project.type}</p>
      </div>
    </>
  );

  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -16 }}
      className="group/card relative h-64 w-[22rem] shrink-0 overflow-hidden rounded-xl border border-border-base"
    >
      {project.link ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  );
}
