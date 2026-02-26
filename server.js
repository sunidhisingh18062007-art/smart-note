const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const DATA_FILE = path.join(__dirname, 'notes.json');

// load or initialize notes data
function loadNotes() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    } else {
      throw err;
    }
  }
}

function saveNotes(notes) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// endpoints
app.get('/api/notes', (req, res) => {
  const notes = loadNotes();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const notes = loadNotes();
  const note = { id: uuidv4(), ...req.body, created: new Date().toISOString() };
  notes.push(note);
  saveNotes(notes);
  res.status(201).json(note);
});

app.put('/api/notes/:id', (req, res) => {
  const notes = loadNotes();
  const idx = notes.findIndex(n => n.id === req.params.id);
  if (idx === -1) return res.status(404).end();
  notes[idx] = { ...notes[idx], ...req.body };
  saveNotes(notes);
  res.json(notes[idx]);
});

app.delete('/api/notes/:id', (req, res) => {
  let notes = loadNotes();
  notes = notes.filter(n => n.id !== req.params.id);
  saveNotes(notes);
  res.status(204).end();
});

// start
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});


