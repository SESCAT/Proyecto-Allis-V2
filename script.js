document.addEventListener("DOMContentLoaded", function() {

    // 1. EFECTO SCROLL SUAVE
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. ANIMACIÓN FADE-IN AL BAJAR LA PÁGINA
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 3. CURSOR DE MARTILLO INTERACTIVO
    const gavelCursor = document.getElementById('gavel-cursor');
    
    // Verificamos que el martillo exista en el HTML antes de moverlo
    if (gavelCursor) {
        document.addEventListener('mousemove', function(e) {
            // Hacemos que siga al mouse
            gavelCursor.style.left = e.clientX + 'px';
            gavelCursor.style.top = e.clientY + 'px';
        });

        document.addEventListener('mousedown', function() {
            // Golpea al hacer clic
            gavelCursor.classList.add('gavel-hit');
        });

        document.addEventListener('mouseup', function() {
            // Se levanta al soltar el clic
            gavelCursor.classList.remove('gavel-hit');
        });
    }

});

// 4. LÓGICA DEL CARRUSEL 3D DEL EQUIPO
// (Va fuera del DOMContentLoaded para que los botones HTML lo puedan encontrar)
function moveCarousel(direction) {
    const cards = document.querySelectorAll('.team-card-3d');
    
    let prev, active, next;
    
    cards.forEach(card => {
        if(card.classList.contains('prev-card')) prev = card;
        if(card.classList.contains('active-card')) active = card;
        if(card.classList.contains('next-card')) next = card;
    });

    // Seguridad por si falta alguna tarjeta
    if (!prev || !active || !next) return;

    cards.forEach(card => card.classList.remove('prev-card', 'active-card', 'next-card'));

    if (direction === 'next') {
        next.classList.add('active-card');
        active.classList.add('prev-card');
        prev.classList.add('next-card');
    } else if (direction === 'prev') {
        prev.classList.add('active-card');
        active.classList.add('next-card');
        next.classList.add('prev-card');
    }
}