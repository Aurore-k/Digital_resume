

(function() {
  "use strict";

  /** Ajoute la classe .scrolled au body lorsque la page est défilée */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /** changement du menu de navigation mobile (ouvrir ou fermer) et changer l'icône du bouton */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /** Ferme le menu de navigation m lorsqu'on clic sur un lien de la même page */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /** Animation du bouton scroll  */
  let scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /** Animation de la page pendant le scroll  */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /** Animation de la page principale concernant la partie etudiante */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /** Animation de la partie compétence */
  document.addEventListener("DOMContentLoaded", function() {
    const circles = document.querySelectorAll('.progress-circle'); 
    circles.forEach(circle => {
      /** Créer un nombre de particules flottantes autour du cercle */
      for (let i = 0; i < 8; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        circle.appendChild(particle);
        /** Positionner chaque particule*/
        const angle = (360 / 8) * i;
        particle.style.transform = `rotate(${angle}deg) translate(50px)`;
      }
    });
  });
  document.addEventListener('scroll', function() {
    const circles = document.querySelectorAll('.progress-circle');
    const windowHeight = window.innerHeight;
    circles.forEach(circle => {
      const rect = circle.getBoundingClientRect();
      if (rect.top <= windowHeight) {
        let value = circle.getAttribute('data-value');
        circle.style.setProperty('--progress', value); /**  Applique la progression via une variable CSS */
        circle.style.transition = 'background 1s ease-out';
      }
    });
  });


  /** Initialisation des sliders Swiper pour la partie mes centres d'interets */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  /**  Initialisation de GLightbox pour les cases de mes compétences */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /** Initialisation de la mise en page dynamique */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
  });

})();

/** animation js de la partie apprentissage  */
const coll = document.querySelectorAll('.collapsible');

coll.forEach(button => {
  button.addEventListener('click', function() {
    this.classList.toggle('active'); 
    const content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null; 
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// Ajoute un écouteur d'événements pour vérifier si le formulaire est soumis
document.querySelector('.php-email-form').addEventListener('submit', function(event) {
  alert("Le formulaire est soumis !");
  
  // Réinitialiser le formulaire après la soumission
  this.reset();
});