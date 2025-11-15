from library import Library
from items import Book, Magazine

def create_sample_data(library: Library) -> None:
    books = [
        Book("B001", "Python Programming", "John Doe", 2023, "978-1234567890", 350),
        Book("B002", "Data Science Fundamentals", "Jane Smith", 2022, "978-0987654321", 280),
        Book("B003", "Machine Learning", "Alice Johnson", 2021, "978-1122334455", 500)
    ]
    
    magazines = [
        Magazine("M001", "Tech Magazine", "Tech Publisher", 2024, 15, 5),
        Magazine("M002", "Science Weekly", "Science Press", 2024, 8, 3),
        Magazine("M003", "Programming Monthly", "Code Publications", 2023, 12, 2)
    ]
    
    for book in books:
        library.add_item(book)
    
    for magazine in magazines:
        library.add_item(magazine)

def main():
    library = Library("Perpustakaan Teknik Informatika")

    create_sample_data(library)
    
    print("SISTEM MANAJEMEN PERPUSTAKAAN")
    print(f"Selamat datang di {library.name}!")
    
    while True:
        print("\n" + "="*50)
        print("MENU UTAMA")
        print("="*50)
        print("1. Tampilkan semua item")
        print("2. Tampilkan item tersedia")
        print("3. Cari item berdasarkan judul")
        print("4. Cari item berdasarkan ID")
        print("5. Pinjam item")
        print("6. Kembalikan item")
        print("7. Tambah item baru")
        print("8. Hapus item")
        print("9. Lihat statistik")
        print("10. Lihat detail item")
        print("0. Keluar")
        print("="*50)
        
        choice = input("Pilih menu (0-10): ").strip()
        
        if choice == "1":
            library.display_all_items()
        
        elif choice == "2":
            library.display_available_items()
        
        elif choice == "3":
            title = input("Masukkan judul yang dicari: ").strip()
            if title:
                results = library.find_by_title(title)
                if results:
                    print(f"\nDitemukan {len(results)} item:")
                    for item in results:
                        print(f"  - {item}")
                else:
                    print("Tidak ditemukan item dengan judul tersebut")
            else:
                print("Judul tidak boleh kosong")
        
        elif choice == "4":
            item_id = input("Masukkan ID item: ").strip().upper()
            item = library.find_by_id(item_id)
            if item:
                print(f"Item ditemukan: {item}")
            else:
                print("Item tidak ditemukan")
        
        elif choice == "5":
            item_id = input("Masukkan ID item yang ingin dipinjam: ").strip().upper()
            library.borrow_item(item_id)
        
        elif choice == "6":
            item_id = input("Masukkan ID item yang ingin dikembalikan: ").strip().upper()
            library.return_item(item_id)
        
        elif choice == "7":
            add_new_item(library)
        
        elif choice == "8":
            item_id = input("Masukkan ID item yang ingin dihapus: ").strip().upper()
            library.remove_item(item_id)
        
        elif choice == "9":
            library.display_statistics()
        
        elif choice == "10":
            item_id = input("Masukkan ID item untuk melihat detail: ").strip().upper()
            library.display_item_details(item_id)
        
        elif choice == "0":
            print("\nTerima kasih telah menggunakan sistem perpustakaan!")
            print("Statistik akhir:")
            library.display_statistics()
            break
        
        else:
            print("Pilihan tidak valid! Silakan pilih 0-10")
        
        input("\n⏎ Tekan Enter untuk melanjutkan...")

def add_new_item(library: Library) -> None:
    print("\nTAMBAH ITEM BARU")
    print("1. Buku")
    print("2. Majalah")
    
    item_type = input("Pilih tipe item (1-2): ").strip()
    
    if item_type not in ["1", "2"]:
        print("Tipe item tidak valid")
        return

    item_id = input("ID Item: ").strip().upper()
    title = input("Judul: ").strip()
    
    try:
        year = int(input("Tahun terbit: ").strip())
    except ValueError:
        print("Tahun harus angka")
        return
    
    if item_type == "1":
        author = input("Penulis: ").strip()
        isbn = input("ISBN: ").strip()
        try:
            pages = int(input("Jumlah halaman: ").strip())
        except ValueError:
            print("Jumlah halaman harus angka")
            return
        
        new_item = Book(item_id, title, author, year, isbn, pages)
    
    else:
        publisher = input("Penerbit: ").strip()
        try:
            issue = int(input("Edisi: ").strip())
            volume = int(input("Volume: ").strip())
        except ValueError:
            print("Edisi dan volume harus angka")
            return
        
        new_item = Magazine(item_id, title, publisher, year, issue, volume)

    library.add_item(new_item)

if __name__ == "__main__":
    main()