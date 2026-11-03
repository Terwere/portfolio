/**
 * Portfolio & CV - Abdoul-Azizou Abou-Bakari (AZ)
 * Interactions dynamiques, gestion de thème et responsive
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Thème Sombre / Clair (Dark / Light)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  const updateThemeIcon = (theme) => {
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
  };
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', newTheme);
      updateThemeIcon(newTheme);
      localStorage.setItem('az_theme', newTheme);
    });

    // Chargement du thème sauvegardé
    const savedTheme = localStorage.getItem('az_theme');
    if (savedTheme) {
      htmlEl.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
    }
  }

  // 2. Navigation Mobile
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  const closeMobileNav = () => {
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      if (mobileToggle) {
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  };

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Fermer le menu lors du clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Fermer le menu mobile en cliquant en dehors
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileNav();
      }
    });
  }

  // 3. Effet Navbar au Scroll & Lien Actif
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Mise à jour de la section active
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    if (current) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });

  // 4. Animation des barres de progression au Scroll
  const skillsSec = document.getElementById('competences');
  if (skillsSec && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-progress-fill');
          fills.forEach(fill => {
            const progress = fill.getAttribute('data-progress');
            if (progress) {
              fill.style.width = progress;
            }
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(skillsSec);
  }

  // 5. Fermeture des modales avec la touche Echap (Escape)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeMobileNav();
    }
  });
});

// CV Timeline Switcher
function switchTimeline(type, el) {
  document.querySelectorAll('.cv-tab-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = el || (window.event && window.event.currentTarget);
  if (activeBtn) activeBtn.classList.add('active');

  const items = document.querySelectorAll('.timeline-item');
  items.forEach(item => {
    if (type === 'all' || item.getAttribute('data-type') === type) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Projects Filtering
function filterProjects(cat, el) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = el || (window.event && window.event.currentTarget);
  if (activeBtn) activeBtn.classList.add('active');

  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    if (cat === 'all' || card.getAttribute('data-category') === cat) {
      card.style.display = card.classList.contains('featured') ? 'grid' : 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Données des projets pour la modale
const projectData = {
  'yobou': {
    title: 'YOBOU — Le Commerce de Demain en Afrique',
    tag: 'E-Commerce & Logistique',
    img: 'image/YOBOU Brand Mockup - Delivery Motorcycle.jpeg',
    desc: 'Écosystème technologique complet révolutionnant le commerce de proximité et la livraison rapide au Bénin et en Afrique de l\'Ouest.',
    details: `
      <h4 style="color:var(--text-main); margin-bottom:8px;">Points Forts & Architecture :</h4>
      <ul style="padding-left:20px; margin-bottom:15px;">
        <li><strong>Catalogue Multi-vendeurs :</strong> Gestion des boutiques locales, produits frais, mode wax et high-tech.</li>
        <li><strong>Paiement Digital Intégré :</strong> Mobile Money (MTN, Moov, Celtiis, Wave) et paiement à la livraison sécurisé.</li>
        <li><strong>Système Logistique :</strong> Assignation automatique des commandes aux livreurs motorisés et tracking en temps réel.</li>
      </ul>
    `,
    actions: `<a href="yobou_homepage.html" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-globe"></i> Tester la Marketplace Yobou</a>`
  },
  'yobou-mobile': {
    title: 'YOBOU Mobile Application',
    tag: 'Mobile App & UX',
    img: 'image/YOBOU Brand Mockup - Mobile App Splash Screen.jpeg',
    desc: 'Application mobile conçue pour une expérience ultra-fluide avec recherche vocale et panier instantané.',
    details: `
      <p>Optimisée pour les réseaux à bande passante variable et dotée d'une interface claire et intuitive.</p>
    `,
    actions: `<a href="yobou_homepage.html" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-mobile-screen"></i> Voir l'interface</a>`
  },
  'yobou-brand': {
    title: 'Branding & Packaging YOBOU',
    tag: 'Design & Packaging',
    img: 'image/YOBOU Brand Mockup - Delivery Box.jpeg',
    desc: 'Conception 3D et charte graphique des emballages de livraison scellés garantissant sécurité et fraîcheur.',
    details: `<p>Design épuré valorisant l'authenticité et l'identité moderne du commerce africain.</p>`,
    actions: ``
  },
  'business-card': {
    title: 'Carte de Visite & Identité Executive',
    tag: 'Branding Professionnel',
    img: 'image/YOBOU Business Card - ABDOUL-AZIZOU ABOU-BAKARI.png',
    desc: 'Support corporate haut de gamme conçu pour Abdoul-Azizou Abou-Bakari.',
    details: `<p>Format carte de visite professionnelle avec QR code d'accès direct au portfolio et aux coordonnées.</p>`,
    actions: ``
  },
  'dispatch': {
    title: 'Système de Dispatch Logistique',
    tag: 'Dashboard & Temps Réel',
    img: 'image/YOBOU Brand Mockup - Shopping Bag.jpeg',
    desc: 'Module intelligent d\'optimisation des tournées de livraison et suivi de la flotte de coursiers.',
    details: `<p>Algorithme d'attribution basé sur la proximité géographique et la charge des livreurs.</p>`,
    actions: ``
  }
};

// Modal Handlers
function openProjectModal(key) {
  const data = projectData[key];
  if (!data) return;

  const modalImg = document.getElementById('modal-img');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalDetails = document.getElementById('modal-details');
  const modalActions = document.getElementById('modal-actions');

  if (modalImg) modalImg.src = data.img;
  if (modalTag) modalTag.textContent = data.tag;
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalDesc) modalDesc.textContent = data.desc;
  if (modalDetails) modalDetails.innerHTML = data.details;
  if (modalActions) modalActions.innerHTML = data.actions;

  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeProjectModal(e) {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Contact Form Submission (Simulation)
function handleFormSubmit(e) {
  if (e) e.preventDefault();
  const nameInput = document.getElementById('name');
  const name = nameInput ? nameInput.value : 'visiteur';
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  if (toastMsg) toastMsg.textContent = `Merci ${name} ! Votre message a bien été envoyé.`;
  if (toast) toast.classList.add('show');

  const form = document.getElementById('contact-form');
  if (form) form.reset();

  setTimeout(() => {
    if (toast) toast.classList.remove('show');
  }, 4000);
}

// formulair de demande
async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const bouton = form.querySelector('button[type="submit"]');
  const texteOriginal = bouton.innerHTML;

  bouton.disabled = true;
  bouton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

  try {
    const reponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    const resultat = await reponse.json();

    if (reponse.ok && resultat.success) {
      alert('Merci ! Votre message a bien été envoyé. Je vous réponds sous 24h ouvrées.');
      form.reset();
    } else {
      alert("Une erreur est survenue. Réessayez ou contactez-moi par WhatsApp.");
    }
  } catch (erreur) {
    alert("Problème de connexion. Réessayez ou contactez-moi par WhatsApp.");
  } finally {
    bouton.disabled = false;
    bouton.innerHTML = texteOriginal;
  }
}
