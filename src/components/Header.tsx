import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, Moon, Sun, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import logoUrl from '../assets/logo.jpeg';

const Header: React.FC = () => {
  const { cart, setIsCartOpen } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className={`fixed left-0 right-0 z-40 mx-3 md:mx-8 transition-all duration-300 ${
        isScrolled ? 'top-3 md:top-4' : 'top-12 md:top-14'
      }`}>
        <div className="glass rounded-full px-5 md:px-7 py-3 flex items-center justify-between shadow-lg border border-[var(--gold-border)]/40">
          
          {/* Left Navigation */}
          <div className="flex items-center gap-6">
            <button 
              className="md:hidden text-foreground hover:text-[var(--gold)] transition-colors p-1"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={22} />
            </button>
            <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.18em] font-medium text-foreground/80">
              <a href="#shop" className="hover:text-[var(--gold)] transition-colors">Colección</a>
              <a href="#custom" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1.5">
                <Sparkles size={13} className="text-[var(--gold)]" />
                A Medida
              </a>
              <a href="#craft" className="hover:text-[var(--gold)] transition-colors">El Oficio</a>
              <a href="#about" className="hover:text-[var(--gold)] transition-colors">Taller</a>
            </nav>
          </div>

          {/* Center Brand Identity with Logo */}
          <a href="#" className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-[var(--gold)]/20 blur-sm group-hover:bg-[var(--gold)]/40 transition-all duration-500"></div>
              <img 
                src={logoUrl} 
                alt="Arte Polo Logo" 
                className="relative h-9 w-9 md:h-10 md:w-10 rounded-full object-cover border border-[var(--gold)]/60 shadow-md group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="font-serif font-bold tracking-[0.25em] text-sm md:text-base leading-none text-foreground group-hover:text-[var(--gold)] transition-colors">
                ARTE POLO
              </span>
              <span className="hidden lg:block text-[9px] font-editorial tracking-[0.18em] text-[var(--gold)] uppercase mt-0.5 opacity-90">
                Donde el papel cobra vida
              </span>
            </div>
          </a>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground/80 hover:text-[var(--gold)] hover:bg-foreground/5 transition-all"
              title={isDarkMode ? "Cambiar a modo Papel Pergamino" : "Cambiar a modo Tinta Noche"}
              aria-label="Cambiar tema"
            >
              {isDarkMode ? <Sun size={18} className="text-[var(--gold)]" /> : <Moon size={18} />}
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full text-foreground/80 hover:text-[var(--gold)] hover:bg-foreground/5 transition-all flex items-center gap-2"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--gold)] text-[#111215] text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full shadow-sm font-sans">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-50 bg-background/95 flex flex-col items-center justify-center px-6"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-foreground/70 hover:text-foreground bg-foreground/5 rounded-full"
              aria-label="Cerrar menú"
            >
              <X size={26} />
            </button>

            {/* Emblem in Mobile Menu */}
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="relative mb-3">
                <div className="absolute -inset-2 rounded-full bg-[var(--gold)]/20 blur-md"></div>
                <img 
                  src={logoUrl} 
                  alt="Arte Polo" 
                  className="relative h-20 w-20 rounded-full object-cover border-2 border-[var(--gold)]/60 shadow-xl" 
                />
              </div>
              <h2 className="font-serif text-2xl font-bold tracking-[0.25em] text-foreground">ARTE POLO</h2>
              <p className="font-editorial text-sm text-[var(--gold)] italic tracking-widest mt-1">Donde el papel cobra vida</p>
            </div>

            <nav className="flex flex-col items-center gap-6 text-lg font-serif tracking-[0.15em] text-foreground/90">
              <a 
                href="#shop" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[var(--gold)] transition-colors"
              >
                Colección
              </a>
              <a 
                href="#custom" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[var(--gold)] transition-colors flex items-center gap-2"
              >
                <Sparkles size={16} className="text-[var(--gold)]" />
                Piezas a Medida
              </a>
              <a 
                href="#craft" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[var(--gold)] transition-colors"
              >
                El Oficio Artesanal
              </a>
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[var(--gold)] transition-colors"
              >
                El Taller
              </a>
            </nav>

            <div className="mt-12 text-xs font-sans text-foreground/40 tracking-wider uppercase">
              Encuadernación de Autor • Hecho a Mano
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
