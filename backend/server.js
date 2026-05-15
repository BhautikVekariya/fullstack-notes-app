const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "Amit", email: "amit@test.com" },
  { id: 2, name: "Riya", email: "riya@test.com" }
];

let notes = [
  {
    id: 1,
    title: "Updated Note",
    content: "Learning React",
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: "Note 2",
    content: "Content 2",
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];


// GET ALL USERS
app.get("/users", (req, res) => {
  res.send(users);
});


// GET USER BY ID
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  res.send(user);
});


// GET NOTES COUNT
app.get("/notes/count", (req, res) => {
  const total = notes.length;

  res.send({ total });
});


// GET ALL NOTES
app.get("/notes", (req, res) => {

  if (notes.length === 0) {
    return res.send({ message: "No notes found" });
  }

  res.send(notes);
});


// GET SINGLE NOTE
app.get("/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  const note = notes.find(n => n.id === id);

  if (!note) {
    return res.status(404).send({
      message: "Note not found"
    });
  }

  res.send(note);
});


// CREATE NOTE
app.post("/notes", (req, res) => {

  const { title, content, userId } = req.body;

  if (!title || !content) {
    return res.status(400).send({
      message: "Title and content required"
    });
  }

  const newNote = {
    id: Date.now(),
    title,
    content,
    userId,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  notes.push(newNote);

  res.status(201).send(newNote);
});


// UPDATE NOTE
app.put("/notes/:id", (req, res) => {

  const id = Number(req.params.id);

  const note = notes.find(n => n.id === id);

  if (!note) {
    return res.status(404).send({
      message: "Note not found"
    });
  }

  const { title, content } = req.body;

  note.title = title || note.title;
  note.content = content || note.content;
  note.updatedAt = new Date();

  res.send(note);
});


// DELETE NOTE
app.delete("/notes/:id", (req, res) => {

  const id = Number(req.params.id);

  const noteIndex = notes.findIndex(n => n.id === id);

  if (noteIndex === -1) {
    return res.status(404).send({
      message: "Note not found"
    });
  }

  notes.splice(noteIndex, 1);

  res.send({
    message: "Note deleted successfully"
  });
});


// USER NOTES
app.get("/user-notes/:userId", (req, res) => {

  const userId = Number(req.params.userId);

  const userNotes = notes.filter(
    n => n.userId === userId
  );

  res.send(userNotes);
});


// SEARCH NOTES
app.get("/search", (req, res) => {

  const query = req.query.q?.toLowerCase();

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(query) ||
    note.content.toLowerCase().includes(query)
  );

  res.send(filteredNotes);
});


// LOGIN
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  if (
    email === "admin@test.com" &&
    password === "123456"
  ) {
    return res.send({
      message: "Login successful"
    });
  }

  res.status(401).send({
    message: "Invalid credentials"
  });
});


// PROFILE
app.get("/profile/:id", (req, res) => {

  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).send({
      message: "User not found"
    });
  }

  res.send(user);
});


// SUM API
app.post("/sum", (req, res) => {

  let { a, b } = req.body;

  a = Number(a);
  b = Number(b);

  const total = a + b;

  res.send({ total });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});