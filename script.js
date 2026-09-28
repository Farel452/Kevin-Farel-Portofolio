document.addEventListener('DOMContentLoaded', () => {

    /* ================================================
       1 & 2. MOUSE TRACKING & GLOW EFFECTS
       ================================================ */
    const glowBg = document.getElementById('mouse-glow');
    const glowCards = document.querySelectorAll('.glow-card');
    
    // Update variables on mouse movement
    window.addEventListener('mousemove', (e) => {
        // Global ambient glow follows mouse
        if (glowBg) {
            glowBg.style.setProperty('--mouse-x', `${e.clientX}px`);
            glowBg.style.setProperty('--mouse-y', `${e.clientY}px`);
        }

        // Calculate mouse position relative to each card for the inner border glow
        glowCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--card-mouse-x', `${x}px`);
            card.style.setProperty('--card-mouse-y', `${y}px`);
        });
    });

    /* ================================================
       3. "MENEBAL" HOVER EFFECT (TIKTOK VIBE)
       ================================================ */
    // Elements that trigger the thicker background glow when hovered
    const interactiveElements = document.querySelectorAll('a, button, .glow-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('is-hovering');
        });
        
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('is-hovering');
        });
    });


    /* ================================================
       4. SCROLL REVEAL ANIMATIONS
       ================================================ */
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: Stop observing after reveal if you don't want it to hide when scrolling up
                // scrollObserver.unobserve(entry.target); 
            } else {
                // Remove class to animate again when scrolling back up
                entry.target.classList.remove('show');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => scrollObserver.observe(el));


    /* ================================================
       5. ACTIVE NAVBAR LINK UPDATING
       ================================================ */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Update active link when scrolled past 1/3 of the section
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

});
