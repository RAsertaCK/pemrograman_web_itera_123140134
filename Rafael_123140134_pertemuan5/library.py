from typing import Dict, List, Optional, Union
from library_item import LibraryItem

class Library:
    def __init__(self, name: str):
        self._name = name
        self.__items: Dict[str, LibraryItem] = {}
        self.__total_operations = 0 
    
    @property
    def name(self) -> str:
        return self._name
    
    @property
    def total_items(self) -> int:
        return len(self.__items)
    
    @property
    def available_items_count(self) -> int:
        return sum(1 for item in self.__items.values() if item.is_available)
    
    def add_item(self, item: LibraryItem) -> bool:
        if not isinstance(item, LibraryItem):
            print("Error: Item harus turunan dari LibraryItem")
            return False
        
        if item.item_id in self.__items:
            print(f"Error: Item dengan ID {item.item_id} sudah ada")
            return False
        
        self.__items[item.item_id] = item
        self.__total_operations += 1
        print(f"Berhasil menambahkan: {item}")
        return True
    
    def remove_item(self, item_id: str) -> bool:
        if item_id in self.__items:
            item = self.__items.pop(item_id)
            self.__total_operations += 1
            print(f"Berhasil menghapus: {item}")
            return True
        else:
            print(f"Item dengan ID {item_id} tidak ditemukan")
            return False
    
    def find_by_id(self, item_id: str) -> Optional[LibraryItem]:
        return self.__items.get(item_id)
    
    def find_by_title(self, title: str) -> List[LibraryItem]:
        title_lower = title.lower()
        return [item for item in self.__items.values() 
                if title_lower in item.title.lower()]
    
    def borrow_item(self, item_id: str) -> bool:
        item = self.find_by_id(item_id)
        if item:
            if item.borrow():
                self.__total_operations += 1
                print(f"Berhasil meminjam: {item.title}")
                return True
            else:
                print(f"{item.title} sedang tidak tersedia")
                return False
        else:
            print(f"Item dengan ID {item_id} tidak ditemukan")
            return False
    
    def return_item(self, item_id: str) -> bool:
        item = self.find_by_id(item_id)
        if item:
            if item.return_item():
                self.__total_operations += 1
                print(f"Berhasil mengembalikan: {item.title}")
                return True
            else:
                print(f"{item.title} sudah tersedia")
                return False
        else:
            print(f"Item dengan ID {item_id} tidak ditemukan")
            return False
    
    def display_all_items(self) -> None:
        if not self.__items:
            print("Perpustakaan kosong")
            return
        
        print(f"\n{'='*60}")
        print(f"DAFTAR SEMUA ITEM - {self._name}")
        print(f"{'='*60}")
        
        for i, item in enumerate(self.__items.values(), 1):
            print(f"{i}. {item}")
        print(f"\nTotal: {self.total_items} item")
    
    def display_available_items(self) -> None:
        available_items = [item for item in self.__items.values() 
                          if item.is_available]
        
        if not available_items:
            print("Tidak ada item yang tersedia saat ini")
            return
        
        print(f"\n{'='*60}")
        print(f"ITEM YANG TERSEDIA - {self._name}")
        print(f"{'='*60}")
        
        for i, item in enumerate(available_items, 1):
            print(f"{i}. {item}")
        print(f"\nTersedia: {len(available_items)} dari {self.total_items} item")
    
    def display_item_details(self, item_id: str) -> None:
        item = self.find_by_id(item_id)
        if item:
            print(f"\n{'='*60}")
            print(item.display_info())
            print(f"{'='*60}")
        else:
            print(f"Item dengan ID {item_id} tidak ditemukan")
    
    def get_statistics(self) -> Dict[str, Union[int, str]]:
        books = sum(1 for item in self.__items.values() 
                   if item.get_category() == "Buku")
        magazines = sum(1 for item in self.__items.values() 
                       if item.get_category() == "Majalah")
        
        return {
            "total_items": self.total_items,
            "available_items": self.available_items_count,
            "borrowed_items": self.total_items - self.available_items_count,
            "books": books,
            "magazines": magazines,
            "total_operations": self.__total_operations,
            "library_name": self._name
        }
    
    def display_statistics(self) -> None:
        stats = self.get_statistics()
        
        print(f"\n{'='*60}")
        print(f"STATISTIK PERPUSTAKAAN - {self._name}")
        print(f"{'='*60}")
        print(f"Total Item: {stats['total_items']}")
        print(f"Tersedia: {stats['available_items']}")
        print(f"Dipinjam: {stats['borrowed_items']}")
        print(f"Buku: {stats['books']}")
        print(f"Majalah: {stats['magazines']}")
        print(f"Total Operasi: {stats['total_operations']}")
        print(f"{'='*60}")