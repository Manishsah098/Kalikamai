document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Basic implementation)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    mobileBtn.addEventListener('click', () => {
        // In a real app, this would toggle a mobile menu dropdown
        alert('Mobile menu clicked. This would open a full-screen or sliding mobile nav menu.');
    });

    // Animated Counter for Stats
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    // Intersection Observer to start animations when scrolled into view
    const statsSection = document.querySelector('.impact-stats') || document.querySelector('.stats-pill-section');
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                animateStats();
                hasAnimated = true;
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    function animateStats() {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    // Update display
                    stat.innerHTML = Math.ceil(current) + '<span style="font-size: 0.7em;">+</span>';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerHTML = target + '<span style="font-size: 0.7em;">+</span>';
                }
            };
            
            updateCounter();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('.nav-links a[href^="#"], .hero-buttons a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // offset for navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Volunteer Modal Logic
    const volunteerBtn = document.querySelector('.cta-join');
    const volunteerModal = document.getElementById('volunteerModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if(volunteerBtn && volunteerModal && closeModalBtn) {
        volunteerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            volunteerModal.style.display = 'flex';
        });
        
        closeModalBtn.addEventListener('click', () => {
            volunteerModal.style.display = 'none';
        });
        
        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === volunteerModal) {
                volunteerModal.style.display = 'none';
            }
        });
    }

    // Volunteer Form Submit Handler
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', (e) => {
            // Intercept placeholder action to show success message
            if(volunteerForm.getAttribute('action') === 'GOOGLE_SCRIPT_WEB_APP_URL' || volunteerForm.getAttribute('action') === '#') {
                e.preventDefault();
                volunteerForm.style.display = 'none';
                const successMsg = document.getElementById('formSuccessMessage');
                if (successMsg) successMsg.style.display = 'block';
                
                setTimeout(() => {
                    if (volunteerModal) volunteerModal.style.display = 'none';
                    volunteerForm.reset();
                    volunteerForm.style.display = 'flex';
                    if (successMsg) successMsg.style.display = 'none';
                }, 3000);
            }
        });
    }

    // Contact Form Submit Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.style.display = 'none';
            const successMsg = document.getElementById('contactSuccessMessage');
            if (successMsg) successMsg.style.display = 'block';
            
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                if (successMsg) successMsg.style.display = 'none';
            }, 4000);
        });
    }
});
