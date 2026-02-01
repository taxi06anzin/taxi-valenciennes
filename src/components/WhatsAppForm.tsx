import React, { useState } from 'react';
import { Send, Phone, MapPin, Calendar, Clock, User } from 'lucide-react';

export default function WhatsAppForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    dropoff: '',
    date: '',
    time: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `👋 Bonjour, je souhaite réserver un taxi :
    
👤 Nom : ${formData.name}
📞 Tel : ${formData.phone}
📍 Départ : ${formData.pickup}
🏁 Arrivée : ${formData.dropoff}
📅 Date : ${formData.date}
⏰ Heure : ${formData.time}

Merci de me confirmer la disponibilité.`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/33698432710?text=${encodedMessage}`;
    
    // Tracking could be added here
    // window.gtag('event', 'conversion', { ... });
    
    window.open(url, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white text-slate-800 p-8 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold font-heading mb-6 text-primary flex items-center gap-2">
        <Send className="w-6 h-6 text-accent" />
        Réservation WhatsApp
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Nom Complet</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input 
              required
              type="text" 
              name="name"
              onChange={handleChange}
              className="w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
              placeholder="Votre nom"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Téléphone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input 
              required
              type="tel" 
              name="phone"
              onChange={handleChange}
              className="w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
              placeholder="06 12 34 56 78"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input 
                type="date" 
                name="date"
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Heure</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input 
                type="time" 
                name="time"
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Trajet</label>
          <div className="space-y-3">
             <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                name="pickup"
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
                placeholder="Lieu de départ"
              />
            </div>
             <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                name="dropoff"
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
                placeholder="Destination"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-4 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2">
          <Send className="w-5 h-5" />
          Réserver via WhatsApp
        </button>
      </form>
    </div>
  );
}
