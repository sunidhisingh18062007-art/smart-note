// Notes management (CRUD) using localStorage
window.NOTES = {
  current: [],
  filtered: [],
  storageKey: 'notes',

  refresh() {
    try {
      const data = localStorage.getItem(this.storageKey);
      this.current = data ? JSON.parse(data) : [];
      this.filtered = this.current;
      this.updateUI();
    } catch (err) {
      console.error('Failed to load notes from storage', err);
      this.current = [];
      this.filtered = [];
      this.updateUI();
    }
  },

  persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.current));
  },

  create(title, category, content) {
    const note = {
      _id: Date.now().toString(),
      title,
      category,
      content,
      createdAt: new Date().toISOString()
    };
    this.current.unshift(note);
    this.persist();
    this.refresh();
    return note;
  },

  update(id, title, category, content) {
    const idx = this.current.findIndex(n => n._id === id);
    if (idx === -1) throw new Error('Note not found');
    this.current[idx].title = title;
    this.current[idx].category = category;
    this.current[idx].content = content;
    this.persist();
    this.refresh();
  },

  delete(id) {
    const idx = this.current.findIndex(n => n._id === id);
    if (idx === -1) return;
    this.current.splice(idx, 1);
    this.persist();
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
    const container = document.getElementById('recentNotes') || document.getElementById('notesGrid');
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

    // Update dashboard stats
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
