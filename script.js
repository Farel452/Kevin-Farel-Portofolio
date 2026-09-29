document.addEventListener('DOMContentLoaded', () => {
    const glowBg = document.getElementById('mouse-glow');
    const glowCards = document.querySelectorAll('.glow-card');
    
    // Update variables on mouse movement
    window.addEventListener('mousemove', (e) => {
        // Global ambient glow follows mouse
        if (glowBg) {
            glowBg.style.setProperty('--mouse-x', `${e.clientX}px`);
            glowBg.style.setProperty('--mouse-y', `${e.clientY}px`);
        }

        glowCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--card-mouse-x', `${x}px`);
            card.style.setProperty('--card-mouse-y', `${y}px`);
        });
    });

    const interactiveElements = document.querySelectorAll('a, button, .glow-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('is-hovering');
        });
        
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('is-hovering');
        });
    });


    const observerOptions = {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); 
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => scrollObserver.observe(el));


    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
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
    
    const fileInput = document.getElementById('attachment');
    const fileNameSpan = document.getElementById('file-name');

    if (fileInput && fileNameSpan) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                fileNameSpan.textContent = e.target.files[0].name;
                fileNameSpan.style.color = 'var(--text-main)';
            } else {
                fileNameSpan.textContent = 'Upload File / Attachment (Image, PDF, Doc, etc.)';
                fileNameSpan.style.color = 'var(--text-muted)';
            }
        });
    }
});
