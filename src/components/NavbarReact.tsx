import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

const standaloneLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Precios", href: "#precios" },
];

const nosotrosItems = [
  { label: "Sobre mí",    href: "#about",       description: "Quién está detrás de CalPel" },
  { label: "Proceso",     href: "#proceso",      description: "Cómo trabajamos juntos" },
  { label: "Testimonios", href: "#testimonios",  description: "Lo que dicen nuestros clientes" },
  { label: "FAQ",         href: "#faq",          description: "Preguntas frecuentes" },
];

const contactLink = { label: "Contacto", href: "#contacto" };

const mobileLinks = [
  ...standaloneLinks,
  ...nosotrosItems.map(({ label, href }) => ({ label, href })),
  contactLink,
];

const mobileMenuVariants = {
  closed: { height: 0, opacity: 0, transition: { duration: 0.3, ease: EASE_DRAWER } },
  open:   { height: "auto", opacity: 1, transition: { duration: 0.35, ease: EASE_DRAWER } },
};

const mobileLinkVariants = {
  closed: { opacity: 0, x: -12 },
  open: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: EASE_OUT },
  }),
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [pill, setPill]                 = useState<{ left: number; width: number } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeHref, setActiveHref]     = useState<string>("");
  const ulRef            = useRef<HTMLUListElement>(null);
  const dropdownTimer    = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isNavigatingRef  = useRef(false);
  const navLockTimer     = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const allHrefs = [
      ...standaloneLinks,
      ...nosotrosItems,
      contactLink,
    ].map(l => l.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigatingRef.current) return;
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    allHrefs.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navigate = (href: string) => {
    setMobileOpen(false);
    setDropdownOpen(false);
    // Lock observer during programmatic scroll to avoid flicker
    isNavigatingRef.current = true;
    setActiveHref(href);
    clearTimeout(navLockTimer.current);
    navLockTimer.current = setTimeout(() => { isNavigatingRef.current = false; }, 1000);

    setTimeout(() => {
      if (href === "/" || href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
      const el = document.getElementById(href.replace("#", ""));
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
    }, 80);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigate(href);
  };

  const openDropdown  = () => { clearTimeout(dropdownTimer.current); setDropdownOpen(true); };
  const closeDropdown = () => { dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 120); };

  const trackPill = (el: Element) => {
    if (!ulRef.current) return;
    const { left: lLeft, width: lWidth } = el.getBoundingClientRect();
    const { left: uLeft } = ulRef.current.getBoundingClientRect();
    setPill({ left: lLeft - uLeft, width: lWidth });
  };

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none"
      style={{
        paddingTop:    scrolled ? 12 : 0,
        paddingLeft:   scrolled ? 16 : 0,
        paddingRight:  scrolled ? 16 : 0,
        transition: "padding 0.45s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      <motion.div
        animate={{
          borderRadius:    scrolled ? (mobileOpen ? 24 : 9999) : 0,
          boxShadow:       scrolled ? "0 8px 40px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.07)" : "none",
          // rgba literal (no var()) a propósito: Framer Motion necesita canales numéricos para interpolar la opacidad — mirror de --navbar-bg
          backgroundColor: scrolled ? "rgba(8,8,24,0.85)" : "rgba(8,8,24,0)",
        }}
        transition={{ default: { duration: 0.45, ease: EASE_OUT }, borderRadius: { duration: 0 } }}
        className="backdrop-blur-xl pointer-events-auto relative"
        style={{
          width: scrolled ? "min(920px, calc(100% - 32px))" : "90%",
          transition: "width 0.45s cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        {/* ── Header row ── */}
        <div
          className="w-full flex items-center justify-between"
          style={{
            paddingLeft:   scrolled ? 24 : "8%",
            paddingRight:  scrolled ? 24 : "8%",
            paddingTop:    scrolled ? 10 : 16,
            paddingBottom: scrolled ? 10 : 16,
            transition: "padding 0.45s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          {/* Logo */}
          <a href="/" onClick={(e) => handleClick(e, "/")}>
            <img
              src="/logo-horizontal-dark.svg"
              alt="CalPel.dev"
              style={{
                height: scrolled ? "1.85rem" : "1.6rem",
                width: "auto", display: "block",
                transition: "height 0.45s cubic-bezier(0.23,1,0.32,1)",
              }}
            />
          </a>

          {/* ── Desktop nav ── */}
          <ul
            ref={ulRef}
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setPill(null)}
          >
            {/* Sliding pill */}
            <AnimatePresence>
              {pill && (
                <motion.div
                  className="absolute top-1/2 h-8 rounded-full pointer-events-none"
                  style={{ background: "rgba(255,255,255,0.08)", translateY: "-50%" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, left: pill.left, width: pill.width }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                />
              )}
            </AnimatePresence>

            {/* Standalone links */}
            {standaloneLinks.map((l) => {
              const isActive = activeHref === l.href;
              return (
                <li key={l.href} className="relative">
                  <a
                    href={l.href}
                    onClick={(e) => handleClick(e, l.href)}
                    onMouseEnter={(e) => trackPill(e.currentTarget)}
                    className={`relative z-10 block px-3 py-1.5 text-sm transition-colors duration-200 ${
                      isActive ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-accent"
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                    />
                  )}
                </li>
              );
            })}

            {/* ── Nosotros dropdown ── */}
            <li
              className="relative"
              onMouseEnter={(e) => {
                openDropdown();
                const btn = e.currentTarget.querySelector("button");
                if (btn) trackPill(btn);
              }}
              onMouseLeave={closeDropdown}
            >
              {nosotrosItems.some(i => i.href === activeHref) && (
                <motion.span
                  layoutId="nav-active-dot"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-accent"
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                />
              )}
              <button className={`relative z-10 flex items-center gap-1 px-3 py-1.5 text-sm transition-colors duration-200 ${
                nosotrosItems.some(i => i.href === activeHref) ? "text-white" : "text-white/60 hover:text-white"
              }`}>
                Nosotros
                <motion.svg
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className="h-3 w-3 mt-px"
                  viewBox="0 0 12 12" fill="none" aria-hidden="true"
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0,   scale: 1 }}
                    exit={{    opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                    style={{ transformOrigin: "50% 0%" }}
                    className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-64 z-50"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    {/* Arrow */}
                    <div
                      className="absolute -top-[7px] left-1/2 -translate-x-1/2 h-3.5 w-3.5 rotate-45 rounded-[3px] bg-bg-secondary/[0.97]"
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                        transform: "translateX(-50%) rotate(45deg)",
                      }}
                    />
                    {/* Panel */}
                    <div
                      className="relative rounded-2xl overflow-hidden bg-bg-secondary/[0.97]"
                      style={{
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
                      }}
                    >
                      {/* Accent top line */}
                      <div className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

                      <div className="p-2">
                        {nosotrosItems.map((item) => (
                          <button
                            key={item.href}
                            onClick={() => navigate(item.href)}
                            className="group w-full flex items-start gap-3 rounded-xl px-3.5 py-3 text-left cursor-pointer transition-colors duration-150 hover:bg-white/5"
                          >
                            {/* Dot */}
                            <span
                              className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200 group-hover:scale-125"
                              style={{ background: "rgba(124,82,232,0.45)" }}
                            />
                            <div>
                              <p className="text-sm font-medium leading-snug text-white/70 transition-colors duration-150 group-hover:text-white">
                                {item.label}
                              </p>
                              <p className="mt-0.5 text-xs leading-snug text-white/35 transition-colors duration-150 group-hover:text-white/55">
                                {item.description}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Separator */}

            <li className="h-4 w-px bg-white/15 mx-2" aria-hidden />

            {/* Contacto CTA */}
            <li>
              <motion.a
                href={contactLink.href}
                onClick={(e) => handleClick(e, contactLink.href)}
                whileTap={{ scale: 0.93 }}
                className="group relative block cursor-pointer overflow-hidden rounded-full border border-accent/50 px-4 py-1.5 text-sm font-semibold text-white/90 transition-[border-color,color] duration-300 hover:border-transparent hover:text-white"
              >
                <span className="absolute inset-0 origin-bottom scale-0 rounded-full bg-accent transition-transform duration-300 ease-out group-hover:scale-100" aria-hidden="true" />
                <span className="relative z-10">{contactLink.label}</span>
              </motion.a>
            </li>
          </ul>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden flex h-11 w-11 items-center justify-center text-white/70 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{    rotate: 90,  opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="block text-lg"
              >
                {mobileOpen ? "✕" : "☰"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed" animate="open" exit="closed"
              className="md:hidden overflow-hidden"
            >
              <ul className="flex flex-col gap-1 px-4 pb-4 border-t border-white/10 pt-3">
                {mobileLinks.map((l, i) => (
                  <motion.li key={l.href} custom={i} variants={mobileLinkVariants} initial="closed" animate="open" exit="closed">
                    <a
                      href={l.href}
                      onClick={(e) => { e.preventDefault(); navigate(l.href); }}
                      className="flex min-h-[44px] items-center px-3 py-2.5 rounded-md text-sm text-white/70 hover:text-white hover:bg-accent/10 transition-colors"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
