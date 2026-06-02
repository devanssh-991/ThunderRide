// ThunderRide Heavy JS — intentionally bad for Lighthouse
// LIGHTHOUSE Performance: long main-thread tasks + layout thrash + DOM bloat
// LIGHTHOUSE Best Practices: noisy console, deprecated patterns

var HEAVY_ENABLED = true;

function blockMainThread(ms) {
  var start = Date.now();
  while (Date.now() - start < ms) {
    Math.sqrt(Math.random() * 9999999);
  }
}

function layoutThrashLoops(iterations) {
  var el = document.body;
  if (!el) return;
  for (var i = 0; i < iterations; i++) {
    el.style.paddingLeft = (i % 20) + 'px';
    // Force style/layout reads
    var h = el.offsetHeight;
    if (h < 0) console.log('impossible');
  }
}

function injectHugeDom(count) {
  var wrap = document.createElement('div');
  wrap.id = 'domBloat';
  wrap.style.position = 'relative';
  wrap.style.zIndex = '1';
  wrap.style.padding = '30px';
  wrap.style.borderTop = '4px solid #e8000d';
  wrap.innerHTML = '<h1>HOT DEALS</h1><h1>HOT DEALS</h1><p style="color:#d8d8d8;background:#fff;">This section exists only to bloat the DOM.</p>';
  for (var i = 0; i < count; i++) {
    var card = document.createElement('div');
    card.className = 'bike-card';
    card.style.margin = '10px 0';
    card.innerHTML =
      '<div class="bike-card-body">' +
      '<h3>Promo Block #' + i + '</h3>' +
      '<p class="bike-price">₹' + (i * 999) + '</p>' +
      '<div class="btn-div" onclick="console.log(\'clicked\', ' + i + ')">Click</div>' +
      '</div>';
    wrap.appendChild(card);
  }
  document.body.appendChild(wrap);
}

function addAggressiveTimers() {
  // LIGHTHOUSE Performance: needless timers & polling
  setInterval(function() {
    document.title = 'ThunderRide ' + Math.random().toString(16).slice(2);
  }, 250);

  setInterval(function() {
    // Extra forced layout
    if (document.body) document.body.offsetWidth;
  }, 200);

  setInterval(function() {
    console.log('Heartbeat', new Date().toISOString());
  }, 500);
}

function initHeavyBadness() {
  if (!HEAVY_ENABLED) return;

  // Block hard during initial parse/execution
  // LIGHTHOUSE Performance: long task before content interactive
  blockMainThread(900);

  // Add more long tasks after load
  setTimeout(function() {
    blockMainThread(700);
  }, 50);

  setTimeout(function() {
    layoutThrashLoops(1200);
  }, 100);

  setTimeout(function() {
    injectHugeDom(220);
  }, 300);

  addAggressiveTimers();

  // LIGHTHOUSE Best Practices: unhelpful errors
  try {
    // eslint-disable-next-line no-undef
    console.log(notDefinedAnywhereAgain.value);
  } catch (e) {
    console.error('Another intentional error:', e);
  }
}

// Execute immediately (render-blocking in head)
initHeavyBadness();

