import os
import json
from datetime import datetime

class Main:
    def __init__(self):
        self.data_mahasiswa = [
            {"nama": "PewDiePie", "nim": "122140023", "nilai_uts": 91, "nilai_uas": 90, "nilai_tugas": 89},
            {"nama": "Markeplier", "nim": "123140112", "nilai_uts": 80, "nilai_uas": 80, "nilai_tugas": 75},
            {"nama": "Windah Basudara", "nim": "122140010", "nilai_uts": 60, "nilai_uas": 72, "nilai_tugas": 76},
            {"nama": "Reza Auditore", "nim": "123140123", "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 58},
            {"nama": "Ericko Lim", "nim": "123140001", "nilai_uts": 45, "nilai_uas": 50, "nilai_tugas": 48}
        ]
    
    def nilai_akhir(self, uts, uas, tugas):
        return (0.3 * uts) + (0.4 * uas) + (0.3 * tugas)
    
    def grade(self, nilai_akhir):
        if nilai_akhir >= 80:
            return "A"
        elif nilai_akhir >= 70:
            return "B"
        elif nilai_akhir >= 60:
            return "C"
        elif nilai_akhir >= 50:
            return "D"
        else:
            return "E"
    
    def status(self, nilai_akhir):
        return "LULUS" if nilai_akhir >= 60 else "TIDAK LULUS"
    
    def clear_screen(self):
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def validasi_nilai(self, nilai_str):
        try:
            nilai = float(nilai_str)
            if 0 <= nilai <= 100:
                return True, nilai
            else:
                return False, "Nilai harus antara 0-100"
        except ValueError:
            return False, "Nilai harus berupa angka"
    
    def validasi_nim(self, nim):
        for mahasiswa in self.data_mahasiswa:
            if mahasiswa["nim"] == nim:
                return False, "NIM sudah terdaftar"
        return True, "NIM valid"
    
    def show(self, mahasiswa_list=None, title="DATA MAHASISWA"):
        if mahasiswa_list is None:
            mahasiswa_list = self.data_mahasiswa
        
        if not mahasiswa_list:
            print("\nTidak ada data mahasiswa untuk ditampilkan.")
            return
        
        print(f"\n{'='*120}")
        print(f"{title:^120}")
        print(f"{'='*120}")
        print(f"{'No':<4} {'Nama':<20} {'NIM':<12} {'UTS':<6} {'UAS':<6} {'Tugas':<8} {'Nilai Akhir':<12} {'Grade':<8} {'Status':<12}")
        print(f"{'-'*120}")
        
        for i, mahasiswa in enumerate(mahasiswa_list, 1):
            nilai_akhir = self.nilai_akhir(
                mahasiswa["nilai_uts"],
                mahasiswa["nilai_uas"],
                mahasiswa["nilai_tugas"]
            )
            grade = self.grade(nilai_akhir)
            status = self.status(nilai_akhir)
            
            print(f"{i:<4} {mahasiswa['nama']:<20} {mahasiswa['nim']:<12} "
                  f"{mahasiswa['nilai_uts']:<6} {mahasiswa['nilai_uas']:<6} "
                  f"{mahasiswa['nilai_tugas']:<8} {nilai_akhir:<12.2f} "
                  f"{grade:<8} {status:<12}")
        
        print(f"{'='*120}")
        print(f"Total data: {len(mahasiswa_list)} mahasiswa")
    
    def inputmhs(self):
        print("\nINPUT DATA MAHASISWA BARU")
        print("-" * 40)
        
        while True:
            nama = input("Masukkan nama mahasiswa: ").strip()
            if nama:
                break
            print("Nama tidak boleh kosong!")
        
        while True:
            nim = input("Masukkan NIM: ").strip()
            if not nim:
                print("NIM tidak boleh kosong!")
                continue
            
            valid, message = self.validasi_nim(nim)
            if valid:
                break
            print(f"{message}")
        
        nilai_fields = [
            ("UTS", "nilai_uts"),
            ("UAS", "nilai_uas"), 
            ("Tugas", "nilai_tugas")
        ]
        
        nilai_data = {}
        for field_name, field_key in nilai_fields:
            while True:
                nilai_input = input(f"Masukkan nilai {field_name}: ")
                valid, result = self.validasi_nilai(nilai_input)
                if valid:
                    nilai_data[field_key] = result
                    break
                else:
                    print(f"{result}")
        
        mahasiswa_baru = {
            "nama": nama,
            "nim": nim,
            **nilai_data
        }
        
        self.data_mahasiswa.append(mahasiswa_baru)
        print(f"\nData mahasiswa {nama} berhasil ditambahkan!")
    
    def editmhs(self):
        if not self.data_mahasiswa:
            print("Tidak ada data mahasiswa untuk diedit.")
            return
        
        self.show()
        
        try:
            nomor = int(input("\nMasukkan nomor mahasiswa yang akan diedit: ")) - 1
            if 0 <= nomor < len(self.data_mahasiswa):
                mahasiswa = self.data_mahasiswa[nomor]
                print(f"\nMengedit data: {mahasiswa['nama']} (NIM: {mahasiswa['nim']})")
                
                nama_baru = input(f"Nama baru [{mahasiswa['nama']}]: ").strip() or mahasiswa['nama']
                
                print("Kosongkan jika tidak ingin mengubah nilai")
                for field in ['nilai_uts', 'nilai_uas', 'nilai_tugas']:
                    while True:
                        nilai_input = input(f"{field.replace('_', ' ').title()} [{mahasiswa[field]}]: ").strip()
                        if not nilai_input:
                            break
                        valid, result = self.validasi_nilai(nilai_input)
                        if valid:
                            mahasiswa[field] = result
                            break
                        else:
                            print(f"{result}")
                
                mahasiswa['nama'] = nama_baru
                print("Data berhasil diupdate!")
            else:
                print("Nomor tidak valid!")
        except ValueError:
            print(" Input harus berupa angka!")
    
    def deletemhs(self):
        if not self.data_mahasiswa:
            print("Tidak ada data mahasiswa untuk dihapus.")
            return
        
        self.show()
        
        try:
            nomor = int(input("\nMasukkan nomor mahasiswa yang akan dihapus: ")) - 1
            if 0 <= nomor < len(self.data_mahasiswa):
                mahasiswa = self.data_mahasiswa[nomor]
                konfirmasi = input(f"Apakah Anda yakin ingin menghapus data {mahasiswa['nama']}? (y/n): ").lower()
                if konfirmasi == 'y':
                    deleted = self.data_mahasiswa.pop(nomor)
                    print(f"Data {deleted['nama']} berhasil dihapus!")
                else:
                    print("Penghapusan dibatalkan.")
            else:
                print("Nomor tidak valid!")
        except ValueError:
            print("Input harus berupa angka!")
    
    def searchmhs(self):
        if not self.data_mahasiswa:
            print("Tidak ada data mahasiswa untuk dicari.")
            return
        
        print("\nPENCARIAN MAHASISWA")
        print("1. Cari berdasarkan nama")
        print("2. Cari berdasarkan NIM")
        
        pilihan = input("Pilih metode pencarian (1-2): ")
        
        if pilihan == "1":
            keyword = input("Masukkan nama yang dicari: ").lower()
            hasil = [m for m in self.data_mahasiswa if keyword in m['nama'].lower()]
        elif pilihan == "2":
            keyword = input("Masukkan NIM yang dicari: ")
            hasil = [m for m in self.data_mahasiswa if keyword in m['nim']]
        else:
            print("Pilihan tidak valid!")
            return
        
        if hasil:
            self.show(hasil, f"HASIL PENCARIAN: {len(hasil)} DATA DITEMUKAN")
        else:
            print("Tidak ada data yang ditemukan.")
    
    def sortdata(self):
        if not self.data_mahasiswa:
            print("Tidak ada data untuk di-sort.")
            return
        
        print("\nSORTING DATA")
        print("1. Berdasarkan nama (A-Z)")
        print("2. Berdasarkan NIM")
        print("3. Berdasarkan nilai akhir (tertinggi-terendah)")
        print("4. Berdasarkan nilai akhir (terendah-tertinggi)")
        
        pilihan = input("Pilih kriteria sorting (1-4): ")
        
        if pilihan == "1":
            sorted_data = sorted(self.data_mahasiswa, key=lambda x: x['nama'])
            self.show(sorted_data, "DATA TERURUT BERDASARKAN NAMA (A-Z)")
        elif pilihan == "2":
            sorted_data = sorted(self.data_mahasiswa, key=lambda x: x['nim'])
            self.show(sorted_data, "DATA TERURUT BERDASARKAN NIM")
        elif pilihan == "3":
            sorted_data = sorted(self.data_mahasiswa, 
                               key=lambda x: self.nilai_akhir(x['nilai_uts'], x['nilai_uas'], x['nilai_tugas']), 
                               reverse=True)
            self.show(sorted_data, "DATA TERURUT BERDASARKAN NILAI AKHIR (TINGGI-RENDAH)")
        elif pilihan == "4":
            sorted_data = sorted(self.data_mahasiswa, 
                               key=lambda x: self.nilai_akhir(x['nilai_uts'], x['nilai_uas'], x['nilai_tugas']))
            self.show(sorted_data, "DATA TERURUT BERDASARKAN NILAI AKHIR (RENDAH-TINGGI)")
        else:
            print("Pilihan tidak valid!")
    
    def gradefilter(self):
        if not self.data_mahasiswa:
            print("Tidak ada data mahasiswa untuk difilter.")
            return
        
        print("\nFILTER BERDASARKAN GRADE")
        print("Pilihan grade: A, B, C, D, E")
        
        grade_input = input("Masukkan grade yang ingin ditampilkan: ").upper().strip()
        
        if grade_input not in ["A", "B", "C", "D", "E"]:
            print("Grade tidak valid!")
            return
        
        mahasiswa_filtered = []
        for mahasiswa in self.data_mahasiswa:
            nilai_akhir = self.nilai_akhir(
                mahasiswa["nilai_uts"],
                mahasiswa["nilai_uas"],
                mahasiswa["nilai_tugas"]
            )
            grade = self.grade(nilai_akhir)
            
            if grade == grade_input:
                mahasiswa_filtered.append(mahasiswa)
        
        if mahasiswa_filtered:
            self.show(mahasiswa_filtered, f"MAHASISWA DENGAN GRADE {grade_input}")
        else:
            print(f"Tidak ada mahasiswa dengan grade {grade_input}")
    
    def stats(self):
        if not self.data_mahasiswa:
            print("Tidak ada data untuk ditampilkan statistik.")
            return
        
        total_mahasiswa = len(self.data_mahasiswa)
        nilai_akhir_list = []
        grade_count = {"A": 0, "B": 0, "C": 0, "D": 0, "E": 0}
        status_count = {"LULUS": 0, "TIDAK LULUS": 0}
        
        for mahasiswa in self.data_mahasiswa:
            nilai_akhir = self.nilai_akhir(
                mahasiswa["nilai_uts"],
                mahasiswa["nilai_uas"],
                mahasiswa["nilai_tugas"]
            )
            nilai_akhir_list.append(nilai_akhir)
            grade = self.grade(nilai_akhir)
            status = self.status(nilai_akhir)
            
            grade_count[grade] += 1
            status_count[status] += 1
        
        rata_rata = sum(nilai_akhir_list) / total_mahasiswa
        nilai_tertinggi = max(nilai_akhir_list)
        nilai_terendah = min(nilai_akhir_list)
        
        print("\nSTATISTIK LENGKAP NILAI MAHASISWA")
        print("=" * 50)
        print(f"Total Mahasiswa    : {total_mahasiswa}")
        print(f"Rata-rata Nilai    : {rata_rata:.2f}")
        print(f"Nilai Tertinggi    : {nilai_tertinggi:.2f}")
        print(f"Nilai Terendah     : {nilai_terendah:.2f}")
        print("\nDistribusi Grade:")
        for grade, count in grade_count.items():
            persentase = (count / total_mahasiswa) * 100
            print(f"  Grade {grade}: {count:2d} mahasiswa ({persentase:.1f}%)")
        
        print("\nStatus Kelulusan:")
        for status, count in status_count.items():
            persentase = (count / total_mahasiswa) * 100
            print(f"  {status}: {count:2d} mahasiswa ({persentase:.1f}%)")
        
        print(f"\nMahasiswa dengan Nilai Tertinggi:")
        mahasiswa_tertinggi = max(self.data_mahasiswa, 
                                key=lambda x: self.nilai_akhir(x['nilai_uts'], x['nilai_uas'], x['nilai_tugas']))
        nilai_akhir_tertinggi = self.nilai_akhir(
            mahasiswa_tertinggi['nilai_uts'], 
            mahasiswa_tertinggi['nilai_uas'], 
            mahasiswa_tertinggi['nilai_tugas']
        )
        print(f"  {mahasiswa_tertinggi['nama']} - {nilai_akhir_tertinggi:.2f} (Grade: {self.grade(nilai_akhir_tertinggi)})")
        
        print(f"Mahasiswa dengan Nilai Terendah:")
        mahasiswa_terendah = min(self.data_mahasiswa, 
                               key=lambda x: self.nilai_akhir(x['nilai_uts'], x['nilai_uas'], x['nilai_tugas']))
        nilai_akhir_terendah = self.nilai_akhir(
            mahasiswa_terendah['nilai_uts'], 
            mahasiswa_terendah['nilai_uas'], 
            mahasiswa_terendah['nilai_tugas']
        )
        print(f"  {mahasiswa_terendah['nama']} - {nilai_akhir_terendah:.2f} (Grade: {self.grade(nilai_akhir_terendah)})")
    
    def export(self):
        if not self.data_mahasiswa:
            print("Tidak ada data untuk diekspor.")
            return
        
        data_ekspor = []
        for mahasiswa in self.data_mahasiswa:
            nilai_akhir = self.nilai_akhir(
                mahasiswa["nilai_uts"],
                mahasiswa["nilai_uas"],
                mahasiswa["nilai_tugas"]
            )
            data_mahasiswa = mahasiswa.copy()
            data_mahasiswa['nilai_akhir'] = round(nilai_akhir, 2)
            data_mahasiswa['grade'] = self.grade(nilai_akhir)
            data_mahasiswa['status'] = self.status(nilai_akhir)
            data_ekspor.append(data_mahasiswa)
        
        filename = f"data_mahasiswa_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(data_ekspor, f, indent=2, ensure_ascii=False)
            print(f"Data berhasil diekspor ke file: {filename}")
        except Exception as e:
            print(f"Gagal mengekspor data: {e}")
    
    def menu(self):
        print("\n" + "="*60)
        print("        PROGRAM PENGELOLAAN DATA NILAI MAHASISWA")
        print("="*60)
        print("1. Tampilkan Semua Data")
        print("2. Input Data Baru")
        print("3. Edit Data")
        print("4. Hapus Data")
        print("5. Cari Data")
        print("6. Sorting Data")
        print("7. Filter Berdasarkan Grade")
        print("8. Statistik Lengkap")
        print("9. Ekspor Data ke File")
        print("0. Keluar")
        print("="*60)
    
    def start(self):
        self.clear_screen()
        print("Selamat datang di Program Pengelolaan Data Nilai Mahasiswa!")
        
        while True:
            self.menu()
            
            pilihan = input("Masukkan pilihan (0-9): ").strip()
            
            if pilihan == "1":
                self.show()
            elif pilihan == "2":
                self.inputmhs()
            elif pilihan == "3":
                self.editmhs()
            elif pilihan == "4":
                self.deletemhs()
            elif pilihan == "5":
                self.searchmhs()
            elif pilihan == "6":
                self.sortdata()
            elif pilihan == "7":
                self.gradefilter()
            elif pilihan == "8":
                self.stats()
            elif pilihan == "9":
                self.export()
            elif pilihan == "0":
                print("\nTerima kasih telah menggunakan program ini!")
                break
            else:
                print("Pilihan tidak valid! Silakan pilih 0-9.")
            
            input("\nTekan Enter untuk melanjutkan...")
            self.clear_screen()

if __name__ == "__main__":
    program = Main()
    program.start()