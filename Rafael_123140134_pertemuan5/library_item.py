from abc import ABC, abstractmethod
from datetime import datetime

class LibraryItem(ABC):
    def __init__(self, item_id: str, title: str, publication_year: int):
        self._item_id = item_id
        self._title = title
        self._publication_year = publication_year
        self._is_available = True
        self._date_added = datetime.now()
    
    @property
    def item_id(self) -> str:
        return self._item_id
    
    @property
    def title(self) -> str:
        return self._title
    
    @property
    def publication_year(self) -> int:
        return self._publication_year
    
    @property
    def is_available(self) -> bool:
        return self._is_available
    
    @is_available.setter
    def is_available(self, value: bool):
        if isinstance(value, bool):
            self._is_available = value
        else:
            raise ValueError("Status ketersediaan harus boolean")
    
    @property
    def age(self) -> int:
        current_year = datetime.now().year
        return current_year - self._publication_year
    
    @abstractmethod
    def display_info(self) -> str:
        pass
    
    @abstractmethod
    def get_category(self) -> str:
        pass
    
    def borrow(self) -> bool:
        if self._is_available:
            self._is_available = False
            return True
        return False
    
    def return_item(self) -> bool:
        if not self._is_available:
            self._is_available = True
            return True
        return False
    
    def __str__(self) -> str:
        return f"{self.get_category()}: {self._title} (ID: {self._item_id})"