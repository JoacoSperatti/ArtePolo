import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-[var(--gold-border)]/40 z-50 flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-foreground/10 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-bold tracking-wider text-foreground">Tu Selección</h2>
                  <p className="text-[11px] font-editorial italic text-[var(--gold)]">Piezas de Encuadernación Artesanal</p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-foreground/50 hover:text-foreground bg-foreground/5 rounded-full transition-colors"
                  aria-label="Cerrar carrito"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center text-[var(--gold)] mb-4 border border-[var(--gold-border)]/30">
                      <Sparkles size={24} />
                    </div>
                    <h3 className="font-serif text-lg font-bold mb-1">Tu carrito está vacío</h3>
                    <p className="text-xs text-foreground-muted max-w-xs mb-6">
                      Explora nuestras bitácoras, cuadernos celestiales y cuadernos a medida.
                    </p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="px-5 py-2.5 bg-foreground text-background text-xs uppercase font-serif tracking-wider font-semibold rounded-full hover:bg-[var(--gold)] hover:text-[#101115] transition-colors"
                    >
                      Ver Catálogo
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 bg-foreground/[0.03] rounded-2xl border border-foreground/10 relative group">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-20 h-20 object-cover rounded-xl border border-foreground/10 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-serif font-bold text-sm text-foreground truncate pr-6">
                            {item.product.name}
                          </h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="absolute top-4 right-4 text-foreground/40 hover:text-red-500 transition-colors p-1"
                            title="Eliminar producto"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <p className="text-xs font-serif font-semibold text-[var(--gold)] mb-2">
                          ${item.product.price.toLocaleString('es-AR')}
                        </p>
                        
                        {item.customizations && (
                          <div className="text-[10px] bg-foreground/5 p-2 rounded-lg mb-3 border border-foreground/5 space-y-0.5">
                            <span className="block font-semibold text-[var(--gold)] uppercase tracking-wider text-[9px]">Detalles de Taller:</span>
                            {item.customizations.material && <span className="block text-foreground/80">• {item.customizations.material}</span>}
                            {item.customizations.color && <span className="block text-foreground/80">• {item.customizations.color}</span>}
                            {item.customizations.engraving && <span className="block text-foreground/80 font-medium">• {item.customizations.engraving}</span>}
                            {item.customizations.notes && <span className="block text-foreground-muted italic">• Nota: {item.customizations.notes}</span>}
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-foreground/5 rounded-full border border-foreground/10">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                              aria-label="Restar una unidad"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-semibold w-5 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                              aria-label="Sumar una unidad"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-xs text-foreground-muted ml-auto font-serif">
                            Subtotal: ${(item.product.price * item.quantity).toLocaleString('es-AR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[var(--gold-border)]/30 bg-background/95 backdrop-blur-md">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs uppercase font-serif tracking-wider text-foreground-muted">Total a Pagar</span>
                    <span className="font-serif text-2xl font-bold text-[var(--gold)]">
                      ${cartTotal.toLocaleString('es-AR')}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 bg-[var(--gold)] text-[#101115] text-xs uppercase font-serif tracking-widest font-bold rounded-full hover:brightness-110 active:scale-98 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Confirmar Pedido <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
};

export default CartDrawer;
