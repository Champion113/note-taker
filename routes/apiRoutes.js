const router = require('express').Router()
const { Router } = require('express');
const fs = require('fs');
const note = require('../db/note')

router.get('/notes', (req, res) => {
    note.getAllNotes().then(notesArray => res.json(notesArray))
  });
  
router.post('/notes', (req, res) => {
    note.addNote(req.body).then(notesArray => res.json(notesArray))
});

router.delete('/notes/:id', (req, res) => {
    note.delete(req.params.id).then(() => res.json({ ok: true }))
})

module.exports = router;