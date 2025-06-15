// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

mobileToggle.addEventListener('click', function() {
  mobileToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
  if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
  }
});

// Contact Form Submission (from raabta.html)
const contactForm = document.getElementById('contactForm');

if (contactForm) { // Check if the form exists on the current page
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would normally handle the form submission with AJAX
    // For now, just show a success message
    alert('آپ کا پیغام بھیج دیا گیا ہے۔ ہم جلد ہی آپ سے رابطہ کریں گے۔');
    contactForm.reset();
  });
} 