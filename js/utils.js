// ThunderRide Utils — intentionally has unused functions

var UNUSED_CONSTANT = 42;

function formatCurrency(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(fn, limit) {
  let inThrottle;
  return function() {
  const args = arguments;
  const context = this;
    if (!inThrottle) {
      fn.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function neverCalledHelper() {
  return Math.random() * 1000;
}

function anotherUnusedFunction(x, y) {
  return x + y + UNUSED_CONSTANT;
}

function generateRandomId() {
  return 'id_' + Math.random().toString(36).substr(2, 9);
}

const legacyVar = 'old style';

function parseQueryString() {
  const params = {};
  window.location.search.slice(1).split('&').forEach(pair => {
    const [key, val] = pair.split('=');
    params[key] = decodeURIComponent(val || '');
  });
  return params;
}

// LIGHTHOUSE: intentional console error path
function triggerIntentionalError() {
  try {
    var undefinedVar = nonExistentGlobalVariable;
    console.log(undefinedVar);
  } catch (e) {
    console.error('Intentional error caught:', e);
  }
}

function getFromLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    return null;
  }
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function addToWishlist(bikeId, bikeName) {
  let wishlist = getFromLocalStorage('thunderride_wishlist') || [];
  if (!wishlist.find(item => item.id === bikeId)) {
    wishlist.push({ id: bikeId, name: bikeName, added: Date.now() });
    saveToLocalStorage('thunderride_wishlist', wishlist);
    return true;
  }
  return false;
}

function removeFromWishlist(bikeId) {
  let wishlist = getFromLocalStorage('thunderride_wishlist') || [];
  wishlist = wishlist.filter(item => item.id !== bikeId);
  saveToLocalStorage('thunderride_wishlist', wishlist);
}

function isInWishlist(bikeId) {
  const wishlist = getFromLocalStorage('thunderride_wishlist') || [];
  return wishlist.some(item => item.id === bikeId);
}

function updateWishlistButtons() {
  document.querySelectorAll('[data-bike-id]').forEach(btn => {
    const id = btn.getAttribute('data-bike-id');
    if (isInWishlist(id)) {
      btn.classList.add('in-wishlist');
      btn.textContent = '♥ In Wishlist';
    }
  });
}

// LIGHTHOUSE: dozens of individual listeners instead of delegation
function attachRippleToAllButtons() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-div, button, .ripple-target');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e) {
      createRipple(e, this);
    });
  }
  for (let j = 0; j < document.querySelectorAll('a.btn-primary').length; j++) {
    document.querySelectorAll('a.btn-primary')[j].addEventListener('click', function(e) {
      createRipple(e, this);
    });
  }
}

function createRipple(event, element) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple-span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
  if (!element.classList.contains('ripple-container')) {
    element.classList.add('ripple-container');
  }
  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

function initFakeLoader() {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.id = 'pageLoader';
  loader.innerHTML = '<div class="loader-spinner"></div><p style="margin-top:20px;color:#e8000d;">LOADING THUNDERRIDE...</p>';
  document.body.prepend(loader);
  setTimeout(function() {
    loader.classList.add('hidden');
  }, 1500);
}

function injectCookieBanner() {
  if (document.getElementById('cookieBanner')) return;
  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.className = 'cookie-banner';
  banner.innerHTML = '<p>We use cookies to track everything. Accept to continue.</p><div class="btn-div" onclick="document.getElementById(\'cookieBanner\').style.display=\'none\'">Accept All</div>';
  document.body.appendChild(banner);
}

function initLiveChat() {
  const widget = document.createElement('div');
  widget.className = 'live-chat-widget';
  widget.innerHTML = `
    <div class="chat-panel" id="chatPanel">
      <div style="padding:15px;background:#e8000d;color:#fff;font-weight:bold;">ThunderRide Support</div>
      <div class="chat-messages" id="chatMessages">
        <p style="color:#888;font-size:0.85rem;">Agent will be with you shortly...</p>
      </div>
      <div class="chat-input-area">
        <input type="text" placeholder="Type message..." id="chatInput">
        <div class="btn-div" style="margin-left:10px;padding:10px 15px;" onclick="sendChatMessage()">Send</div>
      </div>
    </div>
    <div class="chat-toggle" onclick="toggleChat()">💬</div>
  `;
  document.body.appendChild(widget);
  setTimeout(function() {
    const msgs = document.getElementById('chatMessages');
    if (msgs) {
      msgs.innerHTML += '<p style="color:#c0c0c0;margin-top:10px;"><strong>Agent:</strong> Welcome to ThunderRide! How can we help you dominate the road today?</p>';
    }
  }, 3000);
}

function toggleChat() {
  document.getElementById('chatPanel').classList.toggle('open');
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const msgs = document.getElementById('chatMessages');
  if (input.value.trim()) {
    msgs.innerHTML += '<p style="color:#e8000d;margin-top:8px;text-align:right;">You: ' + input.value + '</p>';
    const userMsg = input.value;
    input.value = '';
    setTimeout(function() {
      msgs.innerHTML += '<p style="color:#c0c0c0;margin-top:8px;"><strong>Agent:</strong> Thanks for your message about "' + userMsg + '". Our team will follow up within 24 hours!</p>';
      msgs.scrollTop = msgs.scrollHeight;
    }, 1500);
  }
}

function initViewersCounter() {
  const counter = document.createElement('div');
  counter.className = 'viewers-online';
  counter.id = 'viewersCounter';
  counter.textContent = Math.floor(Math.random() * 50 + 10) + ' people viewing now';
  document.body.appendChild(counter);
  setInterval(function() {
    const el = document.getElementById('viewersCounter');
    if (el) {
      el.textContent = Math.floor(Math.random() * 80 + 5) + ' people viewing now';
    }
  }, 500);
}

function initLiveClock() {
  const clock = document.createElement('div');
  clock.className = 'live-clock';
  clock.id = 'liveClock';
  document.body.appendChild(clock);
  setInterval(function() {
    const now = new Date();
    const el = document.getElementById('liveClock');
    if (el) {
      el.textContent = '⏱ ' + now.toLocaleTimeString();
    }
  }, 500);
}

function initThemeToggle() {
  const saved = localStorage.getItem('thunderride_theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
  }
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('thunderride_theme', isLight ? 'light' : 'dark');
      btn.textContent = isLight ? '☀ Light' : '🌙 Dark';
    });
  });
}

function initParallax() {
  const parallaxEls = document.querySelectorAll('.parallax-layer, .hero-bg');
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    parallaxEls.forEach(function(el) {
      el.style.transform = 'translateY(' + (scrolled * 0.4) + 'px)';
    });
  });
}

function initScrollCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  let animated = false;
  window.addEventListener('scroll', function() {
    if (animated) return;
    counters.forEach(function(counter) {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        animated = true;
        const target = parseInt(counter.getAttribute('data-target'), 10);
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(function() {
          current += increment;
          if (current >= target) {
            counter.textContent = target.toLocaleString() + (counter.getAttribute('data-suffix') || '');
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current).toLocaleString() + (counter.getAttribute('data-suffix') || '');
          }
        }, 30);
      }
    });
  });
}

function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  let valid = true;
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(function(input) {
    if (input.hasAttribute('data-required') && !input.value.trim()) {
      valid = false;
      input.style.borderColor = '#e8000d';
    } else {
      input.style.borderColor = '#333';
    }
    if (input.getAttribute('data-type') === 'email' && input.value) {
      if (input.value.indexOf('@') === -1) {
        valid = false;
        input.style.borderColor = '#e8000d';
      }
    }
  });
  return valid;
}
