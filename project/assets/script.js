document.addEventListener('DOMContentLoaded', () => {
  // Minimal JS: convert the reservation form to a WhatsApp message (conversion-first).
  const form = document.querySelector('[data-whatsapp-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const get = (name) => (form.querySelector(`[name="${name}"]`)?.value || '').trim();
    const phoneWhatsApp = form.getAttribute('data-whatsapp-phone') || '';

    const nom = get('nom');
    const tel = get('telephone');
    const depart = get('depart');
    const destination = get('destination');
    const date = get('date');
    const heure = get('heure');
    const type = get('type') || 'Taxi';
    const notes = get('notes');

    let msg = `🚕 Demande de réservation\n\n`;
    msg += `Type: ${type}\n`;
    if (nom) msg += `Nom: ${nom}\n`;
    if (tel) msg += `Téléphone: ${tel}\n`;
    if (date) msg += `Date: ${date}\n`;
    if (heure) msg += `Heure: ${heure}\n`;
    if (depart) msg += `Départ: ${depart}\n`;
    if (destination) msg += `Destination: ${destination}\n`;
    if (notes) msg += `Infos: ${notes}\n`;
    msg += `\nMerci de confirmer disponibilité et devis.`;

    const url = `https://wa.me/${phoneWhatsApp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
});
