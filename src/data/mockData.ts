export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  isCustom: boolean;
  stock: number;
  bindingType?: string;
  paperType?: string;
  pages?: string;
  badge?: string;
}

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Bitácora Celestial 'Sol & Luna'",
    price: 18500,
    description: "Inspirada en el emblema de Arte Polo. Tapas forradas en lino negro noche con estampado en foil dorado de sol y luna. Costura copta expuesta con hilo encerado.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
    category: "Bitácoras",
    isCustom: false,
    stock: 4,
    bindingType: "Costura Copta Expuesta",
    paperType: "Bookcel Ahuesado 90g (160 págs)",
    pages: "160 páginas",
    badge: "Edición Emblema"
  },
  {
    id: "p2",
    name: "Cuaderno Artesanal 'Noche Estrellada'",
    price: 16000,
    description: "Cuaderno encuadernado a mano con tapas duras enteladas en azul profundo y constelaciones doradas. Apertura total plana de 180°.",
    image: "https://images.unsplash.com/photo-1531346878377-a541e4ab04ce?q=80&w=1000&auto=format&fit=crop",
    category: "Cuadernos",
    isCustom: false,
    stock: 5,
    bindingType: "Tapa Dura Cosida",
    paperType: "Hojas Ecológicas 90g lisas",
    pages: "180 páginas",
    badge: "Más Elegido"
  },
  {
    id: "p3",
    name: "Libreta Botánica en Papel Algodón",
    price: 14500,
    description: "Especial para acuarelistas e ilustradores. Hojas texturadas de fibra natural libres de ácido con barbas naturales y cinta de cierre en algodón teñido.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
    category: "Papel de Arte",
    isCustom: false,
    stock: 7,
    bindingType: "Encuadernación Belga",
    paperType: "Algodón 300g prensado en frío",
    pages: "64 páginas",
    badge: "Para Artistas"
  },
  {
    id: "p4",
    name: "Agenda Perpetua 'Eclipse'",
    price: 24000,
    description: "Sin fechas prefijadas para empezar cuando quieras. Planificador mensual, vista semanal y páginas de notas. Cierre con elástico al tono y señalador con dije solar.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop",
    category: "Agendas",
    isCustom: false,
    stock: 3,
    bindingType: "Lomo Redondo Tradicional",
    paperType: "Bookcel Suave 80g rayado",
    pages: "200 páginas",
    badge: "Perpetua"
  },
  {
    id: "p5",
    name: "Álbum Celestial de Memorias (A Medida)",
    price: 38000,
    description: "Álbum fotográfico de lujo forrado en lino o tela rústica con hojas de cartulina negra y hojas de papel vegetal traslúcido protector entre páginas. Grabado a mano de nombres o fechas.",
    image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=1000&auto=format&fit=crop",
    category: "Álbumes",
    isCustom: true,
    stock: 99,
    bindingType: "Tornillos Ocultos o Cosido",
    paperType: "Cartulina Negra 250g + Papel Vegetal",
    pages: "30 hojas (60 fotos)",
    badge: "Personalizado"
  },
  {
    id: "p6",
    name: "Grimorio / Bitácora Forjada a Medida",
    price: 32000,
    description: "Tu grimorio o bitácora de vida soñada. Escoge el tipo de lino o cuero vegano, técnica de costura al lomo, grabado personalizado en foil dorado o bajo relieve y tus iniciales.",
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?q=80&w=1000&auto=format&fit=crop",
    category: "A Medida",
    isCustom: true,
    stock: 99,
    bindingType: "Costura a Elección",
    paperType: "Papel a tu elección",
    pages: "Hasta 240 páginas",
    badge: "100% Personalizable"
  }
];
