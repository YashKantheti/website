// Enhanced Portfolio JavaScript with Cybersecurity Features

document.addEventListener('DOMContentLoaded', function() {
    // Matrix canvas background
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters for the Matrix effect (coffee-themed)
    const chars = '01JVC0FF33B34N5M0CH4CH41BR3W3SPR3550C0D3H4CK5CRYPT0';
    
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
    
    // Terminal typing effect with more commands
    const commands = [
        "view cybersecurity_portfolio.md",
        "scan network -v",
        "analyze vulnerabilities",
        "cat /etc/security/config",
        "ssh secure@192.168.1.1"
    ];
    let currentCommand = 0;
    const typingCommand = document.querySelector('.typing-command');
    let charIndex = 0;
    
    function typeCommand() {
        if (charIndex < commands[currentCommand].length) {
            typingCommand.textContent = commands[currentCommand].substring(0, charIndex + 1) + '_';
            charIndex++;
            setTimeout(typeCommand, 100);
        } else {
            typingCommand.textContent = commands[currentCommand];
            setTimeout(() => {
                // Clear the command
                typingCommand.textContent = '';
                charIndex = 0;
                // Move to next command
                currentCommand = (currentCommand + 1) % commands.length;
                // Start again after pause
                setTimeout(typeCommand, 2000);
            }, 1500);
        }
    }
    
    // Cybersecurity threat simulation with enhanced visuals
    const attackLog = document.getElementById('attack-log');
    const attackCount = document.getElementById('attack-count');
    const countryCount = document.getElementById('country-count');
    const typeCount = document.getElementById('type-count');
    
    // List of countries for random attack sources
    const countries = [
        'United States', 'Russia', 'China', 'North Korea', 'Iran', 
        'Ukraine', 'Germany', 'Brazil', 'India', 'United Kingdom', 
        'Canada', 'Australia', 'Japan', 'South Korea', 'Singapore',
        'France', 'Israel', 'Vietnam', 'Netherlands', 'Turkey'
    ];
    
    // List of attack types
    const attackTypes = [
        'SQL Injection', 'XSS Attack', 'DDoS', 'Phishing', 'Brute Force', 
        'Ransomware', 'Man-in-the-Middle', 'Zero-day Exploit', 'Malware',
        'Password Attack', 'DNS Tunneling', 'Session Hijacking', 'Crypto Mining',
        'Supply Chain Attack', 'Social Engineering', 'APT', 'Insider Threat'
    ];
    
    // List of target types
    const targetTypes = [
        'Financial Institution', 'Government Agency', 'Healthcare Provider',
        'E-commerce Platform', 'Educational Institution', 'Energy Infrastructure',
        'Tech Company', 'Media Organization', 'Military Network', 'Transportation System',
        'Cloud Service', 'Manufacturing Facility', 'Telecom Provider', 'Critical Infrastructure',
        'Cryptocurrency Exchange', 'IoT Network', 'Satellite Systems'
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
        if (attackLog) {
            attackLog.prepend(attackEntry);
            
            // Animation for new attacks
            setTimeout(() => {
                attackEntry.classList.add('visible');
            }, 10);
            
            // Remove older entries to keep the list manageable
            if (attackLog.children.length > 10) {
                attackLog.removeChild(attackLog.lastChild);
            }
        }
        
        totalAttacks++;
        
        // Show attack on map
        showAttackOnMap(country);
        
        // Update stat counters with animation
        if (attackCount && countryCount && typeCount) {
            updateCounter(attackCount, totalAttacks);
            updateCounter(countryCount, trackCountries.size);
            updateCounter(typeCount, trackTypes.size);
        }
    }
    
    // Cybersecurity threat map visualization
    const threatMap = document.getElementById('threat-map');
    
    function initThreatMap() {
        if (!threatMap) return;
        
        // Clear any existing content
        threatMap.innerHTML = '';
        
        // Create a simple world map using div elements
        const mapContainer = document.createElement('div');
        mapContainer.className = 'map-container';
        
    // Create map regions (simplified)
        const regions = [
            { name: 'North America', left: '10%', top: '30%', width: '20%', height: '20%', color: 'var(--mocha)' },
            { name: 'South America', left: '25%', top: '55%', width: '15%', height: '25%', color: 'var(--chai)' },
            { name: 'Europe', left: '45%', top: '25%', width: '10%', height: '15%', color: 'var(--mocha)' },
            { name: 'Africa', left: '45%', top: '45%', width: '15%', height: '25%', color: 'var(--chai)' },
            { name: 'Asia', left: '60%', top: '30%', width: '25%', height: '25%', color: 'var(--mocha)' },
            { name: 'Australia', left: '75%', top: '60%', width: '10%', height: '10%', color: 'var(--chai)' }
        ];
        
        // Add regions to map
        regions.forEach(region => {
            const regionEl = document.createElement('div');
            regionEl.className = 'map-region';
            regionEl.title = region.name;
            regionEl.style.left = region.left;
            regionEl.style.top = region.top;
            regionEl.style.width = region.width;
            regionEl.style.height = region.height;
            
            // Use alternating colors for regions
            if (region.color) {
                regionEl.style.backgroundColor = region.color === 'var(--mocha)' ? 'rgba(90, 77, 65, 0.2)' : 'rgba(126, 105, 87, 0.2)';
                regionEl.style.borderColor = region.color === 'var(--mocha)' ? 'rgba(90, 77, 65, 0.4)' : 'rgba(126, 105, 87, 0.4)';
            }
            
            // Add data attribute for targeting in animations
            regionEl.dataset.region = region.name;
            
            mapContainer.appendChild(regionEl);
        });
        
        // Add map container to the threat map
        threatMap.appendChild(mapContainer);
        
        // Add attack points overlay
        const attackOverlay = document.createElement('div');
        attackOverlay.className = 'attack-overlay';
        threatMap.appendChild(attackOverlay);
    }
    
    // Function to display attack on the map
    function showAttackOnMap(country) {
        if (!threatMap) return;
        
        const attackOverlay = threatMap.querySelector('.attack-overlay');
        if (!attackOverlay) return;
        
        // Determine which region this country belongs to (simplified mapping)
        let region = 'Asia'; // Default
        
        if (['United States', 'Canada', 'Mexico'].includes(country)) {
            region = 'North America';
        } else if (['Brazil', 'Argentina', 'Chile', 'Colombia'].includes(country)) {
            region = 'South America';
        } else if (['United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Ukraine', 'Netherlands', 'Turkey'].includes(country)) {
            region = 'Europe';
        } else if (['South Africa', 'Nigeria', 'Egypt', 'Kenya'].includes(country)) {
            region = 'Africa';
        } else if (['Australia', 'New Zealand'].includes(country)) {
            region = 'Australia';
        }
        
        // Find the region element
        const regionEl = threatMap.querySelector(`.map-region[data-region="${region}"]`);
        if (!regionEl) return;
        
        // Create attack point with colors based on severity
        const attackPoint = document.createElement('div');
        attackPoint.className = 'attack-point';
        
        // Determine attack color based on region
        // Alternate between brew and mocha for attack points
        const useBrewColor = Math.random() > 0.5;
        if (useBrewColor) {
            attackPoint.style.backgroundColor = '#303031'; // brew
            attackPoint.innerHTML = `<span class="attack-pulse" style="background-color: rgba(48, 48, 49, 0.3);"></span>`;
        } else {
            attackPoint.style.backgroundColor = '#5A4D41'; // mocha
            attackPoint.innerHTML = `<span class="attack-pulse" style="background-color: rgba(90, 77, 65, 0.3);"></span>`;
        }
        
        // Random position within the region
        const rect = regionEl.getBoundingClientRect();
        const mapRect = threatMap.getBoundingClientRect();
        
        const left = (rect.left - mapRect.left) + Math.random() * rect.width;
        const top = (rect.top - mapRect.top) + Math.random() * rect.height;
        
        attackPoint.style.left = `${left}px`;
        attackPoint.style.top = `${top}px`;
        
        // Animate attack point
        attackOverlay.appendChild(attackPoint);
        
        // Remove attack point after animation
        setTimeout(() => {
            attackPoint.classList.add('fade-out');
            setTimeout(() => {
                attackOverlay.removeChild(attackPoint);
            }, 1000);
        }, 2000);
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
    
    // Enhanced smooth scroll with offset for fixed header
    function smoothScroll(target, duration) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const distance = targetPosition - startPosition - navbarHeight - 20;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        // Easing function
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Navigation highlighting and smooth scrolling
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId, 1000);
        });
    });
    
    // Enhanced scroll animations for elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkAnimations() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('show');
            }
        });
    }
    
    // Highlight active navigation link on scroll with optimized performance
    let ticking = false;
    
    function highlightNavOnScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
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
                
                ticking = false;
            });
            
            ticking = true;
        }
    }
    
    // Mobile navigation toggle with enhanced animation
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (hamburger) {
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
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                hamburger.click();
            }
        });
    });
    
    // Enhanced navbar background change on scroll
    const navbar = document.getElementById('navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(30, 29, 29, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(30, 29, 29, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // Contact form with enhanced security simulation
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
            
            // Show encrypting animation
            submitButton.innerHTML = '<i class="fas fa-lock"></i> Encrypting...';
            submitButton.disabled = true;
            
            // Add encryption animation to form
            contactForm.classList.add('encrypting');
            
            // Fake progress for encryption simulation
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 10;
                if (progress > 100) {
                    clearInterval(progressInterval);
                    
                    // Show sent confirmation
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Message Secured & Sent';
                    contactForm.classList.remove('encrypting');
                    contactForm.classList.add('sent');
                    
                    // Reset form after delay
                    setTimeout(() => {
                        // Message confirmation
                        alert(`Thanks for your encrypted message, ${name}! I'll get back to you soon.`);
                        contactForm.reset();
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        contactForm.classList.remove('sent');
                    }, 2000);
                }
            }, 200);
        });
    }
    
    // Enhanced skill bar animations
    const skillBars = document.querySelectorAll('.skill-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (barPosition < screenPosition) {
                const skillLevel = bar.getAttribute('data-level');
                const level = bar.querySelector('.skill-level');
                
                if (level && level.style.width === '0%') {
                    level.style.width = skillLevel;
                }
            }
        });
    }
    
    // Initialize all animations and features
    function initializeAnimations() {
        // Matrix effect
        setInterval(drawMatrix, 50);
        
        // Start typing effect
        if (typingCommand) {
            typeCommand();
        }
        
        // Initialize threat map
        initThreatMap();
        
        // Generate attack simulations
        if (attackLog && attackCount && countryCount && typeCount) {
            // Generate new attacks every 3-7 seconds
            setInterval(generateAttack, Math.random() * 4000 + 3000);
            
            // Generate initial attacks
            for (let i = 0; i < 5; i++) {
                setTimeout(generateAttack, i * 500);
            }
        }
        
        // Initial skill bar and element animations
        animateSkillBars();
        checkAnimations();
        updateNavbar();
        
        // Add scroll event listeners with throttling for performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = window.requestAnimationFrame(function() {
                highlightNavOnScroll();
                animateSkillBars();
                checkAnimations();
                updateNavbar();
            });
        });
    }
    
    // Wait for page to be fully loaded
    window.addEventListener('load', initializeAnimations);
    
    // Handle window resize for canvas and responsive elements
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        
        resizeTimeout = setTimeout(function() {
            // Resize canvas
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Reinitialize drops array
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.floor(Math.random() * -100);
            }
            
            // Check animations on resize
            animateSkillBars();
            checkAnimations();
        }, 250);
    });
});
