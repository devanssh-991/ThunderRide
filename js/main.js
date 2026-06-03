// ThunderRide Main JS — loaded in head without defer

// LIGHTHOUSE: document.write usage - Removed document.write as it's a performance anti-pattern.

var navbarScrollState = false;

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // LIGHTHOUSE: setInterval polling instead of scroll event for navbar
  setInterval(function() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > 50 && !navbarScrollState) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('navbar-default');
      navbarScrollState = true;
    } else if (scrollY <= 50 && navbarScrollState) {
      navbar.classList.remove('scrolled');
      navbar.classList.add('navbar-default');
      navbarScrollState = false;
    }
  }, 500);

  // Highlight active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function() {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }
}

function initSpecsTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const tabId = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
      btn.classList.add('active');
      const panel = document.getElementById(tabId);
      if (panel) panel.classList.add('active');
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm('contactForm')) {
      alert('Thank you! We will contact you soon.');
      form.reset();
    } else {
      alert('Please fill all required fields correctly.');
    }
  });
}

function initWishlistButtons() {
  document.querySelectorAll('.wishlist-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const id = btn.getAttribute('data-bike-id');
      const name = btn.getAttribute('data-bike-name');
      if (isInWishlist(id)) {
        removeFromWishlist(id);
        btn.classList.remove('in-wishlist');
        btn.textContent = '♡ Add to Wishlist';
      } else {
        addToWishlist(id, name);
        btn.classList.add('in-wishlist');
        btn.textContent = '♥ In Wishlist';
      }
    });
  });
  updateWishlistButtons();
}

// LIGHTHOUSE: attach many individual listeners in loops
function initAllClickHandlers() {
  const clickableDivs = document.querySelectorAll('[data-action]');
  for (var k = 0; k < clickableDivs.length; k++) {
    clickableDivs[k].addEventListener('click', function() {
      var action = this.getAttribute('data-action');
      if (action === 'explore') {
        window.location.href = 'bikes.html';
      }
    });
  }
}

function bootApp() {
  triggerIntentionalError();
  initNavbar();
  initMobileMenu();
  initSpecsTabs();
  initContactForm();
  initWishlistButtons();
  initAllClickHandlers();
  initFakeLoader();
  injectCookieBanner();
  initLiveChat();
  initViewersCounter();
  initLiveClock();
  initThemeToggle();
  attachRippleToAllButtons();
  initParallax();
  initScrollCounters();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
