import { useBookContext } from '../context/BookContext';

export const useBooks = () => {
  const { books, filter, searchQuery } = useBookContext();

  const filteredBooks = books.filter(book => {
    const matchesFilter = filter === 'all' || book.status === filter;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: books.length,
    owned: books.filter(b => b.status === 'owned').length,
    reading: books.filter(b => b.status === 'reading').length,
    wishlist: books.filter(b => b.status === 'wishlist').length
  };

  return { filteredBooks, stats };
};