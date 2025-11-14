// Typing effect for job titles
const typingEl = document.getElementById('typing');
const cursorEl = document.querySelector('.cursor');

const titles = [
  'Web Developer',
  'UI/UX Designer',
  'Pembuat Portofolio Interaktif'
];

let tIndex = 0;
let charIndex = 0;
let deleting = false;
const typeSpeed = 80;
const deleteSpeed = 40;
const holdDelay = 1200;

function type() {
  const current = titles[tIndex];
  if (!deleting) {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, holdDelay);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      tIndex = (tIndex + 1) % titles.length;
    }
  }
  setTimeout(type, deleting ? deleteSpeed : typeSpeed);
}
if (typingEl) type();

// Fade-in on scroll using IntersectionObserver
const faders = document.querySelectorAll('.fade-section');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

faders.forEach(f => io.observe(f));

// Portfolio modal logic
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDesc = document.getElementById('modal-desc');

document.addEventListener('click', (ev) => {
  const card = ev.target.closest('.project-card');
  if (card) {
    const title = card.dataset.title || 'Proyek';
    const img = card.dataset.img || '';
    const desc = card.dataset.desc || '';
    openModal({ title, img, desc });
  }

  // close buttons
  if (ev.target.matches('[data-close]')) {
    closeModal();
  }
});

function openModal({ title, img, desc }) {
  modalTitle.textContent = title;
  modalImage.src = img;
  modalImage.alt = title;
  modalDesc.textContent = desc;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Close modal on Escape
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();