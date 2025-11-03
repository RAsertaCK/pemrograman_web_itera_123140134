import { render, screen, fireEvent } from '@testing-library/react';
import { BookProvider } from '../context/BookContext';
import BookForm from './BookForm';

const mockOnClose = jest.fn();

const renderWithProvider = (component) => {
  return render(
    <BookProvider>
      {component}
    </BookProvider>
  );
};

describe('BookForm', () => {

  test('renders add book form correctly', () => {
    renderWithProvider(<BookForm onClose={mockOnClose} />);
    
    expect(screen.getByText('Tambah Buku Baru')).toBeInTheDocument();
    expect(screen.getByLabelText(/Judul/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Simpan/i })).toBeInTheDocument();
  });
  
  test('renders edit book form correctly with pre-filled values', () => {
    const mockBook = { id: 1, title: 'Test Book', author: 'Test Author', status: 'reading' };
    renderWithProvider(<BookForm onClose={mockOnClose} editingBook={mockBook} />);
    
    expect(screen.getByText('Edit Buku')).toBeInTheDocument();
    expect(screen.getByLabelText(/Judul/i)).toHaveValue(mockBook.title);
    expect(screen.getByLabelText(/Penulis/i)).toHaveValue(mockBook.author);
    expect(screen.getByLabelText(/Status/i)).toHaveValue(mockBook.status);
  });

  test('calls onClose when cancel button is clicked', () => {
    mockOnClose.mockClear(); 
    
    renderWithProvider(<BookForm onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByRole('button', { name: /Batal/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  test('shows alert if title is empty on submit', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    renderWithProvider(<BookForm onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByRole('button', { name: /Simpan/i }));
    
    expect(alertMock).toHaveBeenCalledWith('Judul dan penulis harus diisi!');
    expect(mockOnClose).not.toHaveBeenCalled();
    
    alertMock.mockRestore();
  });

  test('form labels and buttons are present', () => {
    renderWithProvider(<BookForm onClose={mockOnClose} />);
    expect(screen.getByLabelText(/Judul/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Penulis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Simpan/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Batal/i })).toBeInTheDocument();
  });
});