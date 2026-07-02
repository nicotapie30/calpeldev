import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import type { ProcessStep } from "../data/process";

function TimelineLabel({ scrollYProgress, index, total, number }: {
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
  number: string;
}) {
  const pos = index / (total - 1);
  const step = 1 / (total - 1);
  const color = useTransform(
    scrollYProgress,
    [Math.max(0, pos - step * 0.4), pos],
    ["rgba(255,255,255,0.15)", "rgba(124,82,232,0.65)"]
  );
  return (
    <motion.span
      className="font-mono text-[10px] uppercase tracking-[0.12em]"
      style={{ color }}
    >
      {number}
    </motion.span>
  );
}

function StepNumber({ stepProgress, index, number }: {
  stepProgress: MotionValue<number>;
  index: number;
  number: string;
}) {
  const opacity = useTransform(stepProgress, [index - 1.1, index, index + 1.1], [0.03, 0.13, 0.03]);
  return (
    <motion.span
      className="pointer-events-none absolute right-[8vw] top-1/2 -translate-y-1/2 select-none font-mono font-bold leading-none text-accent"
      style={{ fontSize: "clamp(10rem, 25vw, 28rem)", opacity, textShadow: "0 0 60px rgba(124,82,232,0.25)" }}
      aria-hidden="true"
    >
      {number}
    </motion.span>
  );
}

interface Props {
  steps: ProcessStep[];
}

export default function ProcessHorizontal({ steps }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);

  const [vw, setVw] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  React.useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Zona muerta inicial: primer 10% de scroll no mueve el carrusel
  const delay = 0.1;
  const activeProgress = useTransform(scrollYProgress, [0, delay, 1], [0, 0, 1]);

  const x = useTransform(
    activeProgress,
    [0, 1],
    [0, -(steps.length - 1) * vw]
  );

  const stepProgress = useTransform(activeProgress, [0, 1], [0, steps.length - 1]);
  const [activeIdx, setActiveIdx] = React.useState(0);
  useMotionValueEvent(stepProgress, "change", (v) => setActiveIdx(Math.round(v)));

  // Reduced motion: nada de scroll-jacking horizontal pineado — lista estática simple.
  if (prefersReducedMotion) {
    return (
      <div className="mx-auto max-w-2xl px-[10vw] py-24 xl:px-32">
        <ol className="flex flex-col gap-12">
          {steps.map((step) => (
            <li key={step.number} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
                  {step.number}
                </span>
                <span className="h-px w-8 bg-accent/40" />
              </div>
              <p className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-text-primary">
                {step.title}
              </p>
              <p className="text-lg leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    // Outer: scroll target — height = N viewports (one per step)
    <div ref={ref} style={{ height: `${steps.length * 100}dvh` }} className="relative">

      {/* Inner: sticky viewport — stays fixed while user scrolls */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden">

        {/* Horizontal track */}
        <motion.div
          className="flex h-full"
          style={{ x, width: `${steps.length * 100}vw` }}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex h-full w-[100vw] flex-col justify-center"
            >
              <StepNumber stepProgress={stepProgress} index={i} number={step.number} />

              {/* Content */}
              <div className="relative z-10 max-w-2xl px-[10vw] xl:px-32">
                {/* Step counter */}
                <div className="mb-8 flex items-center gap-3">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
                    {step.number}
                  </span>
                  <span className="h-px w-8 bg-accent/40" />
                  <span className="font-mono text-[11px] text-text-faint">
                    {String(steps.length).padStart(2, "0")} pasos
                  </span>
                </div>

                <p className="mb-6 text-[clamp(2.4rem,4.5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-text-primary">
                  {step.title}
                </p>

                <p className="text-lg leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Timeline sutil — fondo inferior */}
        <div className="absolute bottom-0 left-0 right-0 px-[10vw] xl:px-32 pb-8">
          {/* Step labels */}
          <div className="mb-3 flex justify-between">
            {steps.map((step, i) => (
              <TimelineLabel
                key={i}
                scrollYProgress={activeProgress}
                index={i}
                total={steps.length}
                number={step.number}
              />
            ))}
          </div>
          {/* Track line + fill */}
          <div className="relative h-px w-full rounded-full bg-white/10">
            <motion.div
              className="absolute left-0 top-0 h-full w-full rounded-full origin-left bg-accent"
              style={{ scaleX: activeProgress }}
            />
          </div>
        </div>

        {/* Scroll hint — only on first panel */}
        <div
          className={`absolute bottom-10 right-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-text-faint transition-opacity duration-300 ${
            activeIdx === 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          <span>seguí scrolleando</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>
    </div>
  );
}
