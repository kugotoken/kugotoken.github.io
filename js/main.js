document.addEventListener('DOMContentLoaded', () => {
  // Loading screen functionality
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingProgress = document.querySelector('.loading-progress');
  
  // Simulate loading progress
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      
      setTimeout(() => {
        loadingScreen.classList.add('loaded');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 800);
      }, 500);
    }
    loadingProgress.style.width = `${progress}%`;
  }, 200);

  // Custom cursor
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });
  
  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.1;
    outlineY += (mouseY - outlineY) * 0.1;
    
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Cursor interactions
  const interactiveElements = document.querySelectorAll('a, button, .coin, .feature-card, .spec-item');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('active');
      cursorOutline.classList.add('active');
    });
    
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('active');
      cursorOutline.classList.remove('active');
    });
  });
  
  // Hide cursor when not moving
  let cursorTimeout;
  document.addEventListener('mousemove', () => {
    cursorDot.classList.remove('hidden');
    cursorOutline.classList.remove('hidden');
    
    clearTimeout(cursorTimeout);
    cursorTimeout = setTimeout(() => {
      cursorDot.classList.add('hidden');
      cursorOutline.classList.add('hidden');
    }, 3000);
  });

  // Coin flip animation
  const coin = document.getElementById('coinLogo');
  if (coin) {
    coin.addEventListener('click', (e) => {
      e.stopPropagation();
      if (coin.classList.contains('flipping')) return;
      coin.classList.add('flipping');
      
      playCoinSound();
      
      setTimeout(() => coin.classList.remove('flipping'), 1400);
      
      createCoinParticles(e.clientX, e.clientY);
    });
  }

  function playCoinSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(659.25, audioContext.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.log('Audio not supported');
    }
  }

  function createCoinParticles(x, y) {
    const particleCount = 12;
    const container = document.getElementById('dynamic-coins') || document.body;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'dynamic-coin';
      
      const angle = (i / particleCount) * Math.PI * 2;
      const speed = 2 + Math.random() * 3;
      const distance = 50 + Math.random() * 50;
      const tx = Math.cos(angle) * distance;
      const delay = Math.random() * 0.5;
      
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.animationDelay = `${delay}s`;
      particle.style.width = `${10 + Math.random() * 15}px`;
      particle.style.height = particle.style.width;
      
      container.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, 1400);
    }
  }

  // Enhanced particle system
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const delay = Math.random() * 20;
      const duration = 15 + Math.random() * 15;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}vw`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.opacity = Math.random() * 0.3 + 0.1;
      
      // Add occasional gold particles
      if (Math.random() > 0.7) {
        particle.style.background = 'var(--gold)';
        particle.style.boxShadow = '0 0 8px var(--gold)';
      }
      
      container.appendChild(particle);
    }
  }

  // Enhanced click effect
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.cta-button, .socials a, .coin')) return;

    const container = document.getElementById('dynamic-coins') || document.body;
    const coinCount = 3 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < coinCount; i++) {
      setTimeout(() => {
        const coinEl = document.createElement('div');
        coinEl.className = 'dynamic-coin';
        
        const offsetX = (Math.random() - 0.5) * 100;
        const delay = Math.random() * 0.3;
        
        coinEl.style.left = (e.clientX - 16) + 'px';
        coinEl.style.top = (e.clientY - 16) + 'px';
        coinEl.style.setProperty('--tx', `${offsetX}px`);
        coinEl.style.animationDelay = `${delay}s`;
        coinEl.style.width = `${20 + Math.random() * 20}px`;
        coinEl.style.height = coinEl.style.width;
        
        container.appendChild(coinEl);

        setTimeout(() => {
          if (coinEl.parentNode) coinEl.parentNode.removeChild(coinEl);
        }, 1400);
      }, i * 100);
    }
  });

  // Scroll animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Add staggered animation for feature cards
          if (entry.target.classList.contains('feature-card')) {
            const cards = document.querySelectorAll('.feature-card');
            const index = Array.from(cards).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .tech-specs, .vision-content').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Smooth scrolling
  function initSmoothScrolling() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const featuresSection = document.querySelector('.features');
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  // Back to top button
  function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Parallax effect
  function initParallax() {
    const glowBg = document.querySelector('.glow-bg');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      if (glowBg) {
        glowBg.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
      }
    });
  }

  // Mouse follow effect
  function initMouseFollow() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    heroSection.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = heroSection.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const coinContainer = document.querySelector('.coin-container');
      if (coinContainer) {
        coinContainer.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      }
      
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        heroTitle.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
      }
    });
    
    heroSection.addEventListener('mouseleave', () => {
      const coinContainer = document.querySelector('.coin-container');
      if (coinContainer) {
        coinContainer.style.transform = 'translate(0, 0)';
      }
      
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        heroTitle.style.transform = 'translate(0, 0)';
      }
    });
  }

  // Initialize all functionality
  createParticles();
  initScrollAnimations();
  initSmoothScrolling();
  initBackToTop();
  initParallax();
  initMouseFollow();

  // Preload critical resources
  function preloadCriticalResources() {
    const criticalImages = [];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  
  preloadCriticalResources();
});