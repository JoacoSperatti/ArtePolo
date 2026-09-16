import React from 'react';

const Ticker: React.FC = () => {
  const items = [
    "Donde el papel cobra vida",
    "Encuadernación 100% artesanal",
    "Costuras expuestas y tradicionales",
    "Hojas cosidas a mano pliego a pliego",
    "Estampados en foil dorado celestial",
    "Piezas y bitácoras a medida",
    "Envíos a todo el país"
  ];

  return (
    <div className="w-full bg-[#101116] text-[#E8D4A2] text-[11px] uppercase tracking-[0.22em] py-2 overflow-hidden border-b border-[var(--gold)]/20 flex whitespace-nowrap select-none font-serif">
      <div className="animate-marquee inline-flex items-center">
        {items.map((text, idx) => (
          <React.Fragment key={`t1-${idx}`}>
            <span className="mx-5 font-semibold text-amber-100/90">{text}</span>
            <span className="text-[var(--gold)] opacity-70 text-[9px]">✦</span>
          </React.Fragment>
        ))}
      </div>
      <div className="animate-marquee inline-flex items-center" aria-hidden="true">
        {items.map((text, idx) => (
          <React.Fragment key={`t2-${idx}`}>
            <span className="mx-5 font-semibold text-amber-100/90">{text}</span>
            <span className="text-[var(--gold)] opacity-70 text-[9px]">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
