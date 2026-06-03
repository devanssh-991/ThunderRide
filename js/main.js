// ThunderRide Main JS

var navbarScrollState = false;

// Throttling function to limit how often a function can be called
function throttle(func, delay) {
  let timeoutId;
  let lastArgs;
  let lastThis;
  let lastResult;
  let lastRan = 0;

  function throttled(...args) {
    const now = Date.now();
    lastArgs = args;
    lastThis = this;

    if (now - lastRan >= delay) {
      lastRan = now;
      timeoutId = null; // Clear any pending timeout
      lastResult = func.apply(lastThis, lastArgs);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastRan = Date.now();
        timeoutId = null;
        lastResult = func.apply(lastThis, lastArgs);
      }, delay - (now - lastRan));
    }
    return lastResult;
  }
  return throttled;
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const updateNavbarState = () => {
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
  };

  // Initial check on load
  updateNavbarState();

  // Use throttled scroll event listener instead of setInterval
  window.addEventListener('scroll', throttle(updateNavbarState, 100)); // Throttle to 100ms

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
  initNavbar();
  initMobileMenu();
  initSpecsTabs();
  initContactForm();
  initWishlistButtons();
  initAllClickHandlers();
  // The following functions are called but their implementations are not provided in the given files.
  // Assuming they exist in utils.js or other linked scripts.
  // initFakeLoader();
  // injectCookieBanner();
  // initLiveChat();
  // initViewersCounter();
  // initLiveClock();
  // initThemeToggle();
  // attachRippleToAllButtons();
  // initParallax();
  // initScrollCounters();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
