import React, { useState, useEffect } from 'react';
import { useBookContext } from '../context/BookContext';

const BookForm = ({ onClose, editingBook }) => {
  const { addBook, editBook } = useBookContext();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'owned'
  });

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        status: editingBook.status
      });
    } else {
      setFormData({ title: '', author: '', status: 'owned' });
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.author.trim()) {
      alert('Judul dan penulis harus diisi!');
      return;
    }

    if (editingBook) {
      editBook(editingBook.id, formData);
    } else {
      addBook(formData);
    }

    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{editingBook ? 'Edit Buku' : 'Tambah Buku Baru'}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title-input">Judul:</label>
            <input
              id="title-input" 
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Masukkan judul buku"
              required
            />
          </div>
          <div>
            <label htmlFor="author-input">Penulis:</label>
            <input
              id="author-input"
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              placeholder="Masukkan nama penulis"
              required
            />
          </div>
          <div>
            <label htmlFor="status-select">Status:</label>
            <select
              id="status-select"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="owned">Dimiliki</option>
              <option value="reading">Sedang Dibaca</option>
              <option value="wishlist">Ingin Dibeli</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Simpan</button>
            <button type="button" onClick={onClose} className="btn-secondary">Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;