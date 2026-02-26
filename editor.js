// Quill editor integration
let quill;

window.EDITOR = {
  currentId: null,

  init() {
    quill = new Quill('#quillEditor', {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'color': [] }, { 'background': [] }],
          ['link']
        ]
      },
      placeholder: 'Start writing...'
    });
  },

  openNew() {
    this.currentId = null;
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteCategory').value = 'DSA';
    if (quill) quill.setContents([]);
    this.showView('editorView');
  },

  open(id) {
    const note = window.NOTES.current.find(n => n._id === id);
    if (!note) {
      alert('Note not found');
      return;
    }
    this.currentId = note._id;
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteCategory').value = note.category;
    if (quill) quill.root.innerHTML = note.content || '';
    this.showView('editorView');
  },

  showView(name) {
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
    document.getElementById(name).style.display = '';
  },

  async save() {
    const title = document.getElementById('noteTitle').value.trim();
    const category = document.getElementById('noteCategory').value;
    const content = quill ? quill.root.innerHTML : '';

    if (!title) {
      alert('Title required');
      return;
    }

    try {
      if (this.currentId) {
        window.NOTES.update(this.currentId, title, category, content);
      } else {
        window.NOTES.create(title, category, content);
      }
      this.showView('dashboardView');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  EDITOR.init();

  document.getElementById('saveNoteBtn').addEventListener('click', () => {
    EDITOR.save();
  });

  document.getElementById('cancelEditBtn').addEventListener('click', () => {
    EDITOR.showView('dashboardView');
  });

  // Route handler for sidebar
  document.querySelectorAll('.side-nav a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const route = a.dataset.route;
      document.querySelectorAll('.side-nav a').forEach(x => x.classList.remove('active'));
      a.classList.add('active');

      if (route === 'new') {
        EDITOR.openNew();
      } else if (route === 'dashboard') {
        EDITOR.showView('dashboardView');
      } else if (route === 'notes') {
        EDITOR.showView('notesView');
      } else if (route === 'profile') {
        EDITOR.showView('dashboardView');
      }
    });
  });
});
