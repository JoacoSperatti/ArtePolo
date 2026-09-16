import type { CartItem } from "../context/CartContext";

export const generateOrderId = () => {
  return `#AP-${Math.floor(1000 + Math.random() * 9000)}`;
};

export const formatWhatsAppMessage = (
  orderId: string,
  customerData: { name: string; phone: string; address: string },
  cartItems: CartItem[],
  total: number
) => {
  let message = `*¡Hola Arte Polo!* 👋\nQuiero confirmar mi pedido ${orderId}.\n\n`;
  message += `*Mis datos:*\n`;
  message += `Nombre: ${customerData.name}\n`;
  message += `Teléfono: ${customerData.phone}\n`;
  message += `Dirección/Ciudad: ${customerData.address}\n\n`;
  
  message += `*Mi pedido:*\n`;
  cartItems.forEach(item => {
    message += `- ${item.quantity}x ${item.product.name} ($${item.product.price * item.quantity})\n`;
    if (item.customizations) {
      if (item.customizations.material) message += `   ↳ Material: ${item.customizations.material}\n`;
      if (item.customizations.color) message += `   ↳ Color: ${item.customizations.color}\n`;
      if (item.customizations.engraving) message += `   ↳ Grabado: ${item.customizations.engraving}\n`;
      if (item.customizations.notes) message += `   ↳ Notas: ${item.customizations.notes}\n`;
    }
  });

  message += `\n*Total a pagar: $${total}*\n\n`;
  message += `Por favor envíenme los datos bancarios y adjuntaré el comprobante por aquí. ¡Gracias! ✨`;

  return encodeURIComponent(message);
};

export const getWhatsAppLink = (message: string) => {
  // Replace with actual business number
  const phoneNumber = "5491123456789"; 
  return `https://wa.me/${phoneNumber}?text=${message}`;
};
