// AI Portfolio JavaScript

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
    
    // AI Pulse feed elements
    const feedLog = document.getElementById('feed-log');
    const feedCount = document.getElementById('feed-count');
    const countryCount = document.getElementById('country-count');
    const typeCount = document.getElementById('type-count');


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
    
    // AI Pulse — live news via Hacker News Algolia API (free, no key, CORS-enabled)
    let totalEvents = 0;
    const trackedSources = new Set();
    const trackedDomains = new Set();

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function safeUrl(url) {
        if (!url) return null;
        try {
            const u = new URL(url);
            return (u.protocol === 'http:' || u.protocol === 'https:') ? url : null;
        } catch { return null; }
    }

    function extractDomain(url) {
        const safe = safeUrl(url);
        if (!safe) return 'Hacker News';
        try { return new URL(safe).hostname.replace('www.', ''); }
        catch { return 'Hacker News'; }
    }

    function categorizeAI(title) {
        const t = title.toLowerCase();
        if (t.includes('gpt') || t.includes('openai') || t.includes('chatgpt') || t.includes('language model')) return 'Language Models';
        if (t.includes('claude') || t.includes('anthropic') || t.includes('alignment') || t.includes('safety')) return 'AI Safety';
        if (t.includes('gemini') || t.includes('deepmind') || t.includes('multimodal')) return 'Multimodal AI';
        if (t.includes('llama') || t.includes('mistral') || t.includes('open-source') || t.includes('open source')) return 'Open Source LLM';
        if (t.includes('agent') || t.includes('autonom')) return 'AI Agents';
        if (t.includes('image') || t.includes('vision') || t.includes('diffusion')) return 'Computer Vision';
        if (t.includes('robot')) return 'Robotics';
        if (t.includes('paper') || t.includes('research') || t.includes('benchmark')) return 'AI Research';
        return 'AI & ML';
    }

    function scoreToImpact(points, comments) {
        const total = (points || 0) + (comments || 0) * 2;
        if (total > 400) return 9;
        if (total > 200) return 8;
        if (total > 100) return 7;
        if (total > 50)  return 6;
        if (total > 20)  return 5;
        return Math.max(1, Math.round(total / 10)) || 4;
    }

    function displayNewsItem(title, url, source, domain, impact, timeStr) {
        const entry = document.createElement('div');
        entry.className = 'feed-entry';

        let impactClass = impact > 7 ? 'high' : impact > 4 ? 'medium' : 'low';
        const safe = safeUrl(url);
        const titleHtml = safe
            ? `<a href="${safe}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;">${escapeHtml(title)}</a>`
            : escapeHtml(title);

        entry.innerHTML = `
            <div class="feed-time">${escapeHtml(timeStr)}</div>
            <div class="feed-details">
                <span class="feed-source">${escapeHtml(source)}</span>
                <span class="feed-type">${titleHtml}</span>
                <span class="feed-target">${escapeHtml(domain)}</span>
                <span class="feed-impact ${impactClass}">[Impact: ${impact}/10]</span>
            </div>
        `;

        if (feedLog) {
            feedLog.prepend(entry);
            setTimeout(() => entry.classList.add('visible'), 10);
            if (feedLog.children.length > 15) feedLog.removeChild(feedLog.lastChild);
        }

        trackedSources.add(source);
        trackedDomains.add(domain);
        totalEvents++;

        if (feedCount && countryCount && typeCount) {
            updateCounter(feedCount, totalEvents);
            updateCounter(countryCount, trackedSources.size);
            updateCounter(typeCount, trackedDomains.size);
        }
    }

    const AI_KEYWORDS = ['ai', 'llm', 'gpt', 'claude', 'gemini', 'llama', 'mistral', 'neural', 'openai', 'anthropic', 'machine learning', 'deep learning', 'diffusion', 'transformer', 'chatbot', 'agent'];

    async function loadAINews() {
        try {
            const res = await fetch('https://hn.algolia.com/api/v1/search_by_date?query=AI+LLM+machine+learning&tags=story&hitsPerPage=25');
            if (!res.ok) throw new Error('fetch failed');
            const data = await res.json();

            const hits = data.hits.filter(h =>
                h.title && AI_KEYWORDS.some(kw => h.title.toLowerCase().includes(kw))
            ).slice(0, 12);

            if (hits.length === 0) throw new Error('no relevant results');

            if (feedLog) feedLog.innerHTML = '';

            hits.forEach((hit, i) => {
                setTimeout(() => {
                    const source = extractDomain(hit.url);
                    const domain = categorizeAI(hit.title);
                    const impact = scoreToImpact(hit.points, hit.num_comments);
                    const timeStr = new Date(hit.created_at).toLocaleTimeString();
                    displayNewsItem(hit.title, hit.url, source, domain, impact, timeStr);
                }, i * 250);
            });
        } catch {
            // Fallback when offline or API unavailable
            const fallback = [
                { title: 'Claude model update released', url: null, source: 'Anthropic', domain: 'AI Safety', impact: 8 },
                { title: 'GPT-5 reasoning benchmark results', url: null, source: 'OpenAI', domain: 'Language Models', impact: 9 },
                { title: 'Gemini 2.5 multimodal architecture', url: null, source: 'Google DeepMind', domain: 'Multimodal AI', impact: 8 },
                { title: 'LLaMA 4 open-source weights released', url: null, source: 'Meta AI', domain: 'Open Source LLM', impact: 8 },
                { title: 'New fine-tuning benchmark released', url: null, source: 'Hugging Face', domain: 'Training & Fine-Tuning', impact: 6 }
            ];
            fallback.forEach((item, i) => {
                setTimeout(() => {
                    displayNewsItem(item.title, item.url, item.source, item.domain, item.impact, new Date().toLocaleTimeString());
                }, i * 250);
            });
        }
    }

    loadAINews();
    setInterval(loadAINews, 5 * 60 * 1000);
});