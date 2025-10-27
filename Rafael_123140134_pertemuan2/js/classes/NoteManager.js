class NoteManager {
    constructor() {
        this.notes = this.loadNotes();
    }
    
    loadNotes = () => {
        const stored = localStorage.getItem('quickNotes');
        return stored ? JSON.parse(stored) : [];
    }
    
    saveNotes = () => {
        localStorage.setItem('quickNotes', JSON.stringify(this.notes));
    }
    
    addNote = (note) => {
        const newNote = {
            id: Date.now().toString(),
            content: note.content,
            title: note.title || 'Catatan Tanpa Judul',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.notes.push(newNote);
        this.saveNotes();
        return newNote;
    }
    
    updateNote = (id, updatedContent) => {
        const index = this.notes.findIndex(n => n.id === id);
        if (index !== -1) {
            this.notes[index] = {
                ...this.notes[index],
                content: updatedContent,
                updatedAt: new Date().toISOString()
            };
            this.saveNotes();
            return true;
        }
        return false;
    }
    
    deleteNote = (id) => {
        const index = this.notes.findIndex(n => n.id === id);
        if (index !== -1) {
            this.notes.splice(index, 1);
            this.saveNotes();
            return true;
        }
        return false;
    }
    
    getAllNotes = () => {
        return [...this.notes].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    
    getNoteById = (id) => {
        return this.notes.find(n => n.id === id);
    }
    
    getNotesCount = () => {
        return this.notes.length;
    }
}