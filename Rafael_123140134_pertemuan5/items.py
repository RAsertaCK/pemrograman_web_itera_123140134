from library_item import LibraryItem

class Book(LibraryItem):
    def __init__(self, item_id: str, title: str, author: str, 
                 publication_year: int, isbn: str, pages: int):
        super().__init__(item_id, title, publication_year)
        self._author = author
        self._isbn = isbn
        self._pages = pages
    
    @property
    def author(self) -> str:
        return self._author
    
    @property
    def isbn(self) -> str:
        return self._isbn
    
    @property
    def pages(self) -> int:
        return self._pages

    def display_info(self) -> str:
        status = "Tersedia" if self._is_available else "Dipinjam"
        return (f"BUKU\n"
                f"Judul: {self._title}\n"
                f"Penulis: {self._author}\n"
                f"Tahun: {self._publication_year} (Usia: {self.age} tahun)\n"
                f"ISBN: {self._isbn}\n"
                f"Halaman: {self._pages}\n"
                f"Status: {status}\n"
                f"ID: {self._item_id}")
    
    def get_category(self) -> str:
        return "Buku"
    
    def get_reading_time(self) -> str:
        if self._pages < 100:
            return "Bacaan singkat"
        elif self._pages < 300:
            return "Bacaan sedang"
        else:
            return "Bacaan panjang"


class Magazine(LibraryItem):  
    def __init__(self, item_id: str, title: str, publisher: str,
                 publication_year: int, issue: int, volume: int):
        super().__init__(item_id, title, publication_year)
        self._publisher = publisher
        self._issue = issue
        self._volume = volume
    
    @property
    def publisher(self) -> str:
        return self._publisher
    
    @property
    def issue(self) -> int:
        return self._issue
    
    @property
    def volume(self) -> int:
        return self._volume

    def display_info(self) -> str:
        status = "Tersedia" if self._is_available else "Dipinjam"
        return (f"MAJALAH\n"
                f"Judul: {self._title}\n"
                f"Penerbit: {self._publisher}\n"
                f"Tahun: {self._publication_year} (Usia: {self.age} tahun)\n"
                f"Volume: {self._volume}, Edisi: {self._issue}\n"
                f"Status: {status}\n"
                f"ID: {self._item_id}")
    
    def get_category(self) -> str:
        return "Majalah"
    
    def get_issue_info(self) -> str:
        return f"Vol. {self._volume} No. {self._issue}"