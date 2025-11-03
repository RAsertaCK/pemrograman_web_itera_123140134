import React from 'react';
import { useBookContext } from '../context/BookContext';

const BookFilter = () => {
  const { filter, searchQuery, setFilter, setSearchQuery } = useBookContext();

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Cari buku berdasarkan judul atau penulis..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">Semua Buku</option>
        <option value="owned">Dimiliki</option>
        <option value="reading">Sedang Dibaca</option>
        <option value="wishlist">Ingin Dibeli</option>
      </select>
    </div>
  );
};

export default BookFilter;