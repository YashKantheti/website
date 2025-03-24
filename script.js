// Portfolio JavaScript with Cybersecurity Features

document.addEventListener('DOMContentLoaded', function() {
    // Matrix canvas background
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters for the Matrix effect (coffee-themed)
    const chars = '01JVC0FF33B34N5M0CH4CH41BR3W3SPR3550';
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array to store the Y position of each column
    const drops = [];
    
    // Initialize drops at random positions above the screen
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100);
    }

    // Coffee colors for the Matrix effect
    const colors = [
        '#5A4D41', // Mocha
        '#7E6957', // Chai
        '#867C70', // Roast
        '#303031'  // Brew
    ];
    
    function drawMatrix() {
        // Semi-transparent background to create trail effect
        ctx.fillStyle = 'rgba(30, 29, 29, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = fontSize + 'px monospace';
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const char = chars[Math.floor(Math.random() * chars.length)];
            
            // Random coffee color
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            
            // Draw the character
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            // Move the drop down
            drops[i]++;
            
            // Reset drop if it reaches the bottom or randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = Math.floor(Math.random() * -10);
            }
        }
    }
    
    // Terminal typing effect
    const commandText = "view cybersecurity_portfolio.md";
    const typingCommand = document.querySelector('.typing-command');
    let charIndex = 0;
    
    function typeCommand() {
        if (charIndex < commandText.length) {
            typingCommand.textContent = commandText.substring(0, charIndex + 1) + '_';
            charIndex++;
            setTimeout(typeCommand, 100);
        } else {
            typingCommand.textContent = commandText;
            setTimeout(() => {
                // Clear the command
                typingCommand.textContent = '';
                charIndex = 0;
                // Start again after pause
                setTimeout(typeCommand, 2000);
            }, 1500);
        }
    }
    
    // Cybersecurity threat simulation
    const attackLog = document.getElementById('attack-log');
    const attackCount = document.getElementById('attack-count');
    const countryCount = document.getElementById('country-count');
    const typeCount = document.getElementById('type-count');
    
    // List of countries for random attack sources
    const countries = [
        'United States', 'Russia', 'China', 'North Korea', 'Iran', 
        'Ukraine', 'Germany', 'Brazil', 'India', 'United Kingdom', 
        'Canada', 'Australia', 'Japan', 'South Korea', 'Singapore'
    ];
    
    // List of attack types
    const attackTypes = [
        'SQL Injection', 'XSS Attack', 'DDoS', 'Phishing', 'Brute Force', 
        'Ransomware', 'Man-in-the-Middle', 'Zero-day Exploit', 'Malware',
        'Password Attack', 'DNS Tunneling', 'Session Hijacking'
    ];
    
    // List of target types
    const targetTypes = [
        'Financial Institution', 'Government Agency', 'Healthcare Provider',
        'E-commerce Platform', 'Educational Institution', 'Energy Infrastructure',
        'Tech Company', 'Media Organization', 'Military Network', 'Transportation System'
    ];
    
    let totalAttacks = 0;
    const trackCountries = new Set();
    const trackTypes = new Set();
    
    function generateAttack() {
        const country = countries[Math.floor(Math.random() * countries.length)];
        const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
        const targetType = targetTypes[Math.floor(Math.random() * targetTypes.length)];
        
        trackCountries.add(country);
        trackTypes.add(attackType);
        
        const attackEntry = document.createElement('div');
        attackEntry.className = 'attack-entry';
        
        const timestamp = new Date().toLocaleTimeString();
        const severity = Math.floor(Math.random() * 10) + 1;
        let severityClass = 'low';
        
        if (severity > 7) {
            severityClass = 'high';
        } else if (severity > 4) {
            severityClass = 'medium';
        }
        
        attackEntry.innerHTML = `
            <div class="attack-time">${timestamp}</div>
            <div class="attack-details">
                <span class="attack-source">${country}</span>
                <span class="attack-type">${attackType}</span>
                <span class="attack-target">${targetType}</span>
                <span class="attack-severity ${severityClass}">[Severity: ${severity}/10]</span>
            </div>
        `;
        
        // Add to log and update stats
        attackLog.prepend(attackEntry);
        totalAttacks++;
        
        // Animation for new attacks
        setTimeout(() => {
            attackEntry.classList.add('visible');
        }, 10);
        
        // Remove older entries to keep the list manageable
        if (attackLog.children.length > 10) {
            attackLog.removeChild(attackLog.lastChild);
        }
        
        // Update stat counters with animation
        updateCounter(attackCount, totalAttacks);
        updateCounter(countryCount, trackCountries.size);
        updateCounter(typeCount, trackTypes.size);
    }
    
    function updateCounter(element, value) {
        const current = parseInt(element.textContent);
        if (current !== value) {
            element.textContent = value;
            element.classList.add('update');
            setTimeout(() => {
                element.classList.remove('update');
            }, 500);
        }
    }
    
    // Navigation highlighting and smooth scrolling
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Highlight active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        
        // Toggle hamburger animation
        const bars = document.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                hamburger.click();
            }
        });
    });
    
    // Form submission handler with encryption simulation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simulate encryption (visual effect)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-lock"></i> Encrypting...';
            submitButton.disabled = true;
            
            // Simulate encryption process
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Secured & Sent';
                
                // Message confirmation
                setTimeout(() => {
                    alert(`Thanks for your encrypted message, ${name}! I'll get back to you soon.`);
                    contactForm.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }, 2000);
        });
    }
    
    // Add animation to skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const animateSkillBars = function() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const skillLevel = bar.getAttribute('data-level');
                bar.querySelector('.skill-level').style.width = skillLevel;
            }
        });
    };
    
    // Start animations and simulations
    function initializeAnimations() {
        // Matrix effect
        setInterval(drawMatrix, 50);
        
        // Start typing effect
        typeCommand();
        
        // Generate new attacks every 3-7 seconds
        setInterval(generateAttack, Math.random() * 4000 + 3000);
        
        // Generate initial attacks
        for (let i = 0; i < 5; i++) {
            setTimeout(generateAttack, i * 500);
        }
        
        // Initial skill bar animation
        window.addEventListener('scroll', animateSkillBars);
        animateSkillBars();
    }
    
    // Initialize after page is fully loaded
    window.addEventListener('load', initializeAnimations);
    
    // Handle window resize for canvas
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
