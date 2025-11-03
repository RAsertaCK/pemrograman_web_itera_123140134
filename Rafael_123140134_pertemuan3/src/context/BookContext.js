import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []); 
  
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const addBook = (newBook) => {
    const book = {
      id: Date.now(),
      title: newBook.title,
      author: newBook.author,
      status: newBook.status
    };
    setBooks(prev => [...prev, book]);
  };

  const editBook = (id, updatedBook) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, ...updatedBook } : book
    ));
  };

  const deleteBook = (id) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  return (
    <BookContext.Provider value={{
      books,
      filter,
      searchQuery,
      addBook,
      editBook,
      deleteBook,
      setFilter,
      setSearchQuery
    }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within BookProvider');
  }
  return context;
};