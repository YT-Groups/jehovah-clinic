document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Mobile Menu Toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Header scroll class
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Parallax Effect
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    function parallaxEffect() {
        parallaxSections.forEach(section => {
            const scrollPosition = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if section is in viewport
            if (scrollPosition > sectionTop - window.innerHeight && 
                scrollPosition < sectionTop + sectionHeight) {
                const speed = section.dataset.speed || 0.5;
                const yPos = (scrollPosition - sectionTop) * speed;
                section.style.backgroundPositionY = `${-yPos}px`;
            }
        });
    }
    
    // Scroll animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .slide-in-right, .scale-in');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
        
        // Call parallax effect
        parallaxEffect();
    }
    
    // Initial check on page load
    checkScroll();
    
    // Add event listeners
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Account for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Counter Animation for stats if they exist
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const step = Math.ceil(target / (duration / 30)); // Update every 30ms
                    
                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = current;
                        }
                    }, 30);
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Image gallery lightbox if exists
    const galleryImages = document.querySelectorAll('.gallery-image');
    if (galleryImages.length > 0) {
        galleryImages.forEach(image => {
            image.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="close-lightbox">&times;</span>
                        <img src="${this.src}" alt="${this.alt}">
                    </div>
                `;
                document.body.appendChild(lightbox);
                
                // Close lightbox on click
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox || e.target.className === 'close-lightbox') {
                        document.body.removeChild(lightbox);
                    }
                });
            });
        });
    }
    
    // Initialize any sliders if they exist
    const sliders = document.querySelectorAll('.testimonials-slider');
    if (sliders.length > 0) {
        sliders.forEach(slider => {
            let currentSlide = 0;
            const slides = slider.querySelectorAll('.testimonial');
            const totalSlides = slides.length;
            
            // Create slider controls
            const controls = document.createElement('div');
            controls.className = 'slider-controls';
            
            const prevButton = document.createElement('button');
            prevButton.className = 'slider-prev';
            prevButton.innerHTML = '&#10094;';
            
            const nextButton = document.createElement('button');
            nextButton.className = 'slider-next';
            nextButton.innerHTML = '&#10095;';
            
            controls.appendChild(prevButton);
            controls.appendChild(nextButton);
            slider.appendChild(controls);
            
            // Show first slide
            slides[0].classList.add('active');
            
            // Next slide function
            function showNextSlide() {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % totalSlides;
                slides[currentSlide].classList.add('active');
            }
            
            // Previous slide function
            function showPrevSlide() {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                slides[currentSlide].classList.add('active');
            }
            
            // Add event listeners
            nextButton.addEventListener('click', showNextSlide);
            prevButton.addEventListener('click', showPrevSlide);
            
            // Auto slide every 5 seconds
            setInterval(showNextSlide, 5000);
        });
    }
});