// Bike Filter & Sort — JS DOM manipulation

var allBikes = [];

function initBikeFilter() {
  const cards = document.querySelectorAll('.bike-card');
  cards.forEach(function(card) {
    allBikes.push({
      element: card,
      category: card.getAttribute('data-category'),
      price: parseInt(card.getAttribute('data-price'), 10),
      name: card.querySelector('h3').textContent
    });
  });

  const categoryFilter = document.getElementById('filterCategory');
  const sortSelect = document.getElementById('sortBikes');
  const searchInput = document.getElementById('searchBikes');

  if (categoryFilter) {
    categoryFilter.addEventListener('change', applyFilters);
  }
  if (sortSelect) {
    sortSelect.addEventListener('change', applyFilters);
  }
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  const filterBtns = document.querySelectorAll('.filter-tag');
  for (var i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener('click', function() {
      document.querySelectorAll('.filter-tag').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      if (categoryFilter) {
        categoryFilter.value = this.getAttribute('data-filter') || 'all';
      }
      applyFilters();
    });
  }
}

function applyFilters() {
  const categoryEl = document.getElementById('filterCategory');
  const sortEl = document.getElementById('sortBikes');
  const searchEl = document.getElementById('searchBikes');

  const category = categoryEl ? categoryEl.value : 'all';
  const sortBy = sortEl ? sortEl.value : 'name';
  const search = searchEl ? searchEl.value.toLowerCase() : '';

  let filtered = allBikes.filter(function(bike) {
    const matchCategory = category === 'all' || bike.category === category;
    const matchSearch = !search || bike.name.toLowerCase().indexOf(search) !== -1;
    return matchCategory && matchSearch;
  });

  if (sortBy === 'price-low') {
    filtered.sort(function(a, b) { return a.price - b.price; });
  } else if (sortBy === 'price-high') {
    filtered.sort(function(a, b) { return b.price - a.price; });
  } else {
    filtered.sort(function(a, b) { return a.name.localeCompare(b.name); });
  }

  const grid = document.getElementById('bikeGrid');
  if (!grid) return;

  allBikes.forEach(function(bike) {
    bike.element.style.display = 'none';
  });

  filtered.forEach(function(bike) {
    bike.element.style.display = 'block';
    grid.appendChild(bike.element);
  });

  const countEl = document.getElementById('bikeCount');
  if (countEl) {
    countEl.textContent = filtered.length + ' models found';
  }
}

function initBikeDetailViewers() {
  const el = document.getElementById('bikeViewers');
  if (!el) return;
  setInterval(function() {
    el.textContent = Math.floor(Math.random() * 30 + 3) + ' people viewing this bike';
  }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
  initBikeFilter();
  initBikeDetailViewers();
});
