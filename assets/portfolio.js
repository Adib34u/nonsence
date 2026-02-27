// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Lenis RAF
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Navbar scroll effect
lenis.on('scroll', ({ scroll }) => {
  const navbar = document.getElementById('navbar');
  if (scroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
      
      // Smooth scroll to target
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  });
});

// Update active nav on scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

lenis.on('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
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

// ============================================
// GSAP SCROLL ANIMATIONS
// ============================================

// Hero Section Animations
gsap.from('.hero-content h1', {
  y: 100,
  opacity: 0,
  duration: 1.2,
  ease: 'power4.out',
  delay: 0.2
});

gsap.from('.subtitle', {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out',
  delay: 0.5
});

gsap.from('.cta-buttons', {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out',
  delay: 0.8
});

// Floating shapes continuous animation
gsap.to('.shape-1', {
  y: -30,
  x: 20,
  rotation: 360,
  duration: 8,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

gsap.to('.shape-2', {
  y: -40,
  x: -20,
  rotation: -360,
  duration: 10,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
  delay: 1
});

gsap.to('.shape-3', {
  y: -35,
  x: 15,
  rotation: 360,
  duration: 9,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
  delay: 2
});

// About Section - Image Animation
ScrollTrigger.create({
  trigger: '.about-image',
  start: 'top 80%',
  onEnter: () => {
    gsap.from('.about-image', {
      scale: 0.8,
      rotation: -10,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });
  },
  once: true
});

// About Section - Text Animation
ScrollTrigger.create({
  trigger: '.about-text',
  start: 'top 80%',
  onEnter: () => {
    gsap.from('.about-text p', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  },
  once: true
});

// Page Titles Animation
gsap.utils.toArray('.page-title').forEach(title => {
  ScrollTrigger.create({
    trigger: title,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(title, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      });
    },
    once: true
  });
});

// Projects Section - Cards Animation
ScrollTrigger.create({
  trigger: '.projects-grid',
  start: 'top 75%',
  onEnter: () => {
    gsap.from('.project-card', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });
  },
  once: true
});

// Skills Section - Items Animation
ScrollTrigger.create({
  trigger: '.skills-list',
  start: 'top 75%',
  onEnter: () => {
    gsap.from('.skill-item', {
      x: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });
    
    // Animate skill bars
    setTimeout(() => {
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const level = bar.getAttribute('data-level');
        gsap.to(bar, {
          width: level + '%',
          duration: 1.5,
          ease: 'power2.out'
        });
      });
    }, 500);
  },
  once: true
});

// Contact Section - Cards Animation
ScrollTrigger.create({
  trigger: '.contact-grid',
  start: 'top 75%',
  onEnter: () => {
    gsap.from('.contact-card', {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    });
  },
  once: true
});

// Parallax effect for mouse movement
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateParallax() {
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;
  
  gsap.to('.floating-shape', {
    x: (i) => currentX * (20 + i * 10),
    y: (i) => currentY * (20 + i * 10),
    duration: 0.5,
    ease: 'power2.out'
  });
  
  requestAnimationFrame(animateParallax);
}
animateParallax();

// Hover effects for buttons
const buttons = document.querySelectorAll('.btn, .view-btn');
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    gsap.to(this, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  btn.addEventListener('mouseleave', function() {
    gsap.to(this, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    gsap.to(this, {
      y: -15,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', function() {
    gsap.to(this, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
});

// Contact cards hover effect
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    gsap.to(this, {
      y: -10,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', function() {
    gsap.to(this, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// Skill items hover effect
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
  item.addEventListener('mouseenter', function() {
    gsap.to(this, {
      x: 10,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  item.addEventListener('mouseleave', function() {
    gsap.to(this, {
      x: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// About image hover effect
const aboutImage = document.querySelector('.about-image');
if (aboutImage) {
  aboutImage.addEventListener('mouseenter', function() {
    gsap.to('.about-image img', {
      scale: 1.05,
      rotation: 2,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  aboutImage.addEventListener('mouseleave', function() {
    gsap.to('.about-image img', {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
}

// About text paragraphs hover effect
const aboutParagraphs = document.querySelectorAll('.about-text p');
aboutParagraphs.forEach(p => {
  p.addEventListener('mouseenter', function() {
    gsap.to(this, {
      x: 10,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  p.addEventListener('mouseleave', function() {
    gsap.to(this, {
      x: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// Custom cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--primary), transparent);
  pointer-events: none;
  z-index: 9999;
  opacity: 0.5;
  filter: blur(10px);
  mix-blend-mode: screen;
`;
document.body.appendChild(cursor);

let cursorX = 0;
let cursorY = 0;
let cursorCurrentX = 0;
let cursorCurrentY = 0;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

function animateCursor() {
  cursorCurrentX += (cursorX - cursorCurrentX) * 0.15;
  cursorCurrentY += (cursorY - cursorCurrentY) * 0.15;
  
  cursor.style.transform = `translate(${cursorCurrentX - 10}px, ${cursorCurrentY - 10}px)`;
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Performance optimization: Reduce animations on low-end devices
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  gsap.globalTimeline.timeScale(0.5);
}

console.log('🚀 Portfolio loaded with Lenis smooth scroll!');
console.log('✨ Animations powered by GSAP');
console.log('🎨 Optimized for performance');
