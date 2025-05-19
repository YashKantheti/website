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
    
    function checkAnimation() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const box = element.getBoundingClientRect();
            if (box.top < triggerBottom) {
                element.classList.add('show');
            } else {
                element.classList.remove('show');
            }
        });
    }
    
    window.addEventListener('scroll', checkAnimation);
    checkAnimation();
    
    // Start the Matrix effect animation
    setInterval(drawMatrix, 50);
    
    // Start the terminal typing effect
    typeCommand();
    
    // --- Replace the random attack simulation with a "made up but realistic" feed ---
    // Simulated up-to-date network threat feed (fictional, but looks real)
    const simulatedThreats = [
        {
            country: "Russia",
            attackType: "Zero-day Exploit",
            targetType: "Financial Institution",
            severity: 9,
            time: () => new Date().toLocaleTimeString()
        },
        {
            country: "China",
            attackType: "DDoS",
            targetType: "Government Agency",
            severity: 8,
            time: () => new Date().toLocaleTimeString()
        },
        {
            country: "United States",
            attackType: "Phishing",
            targetType: "Healthcare Provider",
            severity: 6,
            time: () => new Date().toLocaleTimeString()
        },
        {
            country: "Iran",
            attackType: "Ransomware",
            targetType: "Energy Infrastructure",
            severity: 10,
            time: () => new Date().toLocaleTimeString()
        },
        {
            country: "North Korea",
            attackType: "Brute Force",
            targetType: "Military Network",
            severity: 7,
            time: () => new Date().toLocaleTimeString()
        },
        {
            country: "Brazil",
            attackType: "SQL Injection",
            targetType: "E-commerce Platform",
            severity: 5,
            time: () => new Date().toLocaleTimeString()
        },
        {
            country: "India",
            attackType: "Malware",
            targetType: "Cloud Service",
            severity: 6,
            time: () => new Date().toLocaleTimeString()
        },
        {
            country: "Germany",
            attackType: "Supply Chain Attack",
            targetType: "Manufacturing Facility",
            severity: 8,
            time: () => new Date().toLocaleTimeString()
        },
        {
            country: "France",
            attackType: "APT",
            targetType: "Telecom Provider",
            severity: 7,
            time: () => new Date().toLocaleTimeString()
        },
        {
            country: "Turkey",
            attackType: "Social Engineering",
            targetType: "Educational Institution",
            severity: 4,
            time: () => new Date().toLocaleTimeString()
        }
    ];

    let threatIndex = 0;
    let madeUpTotalAttacks = 0;
    const madeUpCountries = new Set();
    const madeUpTypes = new Set();

    function showSimulatedThreat() {
        const threat = simulatedThreats[threatIndex % simulatedThreats.length];
        threatIndex++;

        madeUpCountries.add(threat.country);
        madeUpTypes.add(threat.attackType);

        const attackEntry = document.createElement('div');
        attackEntry.className = 'attack-entry';

        let severityClass = 'low';
        if (threat.severity > 7) severityClass = 'high';
        else if (threat.severity > 4) severityClass = 'medium';

        attackEntry.innerHTML = `
            <div class="attack-time">${threat.time()}</div>
            <div class="attack-details">
                <span class="attack-source">${threat.country}</span>
                <span class="attack-type">${threat.attackType}</span>
                <span class="attack-target">${threat.targetType}</span>
                <span class="attack-severity ${severityClass}">[Severity: ${threat.severity}/10]</span>
            </div>
        `;

        if (attackLog) {
            attackLog.prepend(attackEntry);
            setTimeout(() => {
                attackEntry.classList.add('visible');
            }, 10);
            if (attackLog.children.length > 10) {
                attackLog.removeChild(attackLog.lastChild);
            }
        }

        madeUpTotalAttacks++;
        if (attackCount && countryCount && typeCount) {
            updateCounter(attackCount, madeUpTotalAttacks);
            updateCounter(countryCount, madeUpCountries.size);
            updateCounter(typeCount, madeUpTypes.size);
        }
    }

    // Replace the old simulation with the new one
    setInterval(showSimulatedThreat, 3500);
    // Show a few on load
    for (let i = 0; i < 3; i++) showSimulatedThreat();
});