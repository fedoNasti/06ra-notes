import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";


const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

const notes = [];

app.get("/notes", (req, res) => {
  res.send(JSON.stringify(notes));
});

app.post("/notes", (req, res) => {
  const { content } = req.body;

  if (!content || typeof content !== 'string') {
    res.status(400).send(JSON.stringify({ error: "Content is required" }));
    return;
  }

  const newNote = {
    id: uuidv4(),
    content: content,
  }

  notes.push(newNote);
  res.status(201).json(newNote);
});

app.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const index = notes.findIndex((o) => o.id === noteId);
  if (index !== -1) {
    notes.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Note not found" });
  }
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));