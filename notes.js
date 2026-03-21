// Notes management (CRUD) using localStorage
window.NOTES = {
  current: [],
  filtered: [],
  storageKey: 'notes',

 async refresh() {
  try {
    const res = await fetch('/api/notes');
    this.current = await res.json();
    this.filtered = this.current;
    this.updateUI();
  } catch (err) {
    console.error('Failed to load notes from backend', err);
  }
},

  async create(title, category, content) {
  const res = await fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, category, content })
  });

  const note = await res.json();
  this.current.unshift(note);
  this.refresh();
  return note;
},

  async update(id, title, category, content) {
  await fetch(`/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, category, content })
  });

  this.refresh();
},

  async delete(id) {
  await fetch(`/api/notes/${id}`, {
    method: 'DELETE'
  });

  this.refresh();
},

  search(q, cat) {
    this.filtered = this.current.filter(n => {
      const titleMatch = !q || n.title.toLowerCase().includes(q.toLowerCase());
      const catMatch = !cat || n.category === cat;
      return titleMatch && catMatch;
    });
    this.updateUI();
  },

  updateUI() {
  let container;

  // 🔥 FIX: decide container based on current view
  if (window.APP && window.APP.currentView() === 'notes') {
    container = document.getElementById('notesGrid');
  } else {
    container = document.getElementById('recentNotes');
  }

  if (!container) return;

  container.innerHTML = '';

  if (this.filtered.length === 0) {
    container.innerHTML = '<p>No notes found.</p>';
    return;
  }

  this.filtered.forEach(note => {
    const card = document.createElement('div');
    card.className = 'card note-card';
    card.innerHTML = `
      <h4>${note.title}</h4>
      <p class="cat">${note.category}</p>
      <p class="preview">${note.content ? note.content.substring(0, 100) + '...' : 'No content'}</p>
      <div class="actions">
        <button class="btn btn-sm" onclick="window.EDITOR.open('${note._id}')">Edit</button>
        <button class="btn btn-sm outline" onclick="window.NOTES.delete('${note._id}')">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });

  const totalNotes = document.getElementById('totalNotes');
  const recentCount = document.getElementById('recentNotesCount');
  if (totalNotes) totalNotes.innerText = this.current.length;
  if (recentCount) recentCount.innerText = Math.min(this.current.length, 5);
  }
};

// initialization listeners

document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  searchBtn.addEventListener('click', () => {
    NOTES.search(searchInput.value, categoryFilter.value);
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') NOTES.search(searchInput.value, categoryFilter.value);
  });

  categoryFilter.addEventListener('change', () => {
    NOTES.search(searchInput.value, categoryFilter.value);
  });

  document.getElementById('newNoteBtn').addEventListener('click', () => {
    window.EDITOR.openNew();
  });

  NOTES.refresh();
});
