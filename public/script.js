document.addEventListener('DOMContentLoaded', function() {
  initCourseTypeSelector();
  initWhatsAppForm();
  initAnimations();
  initMobileMenu();
  initStickyBarMobile();
  initFloatingCallButton();
});

function initStickyBarMobile() {
  const stickyBar = document.querySelector('.vtaxi-sticky-cta-bar');
  if (!stickyBar) return;

  if (window.innerWidth <= 768) {
    stickyBar.style.display = 'block';
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      stickyBar.style.display = 'block';
    } else {
      stickyBar.style.display = 'none';
    }
  });
}

function initFloatingCallButton() {
  const floatingBtn = document.querySelector('.vtaxi-floating-call-btn');
  if (!floatingBtn) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 300) {
      floatingBtn.style.opacity = '1';
      floatingBtn.style.pointerEvents = 'auto';
    } else {
      floatingBtn.style.opacity = '0';
      floatingBtn.style.pointerEvents = 'none';
    }

    lastScroll = currentScroll;
  });

  floatingBtn.style.opacity = '0';
  floatingBtn.style.transition = 'opacity 0.3s ease';
}

function initCourseTypeSelector() {
  const courseCards = document.querySelectorAll('.course-card');
  const transportMedicalSection = document.getElementById('transport-medical');

  if (!courseCards.length) return;

  courseCards.forEach(card => {
    card.addEventListener('click', function() {
      courseCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      const courseType = this.dataset.type;

      if (courseType === 'taxi_conventionne' && transportMedicalSection) {
        transportMedicalSection.style.display = 'block';
        transportMedicalSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else if (transportMedicalSection) {
        transportMedicalSection.style.display = 'none';
      }
    });
  });
}

function initWhatsAppForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const courseType = document.querySelector('.course-card.active')?.dataset.type || 'taxi_normal';

    let message = `🚕 RÉSERVATION TAXI VALENCIENNES\n\n`;

    message += `👤 Client: ${formData.get('nom') || ''} ${formData.get('prenom') || ''}\n`;
    message += `📞 Tel: ${formData.get('telephone') || ''}\n`;

    if (formData.get('email')) {
      message += `📧 Email: ${formData.get('email')}\n`;
    }

    message += `\n🗓️ Date: ${formData.get('date') || ''}\n`;
    message += `⏰ Heure: ${formData.get('heure') || ''}\n`;
    message += `📍 Départ: ${formData.get('adresse_depart') || ''}\n`;
    message += `🎯 Destination: ${formData.get('destination') || ''}\n`;
    message += `👥 Passagers: ${formData.get('nb_passagers') || '1'}\n\n`;

    if (courseType === 'taxi_conventionne') {
      message += `🏥 TRANSPORT MÉDICAL CONVENTIONNÉ CPAM\n`;

      const statutALD = formData.get('statut_ald');
      if (statutALD === 'ald_exonerante') {
        message += `💊 Statut: ALD Exonérante (100% CPAM)\n`;
      } else if (statutALD === 'non_ald') {
        message += `💊 Statut: Non-ALD (55% CPAM + 45% Mutuelle)\n`;
      }

      if (formData.get('type_soin')) {
        const typeSoinSelect = form.querySelector('[name="type_soin"]');
        const typeSoinText = typeSoinSelect?.options[typeSoinSelect.selectedIndex]?.text || '';
        message += `🩺 Type soins: ${typeSoinText}\n`;
      }

      if (formData.get('hopital')) {
        const hopitalSelect = form.querySelector('[name="hopital"]');
        const hopitalText = hopitalSelect?.options[hopitalSelect.selectedIndex]?.text || '';
        message += `🏛️ Hôpital: ${hopitalText}\n`;
      }

      message += `\n`;
    } else {
      message += `🚕 COURSE TAXI NORMALE\n\n`;
    }

    if (formData.get('commentaires')) {
      message += `💬 Informations: ${formData.get('commentaires')}\n\n`;
    }

    message += `📞 Merci de confirmer disponibilité et devis`;

    const messageEncoded = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/33698432710?text=${messageEncoded}`;

    window.open(whatsappURL, '_blank');
  });
}

function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.vtaxi-service-card, .vtaxi-commune-card, .vtaxi-tarif-card, .faq-item');

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.vtaxi-stat-number');
        if (statNumber && !statNumber.classList.contains('animated')) {
          animateNumber(statNumber);
          statNumber.classList.add('animated');
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.vtaxi-stat').forEach(stat => {
    statsObserver.observe(stat);
  });
}

function animateNumber(element) {
  const text = element.textContent;
  const number = parseInt(text.replace(/\D/g, ''));

  if (isNaN(number)) return;

  const suffix = text.replace(/[\d\s]/g, '');
  const duration = 2000;
  const steps = 60;
  const increment = number / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= number) {
      element.textContent = number + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, duration / steps);
}

function initMobileMenu() {
  const createMobileMenuButton = () => {
    const nav = document.querySelector('nav');
    if (!nav || document.querySelector('.mobile-menu-toggle')) return;

    const button = document.createElement('button');
    button.className = 'mobile-menu-toggle';
    button.innerHTML = '☰';
    button.style.cssText = `
      display: none;
      background: var(--vtaxi-blue);
      color: white;
      border: none;
      padding: 15px 20px;
      font-size: 24px;
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 10px;
      border-radius: 5px;
      z-index: 1001;
    `;

    const menu = document.getElementById('top-menu');

    button.addEventListener('click', () => {
      menu.classList.toggle('mobile-open');
      button.innerHTML = menu.classList.contains('mobile-open') ? '✕' : '☰';
    });

    nav.style.position = 'relative';
    nav.appendChild(button);

    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .mobile-menu-toggle {
          display: block !important;
        }
        #top-menu {
          display: none;
          flex-direction: column;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        #top-menu.mobile-open {
          display: flex;
        }
      }
    `;
    document.head.appendChild(style);
  };

  createMobileMenuButton();
}

function initDateTimeDefaults() {
  const dateInput = document.querySelector('input[name="date"]');
  const heureInput = document.querySelector('input[name="heure"]');

  if (dateInput && !dateInput.value) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  if (heureInput && !heureInput.value) {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    heureInput.value = `${hh}:${min}`;
  }
}

setTimeout(initDateTimeDefaults, 100);
