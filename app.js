// Smart Study Notes Manager - Main App Controller
const API = '/api';

// App state
let currentView = 'dashboard';

// Initialize app on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Setup navigation
  setupSidebar();

  // Setup dark mode toggle
  setupThemeToggle();

  // Setup buttons
  setupButtons();

  // Load initial data
  showView('dashboard');
  window.NOTES?.refresh();
}

// ==================== Sidebar Navigation ====================
function setupSidebar() {
  const sideNav = document.querySelectorAll('.side-nav a');
  sideNav.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.dataset.route;
      activeRoute(route);
      showView(route);
    });
  });
}

function activeRoute(route) {
  const links = document.querySelectorAll('.side-nav a');
  links.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.route === route) {
      link.classList.add('active');
    }
  });
}

// ==================== View Management ====================
function showView(viewName) {
  // Hide all views
  document.querySelectorAll('.view').forEach(view => {
    view.style.display = 'none';
  });
  
  // Show selected view
  const viewElement = {
    'dashboard': document.getElementById('dashboardView'),
    'notes': document.getElementById('notesView'),
    'new': document.getElementById('editorView')
  }[viewName];
  
  if (viewElement) {
    viewElement.style.display = 'block';
  }
  
  currentView = viewName;
  
  // Handle view-specific logic
  if (viewName === 'dashboard') {
    window.NOTES?.refresh();
  } else if (viewName === 'notes') {
    window.NOTES?.refresh();
  } else if (viewName === 'new') {
    window.EDITOR?.openNew();
  }
}

// ==================== Button Setup ====================
function setupButtons() {
  // New Note button
  const newNoteBtn = document.getElementById('newNoteBtn');
  if (newNoteBtn) {
    newNoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showView('new');
      activeRoute('new');
      window.EDITOR?.openNew();
    });
  }
  
  // Search functionality
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value;
      const category = categoryFilter?.value || '';
      window.NOTES?.search(query, category);
    });
    
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });
  }
}

// ==================== Auth UI ====================
function updateAuthUI() {
  // Authentication UI removed; nothing to update.
}

// ==================== Dark Mode Toggle ====================
function setupThemeToggle() {
  const themeBtn = document.getElementById('themeBtn');
  
  if (themeBtn) {
    // Load saved theme on startup
    const savedTheme = localStorage.getItem('theme') || 'light';
    console.log('Loading theme:', savedTheme);
    
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      themeBtn.textContent = '☀️ Toggle';
    } else {
      document.body.classList.remove('dark');
      themeBtn.textContent = '🌙 Toggle';
    }
    
    // Setup click handler with proper event handling
    themeBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleTheme();
    };
    
    console.log('Theme button ready');
  } else {
    console.warn('Theme button not found in DOM');
  }
}

function toggleTheme() {
  const themeBtn = document.getElementById('themeBtn');
  const isDark = document.body.classList.toggle('dark');
  console.log('Theme toggled to:', isDark ? 'dark' : 'light');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  if (themeBtn) {
    themeBtn.textContent = isDark ? '☀️ Toggle' : '🌙 Toggle';
  }
}

// ==================== Export for other modules ====================
window.APP = {
  showView,
  activeRoute,
  updateAuthUI,
  toggleTheme,
  currentView: () => currentView
};

