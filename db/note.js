const db = require('./db.json')
const fs = require('fs');
const util = require("util");
const { v4: uuidv4 } = require("uuid")
const newReadFile = util.promisify(fs.readFile)
const newWriteFile = util.promisify(fs.writeFile)

class Notes {

    read() {
        return newReadFile("db/db.json", "utf-8")
    }
    write(note) {
        return newWriteFile("db/db.json", JSON.stringify(note))
    }

    getAllNotes() {
        return this.read().then(function (notes) {
            var notesArray = [];
            try {
                notesArray = notesArray.concat(JSON.parse(notes))
            } catch (error) {
                notesArray = [];
            }

            return notesArray;
        })
    }

    addNote(note) {

        const { title, text } = note;
        const newNote = {
            title,
            text,
            id: uuidv4()
        }

        return this.getAllNotes().then((notesArray) => [...notesArray, newNote]).then(newNote => this.write(newNote))

    }
    delete(id) {
        return this.getAllNotes().then(notesArray => notesArray.filter(note => note.id !== id)).then(filteredArray => this.write(filteredArray))
    }
}

module.exports = new Notes();