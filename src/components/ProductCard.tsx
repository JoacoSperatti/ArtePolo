import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, BookOpen } from 'lucide-react';
import type { Product } from '../data/mockData';
import { useCart } from '../context/CartContext';
import CustomOrderModal from './CustomOrderModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAction = () => {
    if (product.isCustom) {
      setIsModalOpen(true);
    } else {
      addToCart({
        id: `${product.id}-${Date.now()}`,
        product,
        quantity: 1
      });
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1200);
    }
  };

  return (
    <>
      <motion.article 
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="glass rounded-2xl overflow-hidden group flex flex-col border border-[var(--gold-border)]/30 hover:border-[var(--gold)]/60 hover:shadow-xl hover:shadow-[var(--gold-glow)] transition-all duration-300 relative"
      >
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className="bg-[#121318]/85 backdrop-blur-md text-[#E8D4A2] text-[10px] uppercase font-serif tracking-[0.16em] px-3 py-1 rounded-full border border-[var(--gold)]/40 shadow-sm flex items-center gap-1">
              <span className="text-[var(--gold)]">✦</span> {product.badge}
            </span>
          ) : <span />}

          {product.isCustom ? (
            <span className="bg-[var(--gold)] text-[#111215] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles size={11} /> A Medida
            </span>
          ) : product.stock > 0 ? (
            <span className="bg-background/80 backdrop-blur-md text-foreground/80 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-foreground/15">
              Stock: {product.stock}
            </span>
          ) : null}
        </div>

        {/* Product Image Frame */}
        <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-foreground/5">
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>
        
        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Category */}
          <div className="flex items-center gap-2 mb-1.5 text-xs text-[var(--gold)] font-editorial italic tracking-wider">
            <span>{product.category}</span>
            {product.pages && (
              <>
                <span className="opacity-40">•</span>
                <span className="text-foreground-muted font-sans text-[11px] not-italic">{product.pages}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold mb-2 leading-snug text-foreground group-hover:text-[var(--gold)] transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-foreground-muted leading-relaxed mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>

          {/* Bookbinding specs if available */}
          {(product.bindingType || product.paperType) && (
            <div className="mb-4 pt-3 border-t border-foreground/5 flex flex-wrap gap-1.5 text-[10px] text-foreground/75">
              {product.bindingType && (
                <span className="bg-foreground/5 px-2.5 py-0.5 rounded border border-foreground/10 flex items-center gap-1">
                  <BookOpen size={10} className="text-[var(--gold)]" />
                  {product.bindingType}
                </span>
              )}
              {product.paperType && (
                <span className="bg-foreground/5 px-2.5 py-0.5 rounded border border-foreground/10">
                  {product.paperType}
                </span>
              )}
            </div>
          )}
          
          {/* Price and Action Button */}
          <div className="flex items-center justify-between pt-2 mt-auto border-t border-foreground/10">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-foreground-muted">Inversión</span>
              <span className="font-serif text-xl font-bold text-foreground">
                ${product.price.toLocaleString('es-AR')}
              </span>
            </div>

            <button 
              onClick={handleAction}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 flex items-center gap-1.5 shadow-sm ${
                product.isCustom
                  ? 'bg-[var(--gold)] text-[#101115] hover:brightness-110 active:scale-95'
                  : addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-foreground text-background hover:bg-[var(--gold)] hover:text-[#101115] active:scale-95'
              }`}
            >
              {product.isCustom ? (
                <>
                  <Sparkles size={13} />
                  Personalizar
                </>
              ) : addedAnimation ? (
                <span>¡Añadido! ✓</span>
              ) : (
                <>
                  <ShoppingBag size={13} />
                  Añadir
                </>
              )}
            </button>
          </div>
        </div>
      </motion.article>

      {product.isCustom && (
        <CustomOrderModal 
          product={product} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default ProductCard;
