import React from 'react';
import { useBookContext } from '../context/BookContext';

const BookList = ({ books, onEdit }) => {
  const { deleteBook } = useBookContext();

  const handleDelete = (id, title) => {
    if (window.confirm(`Hapus buku "${title}"?`)) {
      deleteBook(id);
    }
  };

  if (books.length === 0) {
    return <p>Tidak ada buku yang cocok dengan filter atau pencarian Anda.</p>;
  }

  return (
    <div className="book-list">
      {books.map(book => (
        <div key={book.id} className="book-item">
          <div className="book-info">
            <h4>{book.title}</h4>
            <p>Oleh: {book.author}</p>
            <span className={`status ${book.status}`}>
              {book.status === 'owned' && '📚 Dimiliki'}
              {book.status === 'reading' && '📖 Sedang Dibaca'}
              {book.status === 'wishlist' && '🛒 Ingin Dibeli'}
            </span>
          </div>
          <div className="book-actions">
            <button onClick={() => onEdit(book)} className="btn-secondary">
              Edit
            </button>
            <button onClick={() => handleDelete(book.id, book.title)} className="btn-danger">
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;