import React, { useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import BookFilter from '../components/BookFilter';

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const [bookToEdit, setBookToEdit] = useState(null); 

  const { filteredBooks } = useBooks();

  const handleEdit = (book) => {
    setBookToEdit(book);
    setShowForm(true);
  };
 
  const handleShowAddForm = () => {
    setBookToEdit(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setBookToEdit(null);
  };

  return (
    <div>
      <header>
        <h1>📚 My Book Collection</h1>
        <button onClick={handleShowAddForm} className="btn-primary">
          + Tambah Buku
        </button>
      </header>

      <BookFilter />
      
      <div className="books-count">
        Ditemukan {filteredBooks.length} buku
      </div>

      <BookList books={filteredBooks} onEdit={handleEdit} />

      {showForm && (
        <BookForm 
          onClose={handleCloseForm} 
          editingBook={bookToEdit} 
        />
      )}
    </div>
  );
};

export default Home;