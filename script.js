// Enhanced Portfolio JavaScript with Cybersecurity Features

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }
    
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    if (!themeIcon) {
        console.error('Theme icon not found');
        return;
    }
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply theme
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        // Ensure dark mode is set
        body.classList.remove('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        body.classList.toggle('light-theme');
        
        // Update icon
        if (body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Matrix canvas background
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters for the Matrix effect (coffee-themed)
    const chars = '10AIMLLLMGPTNEURALNETWORKEMBEDDINGVISIONTRANSFORMERAGENT';
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array to store the  position of each column
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
        "python train_model.py --epochs 50",
        "ollama run llama3.2",
        "curl api.anthropic.com/v1/messages",
        "python app.py --mode inference",
        "git push origin main"
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
        
        // Update stat counters with animation
        if (attackCount && countryCount && typeCount) {
            updateCounter(attackCount, totalAttacks);
            updateCounter(countryCount, trackCountries.size);
            updateCounter(typeCount, trackTypes.size);
        }
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
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId, 1000);
            if (navMenu) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Enhanced scroll animations for elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkAnimation() {
        const triggerBottom = window.innerHeight * 0.8;

        animatedElements.forEach(element => {
            const box = element.getBoundingClientRect();
            if (box.top < triggerBottom) {
                element.classList.add('show');
                element.querySelectorAll('.skill-bar').forEach(bar => {
                    const fill = bar.querySelector('.skill-level');
                    if (fill) fill.style.width = bar.getAttribute('data-level') || '0%';
                });
            } else {
                element.classList.remove('show');
                element.querySelectorAll('.skill-bar').forEach(bar => {
                    const fill = bar.querySelector('.skill-level');
                    if (fill) fill.style.width = '0%';
                });
            }
        });
    }

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            if (section.getBoundingClientRect().top <= 150) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    window.addEventListener('scroll', checkAnimation);
    window.addEventListener('scroll', updateActiveNav);
    checkAnimation();
    updateActiveNav();
    
    // Start the Matrix effect animation
    setInterval(drawMatrix, 50);
    
    // Start the terminal typing effect
    typeCommand();
    
    // Simulated AI development feed
    const simulatedEvents = [
        { source: "Anthropic", event: "Constitutional AI v3 alignment paper published", domain: "AI Safety", impact: 9, time: () => new Date().toLocaleTimeString() },
        { source: "OpenAI", event: "GPT-5 reasoning benchmark results released", domain: "Language Models", impact: 8, time: () => new Date().toLocaleTimeString() },
        { source: "Google DeepMind", event: "Gemini 2.5 multimodal architecture update", domain: "Multimodal AI", impact: 8, time: () => new Date().toLocaleTimeString() },
        { source: "Meta AI", event: "LLaMA 4 open-source weights released", domain: "Open Source LLM", impact: 9, time: () => new Date().toLocaleTimeString() },
        { source: "Mistral AI", event: "Mixture-of-experts inference optimization", domain: "Model Architecture", impact: 7, time: () => new Date().toLocaleTimeString() },
        { source: "Hugging Face", event: "New instruction-tuning dataset benchmark", domain: "Training & Fine-Tuning", impact: 5, time: () => new Date().toLocaleTimeString() },
        { source: "Stanford HAI", event: "AI Index 2026 annual report published", domain: "AI Research", impact: 6, time: () => new Date().toLocaleTimeString() },
        { source: "NVIDIA", event: "H200 transformer inference throughput record", domain: "AI Hardware", impact: 7, time: () => new Date().toLocaleTimeString() },
        { source: "Cohere", event: "Enterprise RAG pipeline benchmark study", domain: "Enterprise AI", impact: 6, time: () => new Date().toLocaleTimeString() },
        { source: "xAI", event: "Grok-3 expanded multimodal capabilities", domain: "Language Models", impact: 7, time: () => new Date().toLocaleTimeString() }
    ];

    let eventIndex = 0;
    let totalEvents = 0;
    const trackedSources = new Set();
    const trackedDomains = new Set();

    function showSimulatedEvent() {
        const event = simulatedEvents[eventIndex % simulatedEvents.length];
        eventIndex++;

        trackedSources.add(event.source);
        trackedDomains.add(event.domain);

        const attackEntry = document.createElement('div');
        attackEntry.className = 'attack-entry';

        let impactClass = 'low';
        if (event.impact > 7) impactClass = 'high';
        else if (event.impact > 4) impactClass = 'medium';

        attackEntry.innerHTML = `
            <div class="attack-time">${event.time()}</div>
            <div class="attack-details">
                <span class="attack-source">${event.source}</span>
                <span class="attack-type">${event.event}</span>
                <span class="attack-target">${event.domain}</span>
                <span class="attack-severity ${impactClass}">[Impact: ${event.impact}/10]</span>
            </div>
        `;

        if (attackLog) {
            attackLog.prepend(attackEntry);
            setTimeout(() => {
                attackEntry.classList.add('visible');
            }, 10);
            if (attackLog.children.length > 15) {
                attackLog.removeChild(attackLog.lastChild);
            }
        }

        totalEvents++;
        if (attackCount && countryCount && typeCount) {
            updateCounter(attackCount, totalEvents);
            updateCounter(countryCount, trackedSources.size);
            updateCounter(typeCount, trackedDomains.size);
        }
    }

    function showThreatWithMap() {
        showSimulatedEvent();
    }

    // Start the simulation
    setInterval(showThreatWithMap, 2500); // Faster interval for more activity
    
    // Show more on load for better initial display
    for (let i = 0; i < 5; i++) {
        showThreatWithMap();
    }
});