import React, { useState } from 'react';
import Header from './components/Header';
import Ticker from './components/Ticker';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { mockProducts } from './data/mockData';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Feather, BookOpen, Sun, Moon, ShieldCheck, Heart } from 'lucide-react';
import logoUrl from './assets/logo.jpg';

const AppContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Bitácoras', 'Cuadernos', 'Agendas', 'Papel de Arte', 'A Medida'];

  const filteredProducts = selectedCategory === 'Todos'
    ? mockProducts
    : mockProducts.filter(p => {
        if (selectedCategory === 'A Medida') return p.isCustom;
        return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      });

  const customProducts = mockProducts.filter(p => p.isCustom);

  return (
    <div className="min-h-screen flex flex-col text-foreground selection:bg-[var(--gold)] selection:text-black">
      <Ticker />
      <Header />
      
      <main className="flex-grow pt-28 md:pt-36 pb-24">
        
        {/* ========================================================= */}
        {/* HERO SECTION - CELEBRATING THE ARTE POLO CELESTIAL LOGO   */}
        {/* ========================================================= */}
        <section className="relative px-4 md:px-8 mb-24 md:mb-32 overflow-hidden">
          
          {/* Subtle Celestial Background Rings & Mist */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] rounded-full bg-[radial-gradient(circle,rgba(214,178,101,0.08)_0%,rgba(14,15,20,0)_70%)] pointer-events-none -z-10" />
          
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center pt-8 md:pt-12">
            
            {/* Top Subtitle Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-serif uppercase tracking-[0.25em] mb-8"
            >
              <Sparkles size={13} className="text-[var(--gold)] animate-pulse" />
              <span>Taller de Encuadernación Artesanal</span>
              <Sparkles size={13} className="text-[var(--gold)] animate-pulse" />
            </motion.div>

            {/* Central Focal Point: The Logo Showcase */}
            <motion.div 
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative mb-8 group"
            >
              {/* Outer Decorative Celestial Ring */}
              <div className="absolute -inset-4 md:-inset-6 rounded-full border border-[var(--gold)]/25 animate-spin-slow pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--gold)] shadow-[0_0_8px_var(--gold)]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--gold)]/60" />
              </div>

              {/* Second Orbit Ring */}
              <div className="absolute -inset-2 md:-inset-3 rounded-full border border-dashed border-[var(--gold)]/40 pointer-events-none" />

              {/* Glowing Halo */}
              <div className="absolute -inset-4 rounded-full bg-[var(--gold)]/15 blur-2xl group-hover:bg-[var(--gold)]/30 transition-all duration-700 pointer-events-none" />

              {/* Genuine Logo Image Container */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden p-1 bg-gradient-to-b from-[var(--gold)] via-[var(--gold-dark)] to-[#15161C] shadow-2xl">
                <img 
                  src={logoUrl} 
                  alt="Arte Polo — Sol y Luna Emblem" 
                  className="w-full h-full object-cover rounded-full filter contrast-105 hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Brand Title Typographic Treatment (Echoing the Arch & Serifs) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.2em] uppercase text-foreground drop-shadow-sm mb-3">
                ARTE POLO
              </h1>
              
              {/* The Iconic Slogan from the Logo */}
              <p className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-[var(--gold)] tracking-wide mb-6">
                “Donde el papel cobra vida”
              </p>

              <p className="text-sm md:text-base text-foreground-muted max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
                Piezas de encuadernación de autor forjadas a mano pliego a pliego. Cuadernos, agendas perpetuas y bitácoras celestiales con técnicas tradicionales y materiales nobles.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="#shop"
                  className="w-full sm:w-auto px-8 py-4 bg-[var(--gold)] text-[#101116] font-serif text-xs uppercase tracking-[0.2em] font-bold rounded-full hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[var(--gold-glow)] flex items-center justify-center gap-2"
                >
                  <Compass size={16} />
                  Explorar Catálogo
                </a>
                <a 
                  href="#custom"
                  className="w-full sm:w-auto px-8 py-4 glass border border-[var(--gold-border)] text-foreground font-serif text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:border-[var(--gold)] hover:text-[var(--gold)] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} className="text-[var(--gold)]" />
                  Piezas a Medida
                </a>
              </div>
            </motion.div>

            {/* 4 Pillars Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-20 w-full pt-10 border-t border-[var(--gold-border)]/20">
              <div className="flex flex-col items-center p-3 text-center">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-[var(--gold)] mb-2 border border-foreground/10">
                  <Moon size={18} />
                </div>
                <h2 className="font-serif text-xs font-bold uppercase tracking-wider text-foreground">100% Cosido a Mano</h2>
                <p className="text-[11px] text-foreground-muted mt-0.5">Costuras copta, belga y lomo tradicional</p>
              </div>

              <div className="flex flex-col items-center p-3 text-center">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-[var(--gold)] mb-2 border border-foreground/10">
                  <Feather size={18} />
                </div>
                <h2 className="font-serif text-xs font-bold uppercase tracking-wider text-foreground">Papeles Libres de Ácido</h2>
                <p className="text-[11px] text-foreground-muted mt-0.5">Bookcel, algodón y texturas ecológicas</p>
              </div>

              <div className="flex flex-col items-center p-3 text-center">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-[var(--gold)] mb-2 border border-foreground/10">
                  <Sun size={18} />
                </div>
                <h2 className="font-serif text-xs font-bold uppercase tracking-wider text-foreground">Foil Dorado Celestial</h2>
                <p className="text-[11px] text-foreground-muted mt-0.5">Estampados con calor y grabado fino</p>
              </div>

              <div className="flex flex-col items-center p-3 text-center">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-[var(--gold)] mb-2 border border-foreground/10">
                  <ShieldCheck size={18} />
                </div>
                <h2 className="font-serif text-xs font-bold uppercase tracking-wider text-foreground">Apertura Plana 180°</h2>
                <p className="text-[11px] text-foreground-muted mt-0.5">Diseñados para escribir y pintar cómodamente</p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SHOP CATALOG SECTION                                      */}
        {/* ========================================================= */}
        <section id="shop" className="mb-24 max-w-7xl mx-auto px-4 md:px-8 scroll-mt-24">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-[var(--gold)] text-xs font-serif uppercase tracking-[0.2em] mb-1 flex items-center gap-1.5">
                <span>✦</span> Colección Disponible
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Piezas del Taller
              </h2>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 text-xs font-serif tracking-wider uppercase rounded-full transition-all border ${
                    selectedCategory === cat
                      ? 'bg-[var(--gold)] text-[#101116] border-[var(--gold)] font-bold shadow-md'
                      : 'border-foreground/10 text-foreground/75 hover:border-foreground/30 hover:text-foreground glass'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* CUSTOM PIECES SPOTLIGHT SECTION                           */}
        {/* ========================================================= */}
        <section id="custom" className="mb-28 max-w-7xl mx-auto px-4 md:px-8 scroll-mt-24">
          <div className="relative rounded-3xl overflow-hidden glass border border-[var(--gold-border)]/40 p-6 md:p-12 shadow-2xl">
            
            {/* Background Accent */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[var(--gold)]/10 blur-3xl pointer-events-none" />
            
            <div className="max-w-2xl mb-10">
              <div className="text-[var(--gold)] text-xs font-serif uppercase tracking-[0.25em] mb-2 flex items-center gap-2">
                <Sparkles size={14} />
                <span>Encargos Exclusivos</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
                Piezas Forjadas a Medida
              </h2>
              <p className="text-sm md:text-base text-foreground-muted leading-relaxed">
                ¿Buscas una bitácora con iniciales en pan de oro, un álbum de fotos único o un cuaderno con papel especial para pintar? En el taller creamos tu ejemplar según tus deseos exactos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {customProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* THE CRAFT / EL OFICIO SECTION                             */}
        {/* ========================================================= */}
        <section id="craft" className="mb-28 max-w-6xl mx-auto px-4 md:px-8 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[var(--gold)] text-xs font-serif uppercase tracking-[0.25em] mb-2">
              ✦ El Oficio Tradicional ✦
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              ¿Cómo cobra vida cada cuaderno?
            </h2>
            <p className="font-editorial italic text-lg text-foreground-muted">
              Cada etapa se realiza a mano en nuestro taller, sin prisas y honrando el arte de la encuadernación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="glass rounded-2xl p-7 border border-[var(--gold-border)]/25 flex flex-col relative group hover:border-[var(--gold)]/50 transition-all">
              <span className="font-serif text-4xl font-bold text-[var(--gold)]/30 absolute top-6 right-6">01</span>
              <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center text-[var(--gold)] mb-5 border border-foreground/10">
                <BookOpen size={22} />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">El Plegado del Pliego</h3>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Seleccionamos papeles libres de ácido y los plegamos a mano con plegadera de hueso respetando la dirección de la fibra, asegurando que las hojas pasen con suavidad natural.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass rounded-2xl p-7 border border-[var(--gold-border)]/25 flex flex-col relative group hover:border-[var(--gold)]/50 transition-all">
              <span className="font-serif text-4xl font-bold text-[var(--gold)]/30 absolute top-6 right-6">02</span>
              <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center text-[var(--gold)] mb-5 border border-foreground/10">
                <Feather size={22} />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">La Costura de Autor</h3>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Los cuadernillos se perforan y cosen con hilo de lino encerado. Las costuras expuestas o al lomo garantizan una apertura total y una durabilidad que trasciende generaciones.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass rounded-2xl p-7 border border-[var(--gold-border)]/25 flex flex-col relative group hover:border-[var(--gold)]/50 transition-all">
              <span className="font-serif text-4xl font-bold text-[var(--gold)]/30 absolute top-6 right-6">03</span>
              <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center text-[var(--gold)] mb-5 border border-foreground/10">
                <Sun size={22} />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">El Toque Celestial</h3>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Forramos las tapas con linos y cueros nobles, aplicando mediante calor y presión nuestro sello de Sol y Luna en pan de oro, dándole a cada obra su personalidad mística.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* ABOUT / PHILOSOPHY MANIFESTO SECTION                      */}
        {/* ========================================================= */}
        <section id="about" className="mb-16 max-w-4xl mx-auto px-4 md:px-8 text-center scroll-mt-24">
          <div className="glass rounded-3xl p-8 md:p-14 border border-[var(--gold-border)]/35 shadow-xl relative overflow-hidden">
            
            {/* Background Emblem Watermark */}
            <img 
              src={logoUrl} 
              alt="" 
              aria-hidden="true"
              className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full opacity-[0.05] pointer-events-none object-cover" 
            />

            <div className="text-[var(--gold)] text-xs font-serif uppercase tracking-[0.25em] mb-4">
              ✦ Manifiesto Arte Polo ✦
            </div>

            <blockquote className="font-editorial italic text-xl md:text-3xl text-foreground leading-snug mb-6">
              “En un mundo efímero y digital, creemos en el peso del papel, en el aroma de las tintas y en la eternidad de una página escrita a mano.”
            </blockquote>

            <p className="text-xs md:text-sm text-foreground-muted max-w-xl mx-auto leading-relaxed mb-6 font-sans">
              Arte Polo nació del amor por la artesanía paciente. Cada bitácora es pensada como un templo íntimo para tus ideas, dibujos, recuerdos y reflexiones.
            </p>

            <div className="flex items-center justify-center gap-2 text-[var(--gold)] text-xs font-serif tracking-wider uppercase font-semibold">
              <span>Hecho con dedicación en Argentina</span>
              <Heart size={14} className="fill-[var(--gold)]" />
            </div>
          </div>
        </section>

      </main>

      {/* ========================================================= */}
      {/* FOOTER SECTION                                            */}
      {/* ========================================================= */}
      <footer className="border-t border-[var(--gold-border)]/20 bg-background-elevated/70 py-14 px-4 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          
          {/* Logo Mark in Footer */}
          <div className="relative mb-4">
            <img 
              src={logoUrl} 
              alt="Arte Polo Logo" 
              className="h-16 w-16 rounded-full object-cover border border-[var(--gold)]/50 shadow-md opacity-90 hover:opacity-100 transition-opacity" 
            />
          </div>

          <div className="font-serif font-bold tracking-[0.25em] text-xl text-foreground mb-1">
            ARTE POLO
          </div>
          
          <div className="font-editorial italic text-[var(--gold)] text-sm tracking-widest uppercase mb-6">
            Donde el papel cobra vida
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-serif tracking-wider uppercase text-foreground-muted mb-8">
            <a href="#shop" className="hover:text-[var(--gold)] transition-colors">Colección</a>
            <a href="#custom" className="hover:text-[var(--gold)] transition-colors">A Medida</a>
            <a href="#craft" className="hover:text-[var(--gold)] transition-colors">El Oficio</a>
            <a href="#about" className="hover:text-[var(--gold)] transition-colors">El Taller</a>
          </div>

          <div className="w-16 h-[1px] bg-[var(--gold-border)]/40 mb-6" />

          <p className="text-[11px] text-foreground-muted font-sans">
            © {new Date().getFullYear()} Arte Polo • Taller de Encuadernación Artesanal. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Slide-in Cart Drawer */}
      <CartDrawer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
