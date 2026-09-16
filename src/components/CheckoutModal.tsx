import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { generateOrderId, formatWhatsAppMessage, getWhatsAppLink } from '../services/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [copied, setCopied] = useState(false);
  
  const bankDetails = {
    alias: 'ARTE.POLO.OK',
    cbu: '0000003100000000000000',
    titular: 'Arte Polo Taller'
  };

  const handleCopyAlias = () => {
    navigator.clipboard.writeText(bankDetails.alias);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckout = () => {
    if (!formData.name || !formData.phone || !formData.address) return;
    
    const orderId = generateOrderId();
    const message = formatWhatsAppMessage(orderId, formData, cart, cartTotal);
    const link = getWhatsAppLink(message);
    
    window.open(link, '_blank');
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-background border border-[var(--gold-border)]/50 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 z-10 my-auto"
        >
          <button 
            onClick={onClose} 
            className="absolute top-5 right-5 p-2 text-foreground/50 hover:text-foreground bg-foreground/5 rounded-full transition-colors"
            aria-label="Cerrar modal"
          >
            <X size={18} />
          </button>
          
          <div className="text-[var(--gold)] text-xs font-serif uppercase tracking-[0.2em] mb-1">
            ✦ Taller Arte Polo ✦
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-1">Finalizar Compra</h2>
          <p className="text-xs text-foreground-muted mb-6">
            Completa tus datos para coordinar el pago, confección y despacho directamente por WhatsApp.
          </p>

          {/* Form fields */}
          <div className="space-y-3 mb-6">
            <div>
              <label className="block text-[11px] uppercase font-serif tracking-wider text-foreground/70 mb-1">
                Nombre y Apellido
              </label>
              <input 
                type="text" 
                placeholder="Ej. Valeria Solís" 
                required
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder-foreground/40 focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase font-serif tracking-wider text-foreground/70 mb-1">
                Teléfono / WhatsApp
              </label>
              <input 
                type="tel" 
                placeholder="Ej. 11 2345 6789" 
                required
                value={formData.phone} 
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder-foreground/40 focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase font-serif tracking-wider text-foreground/70 mb-1">
                Dirección de Entrega y Ciudad
              </label>
              <input 
                type="text" 
                placeholder="Ej. San Martín 450, CABA" 
                required
                value={formData.address} 
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder-foreground/40 focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
          </div>

          {/* Bank transfer info card */}
          <div className="bg-foreground/[0.03] rounded-2xl p-4 border border-[var(--gold-border)]/30 mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-serif font-bold text-[var(--gold)] uppercase tracking-wider">
                Datos de Transferencia
              </h3>
              <span className="text-[10px] text-foreground-muted">Banco / Mercado Pago</span>
            </div>
            <div className="flex justify-between items-center mb-1.5 py-1 px-2 rounded-lg bg-foreground/5">
              <span className="text-xs text-foreground-muted">Alias:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-foreground">{bankDetails.alias}</span>
                <button 
                  onClick={handleCopyAlias} 
                  className="p-1 text-foreground/60 hover:text-[var(--gold)] transition-colors"
                  title="Copiar alias"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center px-2 text-[11px]">
              <span className="text-foreground-muted">CBU:</span>
              <span className="font-mono text-foreground/80">{bankDetails.cbu}</span>
            </div>
          </div>

          {/* Total & Submit */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-serif tracking-wider text-foreground-muted">Total a Confirmar</span>
            <span className="font-serif text-2xl font-bold text-[var(--gold)]">
              ${cartTotal.toLocaleString('es-AR')}
            </span>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={!formData.name || !formData.phone || !formData.address}
            className="w-full py-3.5 bg-[#25D366] text-white text-xs uppercase font-serif tracking-widest font-bold rounded-full hover:brightness-105 active:scale-98 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <MessageSquare size={16} />
            Confirmar en WhatsApp
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
