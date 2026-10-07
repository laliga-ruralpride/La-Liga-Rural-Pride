import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { Toaster, toast } from "sonner";
import {
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Play,
  ChevronDown,
  ChevronUp,
  Music,
  Users,
  Calendar,
  CheckCircle,
  Download,
  ShoppingBag,
  Menu,
  X
} from "lucide-react";
import bandData from "./data/bandData.json";
import epData from "./data/ep.json";

// Cookie Banner
const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookiesAccepted");
    if (!hasAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#050505] border-t border-[#333333] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
      <p className="text-[#eeeeee] text-sm md:text-base font-mono">
        Utilizamos cookies (las justas y necesarias) para que la web funcione correctamente y
        podamos organizar mejores conciertos. Si te quedas, entendemos que te parece bien.
      </p>
      <div className="flex gap-4 shrink-0">
        <button
          onClick={acceptCookies}
          className="bg-[#E11D48] text-[#eeeeee] font-['Anton'] tracking-wider px-6 py-2 uppercase hover:bg-[#b01335] transition-colors"
        >
          ¡A darle caña!
        </button>
      </div>
    </div>
  );
};

// Scroll To Top Button
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className="fixed bottom-6 md:bottom-24 right-4 z-40 bg-[#E11D48] text-[#eeeeee] p-3 rounded-full shadow-lg hover:bg-[#b01335] transition-all transform hover:scale-110"
    >
      <ChevronUp size={24} />
    </button>
  );
};

// Navigation Component
const Navigation = ({ activeSection, onNavigate, isMenuOpen, setIsMenuOpen }) => {
  const navItems = [
    { id: "hero", label: "Inicio" },
    { id: "bio", label: "Biografía" },
    { id: "discography", label: "Discografía" },
    { id: "gigs", label: "Conciertos" },
    { id: "gallery", label: "Galería" },
    { id: "booking", label: "Contrataciones" },
    { id: "contact", label: "Contacto" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-[#333333]">
      <div className="container-punk">
        <div className="flex items-center justify-between h-16">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("hero");
            }}
            className="font-['Anton'] text-2xl tracking-tight text-[#E11D48]"
            data-testid="nav-logo"
          >
            LA LIGA RURAL PRIDE
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.slice(1).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className={`nav-link ${activeSection === item.id ? "nav-link-active" : ""}`}
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#eeeeee] p-2.5 -mr-2.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-toggle"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#333333]">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block py-3 nav-link nav-link-mobile ${
                  activeSection === item.id ? "nav-link-active" : ""
                }`}
                data-testid={`mobile-nav-${item.id}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = ({ bandInfo, onNavigate }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={process.env.PUBLIC_URL + "/images/portada.jpg"}
          alt="La Liga en concierto"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#050505]/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 stagger-children">
        <p className="hero-subtitle mb-4 opacity-0 fade-in-up" data-testid="hero-subtitle">
          {bandInfo.subtitle}
        </p>
        <h1 className="hero-title mb-8 opacity-0 fade-in-up glitch" data-testid="hero-title">
          {bandInfo.name}
        </h1>
        <p className="font-mono text-[#888888] text-sm mb-12 tracking-widest opacity-0 fade-in-up">
          SEGOVIA • DESDE {bandInfo.year}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 fade-in-up">
          <button
            onClick={() => onNavigate("discography")}
            className="btn-punk-solid pulse-red"
            data-testid="hero-cta-listen"
          >
            <span className="flex items-center justify-center gap-2">
              <Play size={18} /> Escuchar Ahora
            </span>
          </button>
          <button
            onClick={() => onNavigate("booking")}
            className="btn-punk"
            data-testid="hero-cta-booking"
          >
            Contrataciones
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-[#E11D48]" />
      </div>
    </section>
  );
};

// Bio Section
const BioSection = ({ bandInfo, members }) => {
  return (
    <section id="bio" className="py-24 bg-[#050505]" data-testid="bio-section">
      <div className="container-punk">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text Content */}
          <div>
            <h2 className="section-title text-[#eeeeee] mb-8">Biografía</h2>
            <p className="font-mono text-[#eeeeee] leading-relaxed mb-6">{bandInfo.bio}</p>
            <p className="font-mono text-[#888888] leading-relaxed mb-8">{bandInfo.bioExtended}</p>
            <p className="handwritten text-xl">
              "El público es un componente más de la banda"
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={process.env.PUBLIC_URL + "/images/laliga.jpg"}
              alt="La Liga Rural Pride banda"
              className="w-full aspect-square lg:aspect-auto lg:h-[500px] object-cover border border-[#333333]"
            />
            <div className="absolute -bottom-4 right-0 lg:-right-4 bg-[#E11D48] p-3 lg:p-4">
              <p className="font-['Anton'] text-3xl lg:text-4xl">{bandInfo.year}</p>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="mt-24">
          <h3 className="font-['Anton'] text-3xl uppercase mb-8 flex items-center gap-3">
            <Users className="text-[#E11D48]" size={28} />
            Los Miembros
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {members.map((member, index) => (
              <div key={index} className="member-card card-punk" data-testid={`member-${index}`}>
                <p className="member-name">{member.name}</p>
                <p className="member-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Discography Section
const DiscographySection = ({ ep, featuredSingle, discography, bandInfo }) => {
  return (
    <section id="discography" className="py-24 bg-[#0a0a0a]" data-testid="discography-section">
      <div className="container-punk">
        <h2 className="section-title text-[#eeeeee] mb-4">Discografía</h2>
        <p className="font-mono text-[#888888] mb-16 max-w-xl">
          Nuestros lanzamientos oficiales.
        </p>

        {/* EP completo */}
        {ep && (
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24" data-testid="ep-featured">
            <img
              src={process.env.PUBLIC_URL + ep.cover}
              alt={`Portada del EP ${ep.title}`}
              loading="lazy"
              className="w-full max-w-md mx-auto lg:max-w-none aspect-square object-cover border border-[#333333]"
            />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#E11D48] mb-2">
                {ep.label}
              </p>
              <h3 className="font-['Anton'] text-4xl md:text-5xl uppercase mb-8">{ep.title}</h3>

              <ol className="border-t border-[#333333] mb-8">
                {ep.tracks.map((track, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-x-4 gap-y-1 py-3 border-b border-[#333333]"
                    data-testid={`ep-track-${index}`}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-['Anton'] text-xl text-[#E11D48] w-8">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-['Anton'] text-2xl uppercase">{track.title}</span>
                    </span>
                    <span className="font-mono text-xs text-[#888888] pl-12 sm:pl-0 sm:ml-auto sm:text-right">
                      {track.note}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="font-mono text-sm space-y-2">
                <p className="text-[#eeeeee]">
                  <span className="text-[#E11D48] uppercase">Lanzamiento:</span> {ep.release} ·
                  Spotify y todas las plataformas
                </p>
                <p className="text-[#eeeeee]">
                  <span className="text-[#E11D48] uppercase">Presentación:</span> {ep.presentation}
                </p>
                <p className="text-[#888888] text-xs pt-2">{ep.credits}</p>
              </div>
            </div>
          </div>
        )}

        {/* Single destacado con videoclip */}
        {featuredSingle && (
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24" data-testid="single-featured">
            <div className="aspect-video w-full border border-[#333333] bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${featuredSingle.youtubeId}`}
                title={`Videoclip ${featuredSingle.title}`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#E11D48] mb-2">
                {featuredSingle.label}
              </p>
              <h3 className="font-['Anton'] text-4xl md:text-5xl uppercase mb-6">
                {featuredSingle.title}
              </h3>
              <p className="font-mono text-[#888888] mb-8">{featuredSingle.description}</p>
              <a
                href={`https://www.youtube.com/watch?v=${featuredSingle.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-punk inline-flex items-center gap-2"
                data-testid="single-youtube-link"
              >
                <Youtube size={18} /> Ver en YouTube
              </a>
            </div>
          </div>
        )}

        <h3 className="font-['Anton'] text-3xl uppercase mb-8">Singles</h3>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
          {discography.map((album, index) => (
            <div
              key={index}
              className="card-punk album-card p-0 overflow-hidden"
              data-testid={`album-${index}`}
            >
              <div className="album-cover">
                <img src={process.env.PUBLIC_URL + album.cover} alt={album.title} loading="lazy" />
                <div className="album-overlay">
                  <span className="text-[#E11D48] font-mono text-xs">{album.year}</span>
                  <h3 className="font-['Anton'] text-2xl uppercase">{album.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="font-mono text-[#888888] text-sm mb-4">{album.description}</p>
                {album.spotifyEmbed && (
                  <div className="spotify-embed">
                    <iframe
                      src={album.spotifyEmbed}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allowFullScreen=""
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={`Spotify ${album.title}`}
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Music Links */}
        <div className="mt-16 flex flex-wrap gap-4 justify-center">
          <a
            href={bandInfo.social.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-punk flex items-center gap-2"
            data-testid="spotify-link"
          >
            <Music size={18} /> Spotify
          </a>
          <a
            href={bandInfo.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-punk flex items-center gap-2"
            data-testid="youtube-link"
          >
            <Youtube size={18} /> YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

// Gigs Section
const GigsSection = ({ gigs }) => {
  return (
    <section id="gigs" className="py-24 bg-[#050505]" data-testid="gigs-section">
      <div className="container-punk">
        <h2 className="section-title text-[#eeeeee] mb-16">Próximos Conciertos</h2>

        {gigs.length > 0 ? (
          <div className="space-y-4">
            {gigs.map((gig, index) => (
              <div
                key={index}
                className="card-punk flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-[#1a1a1a]"
              >
                <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                  <div className="text-center md:text-left min-w-[120px]">
                    <p className="font-['Anton'] text-3xl text-[#E11D48]">
                      {new Date(gig.date).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short"
                      })}
                    </p>
                    <p className="font-mono text-sm text-[#888888]">
                      {new Date(gig.date).getFullYear()}
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="font-['Anton'] text-2xl uppercase">{gig.venue}</p>
                    <p className="font-mono text-[#888888]">{gig.city}</p>
                  </div>
                </div>
                <div className="min-w-[150px] text-right">
                  {gig.status === "confirmed" ? (
                    <span className="inline-block px-4 py-2 border border-[#E11D48] text-[#E11D48] font-mono text-xs uppercase tracking-widest">
                      Confirmado
                    </span>
                  ) : gig.status === "sold_out" ? (
                    <span className="inline-block px-4 py-2 bg-[#E11D48] text-white font-mono text-xs uppercase tracking-widest">
                      Sold Out
                    </span>
                  ) : (
                    <span className="inline-block px-4 py-2 border border-[#888888] text-[#888888] font-mono text-xs uppercase tracking-widest">
                      Cancelado
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-punk text-center py-12">
            <p className="font-mono text-[#888888]">
              Próximas fechas muy pronto. ¡Mantente atento!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// Merch Section
const MerchSection = ({ merch, bandInfo }) => {
  return (
    <section id="merch" className="py-24 bg-[#0a0a0a]" data-testid="merch-section">
      <div className="container-punk">
        <h2 className="section-title text-[#eeeeee] mb-4">
          <ShoppingBag className="inline mr-3 text-[#E11D48]" size={40} />
          Merchandising
        </h2>
        <p className="font-mono text-[#888888] mb-16 max-w-xl">
          Lleva La Liga contigo. Contacta para pedidos.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {merch.map((item, index) => (
            <div key={index} className="merch-item" data-testid={`merch-${index}`}>
              <div className="merch-image">
                <ShoppingBag size={64} />
              </div>
              <div className="p-4">
                <p className="font-['Anton'] text-lg uppercase">{item.name}</p>
                <p className="font-mono text-sm text-[#888888]">{item.type}</p>
                <p className="font-mono text-[#E11D48] text-xl mt-2">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-mono text-[#888888] mb-4">Para pedidos, escríbenos a:</p>
          <a
            href={`mailto:${bandInfo.contact.email}?subject=Pedido Merch La Liga`}
            className="btn-punk-solid"
            data-testid="merch-contact-btn"
          >
            Hacer Pedido
          </a>
        </div>
      </div>
    </section>
  );
};

// Gallery Section
const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-[#0a0a0a]" data-testid="gallery-section">
      <div className="container-punk">
        <h2 className="section-title text-[#eeeeee] mb-16">Galería</h2>

        <div className="gallery-grid">
          {/* Row 1 */}
          <div className="gallery-item" data-testid="gallery-img-nava">
            <img src={process.env.PUBLIC_URL + "/images/Nava.jpg"} alt="Nava" loading="lazy" />
          </div>
          <div className="gallery-item bg-[#121212] border border-[#333333] flex items-center justify-center p-4 md:p-6">
            <p className="handwritten text-lg md:text-2xl text-center">
              "El público es parte de la banda"
            </p>
          </div>
          <div className="gallery-item" data-testid="gallery-img-ep">
            <img
              src={process.env.PUBLIC_URL + "/images/DeLunesAViernes.jpg"}
              alt="De Lunes a Viernes EP"
              loading="lazy"
              style={{ objectPosition: "bottom" }}
            />
          </div>

          {/* Row 2 */}
          <div className="gallery-item" data-testid="gallery-img-matanzanava">
            <img
              src={process.env.PUBLIC_URL + "/images/matanzaNava.jpg"}
              alt="Concierto Nava"
              loading="lazy"
            />
          </div>
          <div className="gallery-item bg-[#E11D48] flex items-center justify-center p-6">
            <p className="font-['Anton'] text-3xl uppercase text-center leading-tight">
              Punk Rock Español
            </p>
          </div>
          <div className="gallery-item" data-testid="gallery-img-vidacirco">
            <img
              src={process.env.PUBLIC_URL + "/images/vidacirco.jpg"}
              alt="Vida de Circo"
              loading="lazy"
            />
          </div>

          {/* Row 3 */}
          <div className="gallery-item" data-testid="gallery-img-ligagrupo">
            <img
              src={process.env.PUBLIC_URL + "/images/ligagrupo.jpg"}
              alt="Logo La Liga"
              loading="lazy"
            />
          </div>
          {/* Oculto en móvil para que las 2 columnas queden completas */}
          <div className="gallery-item bg-[#FFE600] hidden md:flex items-center justify-center p-6">
            <p className="font-['Anton'] text-3xl uppercase text-center leading-tight text-[#050505]">
              Desde 2022
            </p>
          </div>
          <div className="gallery-item" data-testid="gallery-img-airenuevo">
            <img
              src={process.env.PUBLIC_URL + "/images/airenuevo.jpg"}
              alt="Aire Nuevo"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Booking Section
const BookingSection = () => {
  // idle | sending | sent
  const [status, setStatus] = useState("idle");
  const successRef = useRef(null);

  // El aviso es mucho más corto que el formulario: llevarlo a la vista
  useEffect(() => {
    if (status === "sent") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus("sending");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error(`Formspree ${response.status}`);

      form.reset();
      setStatus("sent");
      toast.dismiss();
      toast.success("¡Solicitud enviada! Te contestamos pronto.");
    } catch (error) {
      setStatus("idle");
      toast.error("No se ha podido enviar. Inténtalo de nuevo o escríbenos por email.");
    }
  };

  return (
    <section id="booking" className="py-24 bg-[#050505]" data-testid="booking-section">
      <div className="container-punk">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-[#eeeeee] mb-4">
            <Calendar className="inline mr-3 text-[#E11D48]" size={40} />
            Contrataciones
          </h2>
          <p className="font-mono text-[#888888] mb-8">
            ¿Quieres que montemos el lío en tu pueblo, sala o festival? Escríbenos sin compromiso y
            nos vemos en los escenarios.
          </p>

          {/* Dossier de prensa */}
          <a
            href={process.env.PUBLIC_URL + "/dossier-la-liga-rural-pride-2026.pdf"}
            download="Dossier La Liga Rural Pride.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-punk inline-flex items-center gap-3 mb-12"
            data-testid="booking-dossier"
          >
            <Download size={20} />
            Descargar dossier
          </a>

          {status === "sent" ? (
            <div
              ref={successRef}
              className="card-punk text-center py-12 px-6"
              role="status"
              data-testid="booking-success"
            >
              <CheckCircle className="mx-auto mb-6 text-[#E11D48]" size={48} />
              <p className="font-['Anton'] text-3xl uppercase mb-4">¡Recibido!</p>
              <p className="font-mono text-[#888888] mb-8">
                Gracias por escribirnos. Te contestamos lo antes posible.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="btn-punk"
                data-testid="booking-new"
              >
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form
              action="https://formspree.io/f/xzdnwlww"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-8"
              data-testid="booking-form"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-[#888888] mb-2 block">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="input-punk"
                    placeholder="Tu nombre o empresa"
                    data-testid="booking-name"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-[#888888] mb-2 block">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="input-punk"
                    placeholder="email@ejemplo.com"
                    data-testid="booking-email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-[#888888] mb-2 block">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="input-punk"
                    placeholder="+34 600 000 000"
                    data-testid="booking-phone"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-[#888888] mb-2 block">
                    Tipo de Evento *
                  </label>
                  <input
                    type="text"
                    name="event_type"
                    required
                    className="input-punk"
                    placeholder="Festival, Fiesta, Bar..."
                    data-testid="booking-event-type"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-[#888888] mb-2 block">
                    Fecha del Evento *
                  </label>
                  <input
                    type="date"
                    name="event_date"
                    required
                    className="input-punk"
                    data-testid="booking-date"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-[#888888] mb-2 block">
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="input-punk"
                    placeholder="Ciudad, Sala, Dirección..."
                    data-testid="booking-location"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-[#888888] mb-2 block">
                  Mensaje Adicional
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="input-punk resize-none"
                  placeholder="Cuéntanos más sobre tu evento..."
                  data-testid="booking-message"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-punk-solid w-full md:w-auto disabled:opacity-50"
                data-testid="booking-submit"
              >
                {status === "sending" ? "Enviando..." : "Enviar Solicitud"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = ({ bandInfo }) => {
  return (
    <section id="contact" className="py-24 bg-[#050505]" data-testid="contact-section">
      <div className="container-punk">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="section-title text-[#eeeeee] mb-8">Contacto</h2>

            <div className="space-y-6">
              <a
                href={`mailto:${bandInfo.contact.email}`}
                className="social-link text-lg"
                data-testid="contact-email"
              >
                <Mail className="text-[#E11D48]" size={24} />
                {bandInfo.contact.email}
              </a>

              <a
                href={`tel:${bandInfo.contact.phone}`}
                className="social-link text-lg"
                data-testid="contact-phone"
              >
                <Phone className="text-[#E11D48]" size={24} />
                {bandInfo.contact.phone}
              </a>

              <div className="social-link text-lg">
                <MapPin className="text-[#E11D48]" size={24} />
                {bandInfo.location}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-['Anton'] text-3xl uppercase mb-8">Redes Sociales</h3>

            <div className="space-y-4">
              <a
                href={bandInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#121212] border border-[#333333] hover:border-[#E11D48] transition-colors"
                data-testid="social-instagram"
              >
                <Instagram size={32} className="text-[#E11D48]" />
                <div>
                  <p className="font-['Anton'] text-xl uppercase">Instagram</p>
                  <p className="font-mono text-sm text-[#888888]">@laliga.ruralpride</p>
                </div>
              </a>

              <a
                href={bandInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#121212] border border-[#333333] hover:border-[#E11D48] transition-colors"
                data-testid="social-youtube"
              >
                <Youtube size={32} className="text-[#E11D48]" />
                <div>
                  <p className="font-['Anton'] text-xl uppercase">YouTube</p>
                  <p className="font-mono text-sm text-[#888888]">@laliga.ruralpride</p>
                </div>
              </a>

              <a
                href={bandInfo.social.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#121212] border border-[#333333] hover:border-[#E11D48] transition-colors"
                data-testid="social-spotify"
              >
                <Music size={32} className="text-[#E11D48]" />
                <div>
                  <p className="font-['Anton'] text-xl uppercase">Spotify</p>
                  <p className="font-mono text-sm text-[#888888]">La Liga</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = ({ bandInfo }) => {
  return (
    <footer className="pt-8 pb-12 md:pb-8 bg-[#050505] border-t border-[#333333]">
      <div className="container-punk">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-['Anton'] text-2xl text-[#E11D48]">LA LIGA RURAL PRIDE</p>
          <p className="font-mono text-sm text-[#888888]">
            © {new Date().getFullYear()} La Liga Rural Pride. Punk Rock Rural.
          </p>
          <div className="flex gap-1 md:gap-4">
            <a
              href={bandInfo.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-3 md:p-0 text-[#888888] hover:text-[#E11D48] transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href={bandInfo.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-3 md:p-0 text-[#888888] hover:text-[#E11D48] transition-colors"
            >
              <Youtube size={20} />
            </a>
            <a
              href={bandInfo.social.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="p-3 md:p-0 text-[#888888] hover:text-[#E11D48] transition-colors"
            >
              <Music size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App
function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Data states
  const [members] = useState(bandData.members || []);
  const [ep] = useState(epData);
  const [featuredSingle] = useState(bandData.featuredSingle || null);
  const [discography] = useState(bandData.discography || []);
  const [merch] = useState(bandData.merch || []);
  const [gigs] = useState(bandData.gigs || []);

  // Band Info
  const [bandInfo] = useState({
    name: "La Liga Rural Pride",
    subtitle: "Punk Rock Rural",
    year: "2022",
    location: "Segovia, España",
    bio: `Somos La Liga Rural Pride, una banda de punk rock español nacida en 2022 en la tierra de Pinares de Segovia. Venimos de grupos como La Banda Olivetti, Los Lebreles, DeKanteo Peligro de Fusión, Los Skull, Hijos de Overón, Los Pichente, Pijos Powers o Charanga Jaleo, y nos une una potente sección de vientos que da identidad a nuestro directo.`,
    bioExtended: `Empezamos versionando a Ska-P, La Raíz, La Polla Records o Desakato, y en 2024 dimos el salto a temas propios con Aire Nuevo y Vida de Circo. Tras tocar por los pueblos de Segovia y en ciudades como Madrid, Cáceres o Salamanca, en octubre de 2026 publicamos nuestro primer EP.`,
    contact: {
      email: "infolaligamusica@gmail.com",
      phone: "+34 662 19 11 53"
    },
    social: {
      instagram: "https://www.instagram.com/laliga.ruralpride/",
      youtube: "https://www.youtube.com/@laliga.ruralpride",
      spotify: "https://open.spotify.com/intl-es/artist/2mX5a8HKZsJHyIxJmYs7Nq"
    }
  });

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "bio", "discography", "gigs", "gallery", "booking", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App" data-testid="app-container">
      <Toaster position="top-right" />
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main>
        <HeroSection bandInfo={bandInfo} onNavigate={handleNavigate} />
        <BioSection bandInfo={bandInfo} members={members} />
        <DiscographySection
          ep={ep}
          featuredSingle={featuredSingle}
          discography={discography}
          bandInfo={bandInfo}
        />
        <GigsSection gigs={gigs} />
        <GallerySection />
        <BookingSection />
        <ContactSection bandInfo={bandInfo} />
      </main>
      <Footer bandInfo={bandInfo} />
      <CookieBanner />
      <ScrollToTop />
    </div>
  );
}

export default App;
