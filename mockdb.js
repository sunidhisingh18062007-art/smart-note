// Mock In-Memory Database for Testing
// Replaces MongoDB when not available

const users = new Map();
const notes = new Map();
let userIdCounter = 1;
let noteIdCounter = 1;

const mockDB = {
  // User operations
  users: {
    findOne: async (query) => {
      for (let user of users.values()) {
        if (query.email && user.email === query.email) return user;
      }
      return null;
    },
    findById: async (id) => {
      return users.get(id);
    },
    create: async (data) => {
      const id = String(userIdCounter++);
      const user = { _id: id, ...data, createdAt: new Date() };
      users.set(id, user);
      return user;
    },
    save: async (user) => {
      users.set(user._id, user);
      return user;
    }
  },

  // Note operations
  notes: {
    find: async (query) => {
      const results = [];
      for (let note of notes.values()) {
        if (query.owner && note.owner !== query.owner) continue;
        results.push(note);
      }
      return results;
    },
    findById: async (id) => {
      return notes.get(id);
    },
    findOne: async (query) => {
      for (let note of notes.values()) {
        if (query._id && note._id === query._id) return note;
      }
      return null;
    },
    create: async (data) => {
      const id = String(noteIdCounter++);
      const note = { _id: id, ...data, createdAt: new Date(), updatedAt: new Date() };
      notes.set(id, note);
      return note;
    },
    updateOne: async (query, update) => {
      for (let note of notes.values()) {
        if (query._id && note._id === query._id) {
          Object.assign(note, update.$set);
          note.updatedAt = new Date();
          return { acknowledged: true };
        }
      }
      return { acknowledged: false };
    },
    deleteOne: async (query) => {
      for (let [id, note] of notes.entries()) {
        if (query._id && note._id === query._id) {
          notes.delete(id);
          return { acknowledged: true };
        }
      }
      return { acknowledged: false };
    }
  }
};

module.exports = mockDB;
