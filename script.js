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

    // Mobile Menu Toggle — Real slide-out navigation
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    // Dynamically build the mobile menu if it doesn't exist yet
    if (!document.querySelector('.mobile-nav')) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
        
        // Create mobile nav
        const mobileNav = document.createElement('nav');
        mobileNav.className = 'mobile-nav';
        
        // Get the current page nav links
        const navLinksEl = document.querySelector('.nav-links');
        const navLinks = navLinksEl ? navLinksEl.querySelectorAll('a') : [];
        
        // Build links HTML
        let linksHTML = '';
        navLinks.forEach(link => {
            const activeClass = link.classList.contains('active') ? ' class="active"' : '';
            linksHTML += `<a href="${link.getAttribute('href')}"${activeClass}>${link.textContent}</a>`;
        });
        
        mobileNav.innerHTML = `
            <div class="mobile-nav-header">
                <a href="index.html" class="logo">
                    <img src="assets/logo.jpeg" alt="KYS" class="logo-img">
                    <span class="logo-text">KYS</span>
                </a>
                <button class="mobile-nav-close"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="mobile-nav-links">
                <a href="index.html">Home</a>
                ${linksHTML}
            </div>
            <div class="mobile-nav-actions">
                <a href="/admin/login" class="btn btn-outline">Login</a>
                <a href="donate.html" class="btn btn-primary">Support Us</a>
            </div>
        `;
        document.body.appendChild(mobileNav);
        
        // Close button handler
        const closeBtn = mobileNav.querySelector('.mobile-nav-close');
        closeBtn.addEventListener('click', closeMobileMenu);
        
        // Overlay click to close
        overlay.addEventListener('click', closeMobileMenu);
    }
    
    function openMobileMenu() {
        const nav = document.querySelector('.mobile-nav');
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (nav && overlay) {
            nav.classList.add('active');
            overlay.classList.add('active');
            document.body.classList.add('mobile-menu-open');
        }
    }
    
    function closeMobileMenu() {
        const nav = document.querySelector('.mobile-nav');
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (nav && overlay) {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        }
    }
    
    mobileBtn.addEventListener('click', openMobileMenu);

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
    const volunteerBtns = document.querySelectorAll('.cta-join');
    const volunteerModal = document.getElementById('volunteerModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if(volunteerBtns.length > 0 && volunteerModal && closeModalBtn) {
        volunteerBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                volunteerModal.style.display = 'flex';
            });
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
        volunteerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(volunteerForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const response = await fetch('/api/volunteers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                if (result.success) {
                    volunteerForm.style.display = 'none';
                    const successMsg = document.getElementById('formSuccessMessage');
                    if (successMsg) successMsg.style.display = 'block';
                    
                    setTimeout(() => {
                        if (volunteerModal) volunteerModal.style.display = 'none';
                        volunteerForm.reset();
                        volunteerForm.style.display = 'flex';
                        if (successMsg) successMsg.style.display = 'none';
                    }, 3000);
                } else {
                    alert('Error submitting form. Please try again.');
                }
            } catch (err) {
                console.error('Error:', err);
                alert('Error submitting form. Please check your connection and try again.');
            }
        });
    }

    // Contact Form Submit Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const response = await fetch('/api/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                if (result.success) {
                    contactForm.style.display = 'none';
                    const successMsg = document.getElementById('contactSuccessMessage');
                    if (successMsg) successMsg.style.display = 'block';
                    
                    setTimeout(() => {
                        contactForm.reset();
                        contactForm.style.display = 'block';
                        if (successMsg) successMsg.style.display = 'none';
                    }, 4000);
                } else {
                    alert('Error submitting message. Please try again.');
                }
            } catch (err) {
                console.error('Error:', err);
                alert('Error submitting message. Please check your connection and try again.');
            }
        });
    }

    // Vacancy Modal Logic
    const vacancyBtn = document.getElementById('getVacancyInfoBtn');
    const vacancyModal = document.getElementById('vacancyModal');
    const closeVacancyModalBtn = document.getElementById('closeVacancyModalBtn');

    if (vacancyBtn && vacancyModal && closeVacancyModalBtn) {
        vacancyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            vacancyModal.style.display = 'flex';
        });
        
        closeVacancyModalBtn.addEventListener('click', () => {
            vacancyModal.style.display = 'none';
        });
        
        // Close only on backdrop click (not on modal content clicks)
        vacancyModal.addEventListener('click', (e) => {
            if (e.target === vacancyModal) {
                vacancyModal.style.display = 'none';
            }
        });
    }

    // Auto-fill vacancy in Contact Form if specified in URL query
    const urlParams = new URLSearchParams(window.location.search);
    const vacancyTitle = urlParams.get('vacancy');
    if (vacancyTitle) {
        const messageField = document.querySelector('textarea[name="message"]');
        if (messageField) {
            messageField.value = "Dear Kalikamai Youth Society Team,\n\nI would like to apply for the open position: \"" + vacancyTitle + "\".\n\nPlease let me know the application procedure. Thank you!";
        }
    }
});
