document.addEventListener('DOMContentLoaded', function() {
    // Initialize current year for footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Terminal typing effect
    initTerminal();
    
    // Initialize skill progress bars
    initSkillBars();
    
    // Initialize navigation highlighting
    initNavigation();
    
    // Initialize security grid animation
    initSecurityGrid();
    
    // Initialize form submission
    initContactForm();
    
    // Initialize mobile navigation
    initMobileNav();
});

// Terminal typing effect
function initTerminal() {
    const terminalText = document.getElementById('terminal-text');
    const messages = [
        "Welcome to my cybersecurity portfolio...",
        "Loading security credentials...",
        "Access granted...",
        "Initializing systems...",
        "Scanning for vulnerabilities...",
        "Environment secure...",
        "> My name is John Doe",
        "> I'm a Computer Science student and cybersecurity enthusiast",
        "> Explore my portfolio to see my projects and skills",
        "> Feel free to contact me for collaborations or opportunities",
        "> Have a secure day!"
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let pauseEnd = 1000;
    
    function type() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            // When deleting
            terminalText.innerHTML = currentMessage.substring(0, charIndex - 1) + `<span class="cursor-char">|</span>`;
            charIndex--;
            typingSpeed = 50;
            
            if (charIndex === 0) {
                isDeleting = false;
                messageIndex++;
                if (messageIndex >= messages.length) messageIndex = 0;
                typingSpeed = 100;
                setTimeout(type, 500);
                return;
            }
        } else {
            // When typing
            terminalText.innerHTML = currentMessage.substring(0, charIndex + 1) + `<span class="cursor-char">|</span>`;
            charIndex++;
            
            if (charIndex === currentMessage.length) {
                isDeleting = false;
                
                // If it's the last message, don't delete it
                if (messageIndex === messages.length - 1) {
                    return;
                }
                
                // Pause at the end of typing
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, pauseEnd);
                return;
            }
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(type, 1000);
}

// Initialize skill progress bars with animation
function initSkillBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = `${level}%`;
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Navigation highlighting
function initNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Highlight active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll to section when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // If mobile nav is open, close it
            document.querySelector('.nav-links').classList.remove('show');
        });
    });
}

// Security grid animations
function initSecurityGrid() {
    const grid = document.querySelector('.security-grid');
    if (!grid) return;
    
    // Create random security elements
    for (let i = 0; i < 5; i++) {
        createSecurityElement(grid);
    }
    
    // Periodically create new elements
    setInterval(() => {
        if (document.querySelectorAll('.security-element').length < 8) {
            createSecurityElement(grid);
        }
    }, 3000);
}

function createSecurityElement(parent) {
    const element = document.createElement('div');
    element.classList.add('security-element');
    
    const size = Math.random() * 30 + 10;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    // Random security icons
    const icons = ['lock', 'shield-alt', 'user-shield', 'fingerprint', 'key', 'server'];
    const selectedIcon = icons[Math.floor(Math.random() * icons.length)];
    
    element.innerHTML = `<i class="fas fa-${selectedIcon}"></i>`;
    element.style.cssText = `
        position: absolute;
        font-size: ${size}px;
        left: ${posX}%;
        top: ${posY}%;
        color: rgba(0, 245, 212, 0.2);
        opacity: 0;
        transform: translateY(20px);
        animation: fadeFloat ${duration}s ease-in-out ${delay}s forwards;
    `;
    
    parent.appendChild(element);
    
    // Remove element after animation completes
    setTimeout(() => {
        element.remove();
    }, (duration + delay) * 1000);
}

// Contact form submission
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        let valid = true;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();
        
        if (!name || !email || !subject || !message) {
            valid = false;
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            valid = false;
            alert('Please enter a valid email address');
            return;
        }
        
        if (valid) {
            // Simulate form submission
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #06d6a0, #06b88c)';
                
                // Reset form
                form.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        }
    });
}

// Mobile navigation
function initMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileNavToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        
        // Toggle icon
        const icon = mobileNavToggle.querySelector('i');
        if (navLinks.classList.contains('show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            
            // Add mobile styles dynamically
            if (!document.getElementById('mobile-nav-styles')) {
                const styleSheet = document.createElement('style');
                styleSheet.id = 'mobile-nav-styles';
                styleSheet.textContent = `
                    .nav-links.show {
                        display: flex;
                        flex-direction: column;
                        position: absolute;
                        top: 80px;
                        left: 0;
                        width: 100%;
                        background-color: var(--darker-bg);
                        padding: 20px;
                        box-shadow: var(--shadow-md);
                        z-index: 1000;
                    }
                    
                    .nav-links.show .nav-link {
                        padding: 15px 0;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    }
                `;
                document.head.appendChild(styleSheet);
            }
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (
            navLinks.classList.contains('show') && 
            !navLinks.contains(e.target) && 
            !mobileNavToggle.contains(e.target)
        ) {
            navLinks.classList.remove('show');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile nav when window is resized
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Add glitch effect on hover for certain elements
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('glitch-text')) {
        e.target.classList.add('glitching');
        setTimeout(() => {
            e.target.classList.remove('glitching');
        }, 1000);
    }
});

// Matrix rain effect for background (subtle)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // Only create on hero section
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    hero.appendChild(canvas);
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.15';
    
    // Set canvas dimensions
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    
    // Characters to use
    const characters = '01'.split('');
    
    // Create drops
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
    }
    
    // Draw the matrix
    function draw() {
        // Semi-transparent black background to create trail effect
        context.fillStyle = 'rgba(9, 9, 20, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set color and font
        context.fillStyle = '#00f5d4';
        context.font = `${fontSize}px var(--font-code)`;
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Get random character
            const text = characters[Math.floor(Math.random() * characters.length)];
            
            // Draw character
            context.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Move drop down
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    // Start the animation
    let animationId;
    function animate() {
        animationId = requestAnimationFrame(animate);
        draw();
    }
    
    animate();
    
    // Handle resizing
    window.addEventListener('resize', () => {
        cancelAnimationFrame(animationId);
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
        
        // Reinitialize
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
        }
        
        animate();
    });
}

// Call matrix rain after page is loaded
window.addEventListener('load', createMatrixRain);

// Animated counter for stats
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const duration = 2000; // ms
        const step = 50; // update every 50ms
        const increment = target / (duration / step);
        let current = 0;
        
        const counter = setInterval(() => {
            current += increment;
            stat.textContent = Math.ceil(current);
            
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(counter);
            }
        }, step);
    });
}

// Initialize counters when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('about-stats')) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Add some random cybersecurity decorative elements
function addCyberDecor() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        if (Math.random() > 0.5 && section.id !== 'home') {
            const decor = document.createElement('div');
            decor.classList.add('cyber-decor');
            
            const size = Math.random() * 200 + 100;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            decor.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border: 2px solid rgba(0, 245, 212, 0.1);
                border-radius: 50%;
                left: ${posX}%;
                top: ${posY}%;
                pointer-events: none;
                z-index: 0;
                opacity: 0.3;
                transform: translateZ(0);
            `;
            
            section.appendChild(decor);
        }
    });
}

// Initialize decorative elements
window.addEventListener('load', addCyberDecor);