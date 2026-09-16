import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, Feather } from 'lucide-react';
import type { Product } from '../data/mockData';
import { useCart } from '../context/CartContext';

interface CustomOrderModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const CustomOrderModal: React.FC<CustomOrderModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  
  const [material, setMaterial] = useState('Lino Italiano Negro Noche');
  const [binding, setBinding] = useState('Costura Copta Expuesta');
  const [paper, setPaper] = useState('Bookcel Ahuesado 90g (Liso)');
  const [foilFinish, setFoilFinish] = useState('Foil Oro Celestial (Sol & Luna)');
  const [engraving, setEngraving] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${Date.now()}`,
      product,
      quantity: 1,
      customizations: {
        material: `${material} • ${binding}`,
        color: `${paper} • ${foilFinish}`,
        engraving: engraving ? `Grabado: "${engraving}"` : undefined,
        notes: notes || undefined
      }
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-background border border-[var(--gold-border)]/50 rounded-3xl overflow-hidden shadow-2xl z-10 my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 md:p-8 pb-4 border-b border-foreground/10 relative bg-foreground/[0.02]">
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-foreground/50 hover:text-foreground bg-foreground/5 rounded-full transition-colors"
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-2 text-[var(--gold)] text-xs font-serif uppercase tracking-[0.2em] mb-1">
              <Sparkles size={13} />
              Taller de Encargo
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Configurar {product.name}
            </h2>
            <p className="text-xs text-foreground-muted mt-1 font-sans">
              Personaliza cada detalle artesanal: materiales nobles, tipo de costura y acabados en foil.
            </p>
          </div>

          {/* Form Scroll Body */}
          <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1">
            
            {/* Material */}
            <div>
              <label className="block text-xs uppercase font-serif tracking-wider font-semibold mb-2.5 text-foreground/90 flex items-center gap-1.5">
                <Feather size={14} className="text-[var(--gold)]" />
                Material de Tapas
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: 'Lino Italiano Negro Noche', desc: 'Textura suave y elegante' },
                  { name: 'Ecocuero Rústico Café', desc: 'Estilo grimorio de época' },
                  { name: 'Lienzo Algodón Crudo', desc: 'Orgánico y minimalista' },
                  { name: 'Papel Mármol Artesanal', desc: 'Diseño marmoleado único' }
                ].map(opt => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setMaterial(opt.name)}
                    className={`p-3 rounded-xl text-left text-xs transition-all border flex items-start justify-between ${
                      material === opt.name 
                        ? 'bg-[var(--gold)]/10 border-[var(--gold)] text-foreground shadow-sm' 
                        : 'border-foreground/10 hover:border-foreground/25 text-foreground/80'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{opt.name}</div>
                      <div className="text-[10px] text-foreground-muted mt-0.5">{opt.desc}</div>
                    </div>
                    {material === opt.name && <Check size={14} className="text-[var(--gold)] shrink-0 mt-0.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Binding Technique */}
            <div>
              <label className="block text-xs uppercase font-serif tracking-wider font-semibold mb-2.5 text-foreground/90">
                Técnica de Encuadernación
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Costura Copta Expuesta (Apertura 180°)',
                  'Tapa Dura Clásica Holandesa',
                  'Costura Belga Secreta',
                  'Costura Japonesa Tradicional'
                ].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setBinding(opt)}
                    className={`py-2.5 px-3 rounded-xl text-left text-xs transition-all border ${
                      binding === opt 
                        ? 'bg-foreground text-background border-foreground font-semibold' 
                        : 'border-foreground/10 text-foreground/80 hover:border-foreground/25'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Paper Type */}
            <div>
              <label className="block text-xs uppercase font-serif tracking-wider font-semibold mb-2.5 text-foreground/90">
                Hojas Interiores
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Bookcel Ahuesado 90g (Liso)',
                  'Bookcel Ahuesado (Rayado / Bullet)',
                  'Papel Acuarela Algodón 300g',
                  'Papel Negro Medianoche 150g'
                ].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPaper(opt)}
                    className={`py-2 px-3 rounded-xl text-left text-xs transition-all border ${
                      paper === opt 
                        ? 'border-[var(--gold)] bg-[var(--gold)]/10 font-semibold' 
                        : 'border-foreground/10 text-foreground/80 hover:border-foreground/25'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Foil Stamping */}
            <div>
              <label className="block text-xs uppercase font-serif tracking-wider font-semibold mb-2.5 text-foreground/90">
                Acabado en Foil / Estampado
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'Foil Oro', label: '✨ Oro Celestial' },
                  { name: 'Foil Plata', label: '🌙 Plata Lunar' },
                  { name: 'Foil Cobre', label: '☀️ Cobre Cálido' },
                  { name: 'Bajo Relieve', label: '📜 En Seco' }
                ].map(opt => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setFoilFinish(opt.label)}
                    className={`py-2 px-2.5 rounded-xl text-center text-xs transition-all border ${
                      foilFinish === opt.label 
                        ? 'border-[var(--gold)] bg-[var(--gold)]/15 font-semibold text-foreground' 
                        : 'border-foreground/10 text-foreground/75 hover:border-foreground/25'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Engraving */}
            <div>
              <label className="block text-xs uppercase font-serif tracking-wider font-semibold mb-1 text-foreground/90">
                Grabado Personalizado (Opcional)
              </label>
              <p className="text-[11px] text-foreground-muted mb-2">Nombre, iniciales o fecha especial estampada en tapa.</p>
              <input 
                type="text" 
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
                placeholder="Ej. 'L. M. 2024' o 'Sol & Luna'"
                maxLength={25}
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder-foreground/40 focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs uppercase font-serif tracking-wider font-semibold mb-1 text-foreground/90">
                Notas para el Taller
              </label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="¿Tienes alguna preferencia en el color de cinta, dije, o detalles especiales?"
                rows={2}
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder-foreground/40 focus:outline-none focus:border-[var(--gold)] transition-colors resize-none"
              />
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-6 md:p-8 pt-4 border-t border-foreground/10 flex items-center justify-between bg-foreground/[0.02]">
            <div>
              <span className="text-[10px] uppercase font-serif tracking-wider text-foreground-muted block">Precio Base</span>
              <span className="font-serif text-2xl font-bold text-foreground">
                ${product.price.toLocaleString('es-AR')}
              </span>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="px-6 py-3 bg-[var(--gold)] text-[#101115] text-xs uppercase font-bold tracking-wider rounded-full hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-2"
            >
              <Sparkles size={14} />
              Añadir a mi Encargo
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CustomOrderModal;
