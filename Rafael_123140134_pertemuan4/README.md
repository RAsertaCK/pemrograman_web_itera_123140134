# 📚 Program Pengelolaan Data Nilai Mahasiswa

## Nama    : Rafael Abimanyu Ratmoko
## NIM     : 123140134

Program Python untuk mengelola data nilai mahasiswa dengan fitur lengkap yang dibuat sebagai tugas praktikum Python Dasar.

## 🎯 Fitur Program

### ✨ Menu Utama
1. **Tampilkan Semua Data** - Lihat semua data dalam tabel rapi
2. **Input Data Baru** - Tambah data mahasiswa baru
3. **Edit Data** - Ubah data yang sudah ada
4. **Hapus Data** - Hapus data dengan konfirmasi
5. **Cari Data** - Cari berdasarkan nama atau NIM
6. **Sorting Data** - Urutkan data berdasarkan kriteria
7. **Filter Berdasarkan Grade** - Filter mahasiswa by grade
8. **Statistik Lengkap** - Lihat statistik detail
9. **Ekspor Data ke File** - Simpan ke file JSON
0. **Keluar** - Keluar dari program

### 🎓 Fitur Akademik
- **Perhitungan Nilai Akhir**: 30% UTS + 40% UAS + 30% Tugas
- **Sistem Grade**: 
  - A → ≥ 80
  - B → ≥ 70  
  - C → ≥ 60
  - D → ≥ 50
  - E → < 50
- **Status Kelulusan**: LULUS (≥60) / TIDAK LULUS (<60)

## 🚀 Cara Menjalankan

### Prasyarat
- Python 3.x
- Tidak perlu install library tambahan

### Langkah Menjalankan
```bash
# Jalankan file Praktikum4.py
python Praktikum4.py
```

## 📊 Data Contoh
Program sudah include data 5 mahasiswa:

| Nama | NIM | UTS | UAS | Tugas | Nilai Akhir | Grade | Status |
|------|-----|-----|-----|-------|-------------|-------|--------|
| PewDiePie | 122140023 | 91 | 90 | 89 | 90.00 | A | LULUS |
| Markeplier | 123140112 | 80 | 80 | 75 | 78.50 | B | LULUS |
| Windah Basudara | 122140010 | 60 | 72 | 76 | 69.60 | B | LULUS |
| Reza Auditore | 123140123 | 55 | 60 | 58 | 58.30 | D | TIDAK LULUS |
| Ericko Lim | 123140001 | 45 | 50 | 48 | 48.10 | E | TIDAK LULUS |

## 📖 Panduan Penggunaan

### 1. Menampilkan Data
- Pilih menu **1** untuk melihat semua data
- Data ditampilkan dalam format tabel dengan kolom lengkap

### 2. Input Data Baru
- Pilih menu **2**
- Masukkan:
  - **Nama** (wajib)
  - **NIM** (unik, wajib)
  - **Nilai UTS**, **UAS**, **Tugas** (0-100)

### 3. Edit Data  
- Pilih menu **3**
- Pilih nomor mahasiswa yang akan diedit
- Bisa edit nama dan nilai
- Kosongkan input untuk tetap pakai nilai lama

### 4. Hapus Data
- Pilih menu **4**  
- Pilih nomor mahasiswa
- Konfirmasi dengan 'y' untuk hapus

### 5. Pencarian Data
- Pilih menu **5**
- Pilih metode:
  - **1** - Cari by nama (bisa partial match)
  - **2** - Cari by NIM

### 6. Sorting Data
- Pilih menu **6**
- Pilihan sorting:
  - **1** - Nama (A-Z)
  - **2** - NIM  
  - **3** - Nilai akhir (tinggi-rendah)
  - **4** - Nilai akhir (rendah-tinggi)

### 7. Filter by Grade
- Pilih menu **7**
- Masukkan grade (A, B, C, D, E)
- Tampilkan hanya mahasiswa dengan grade tertentu

### 8. Statistik Lengkap
- Pilih menu **8**
- Menampilkan:
  - Total mahasiswa
  - Rata-rata nilai
  - Nilai tertinggi & terendah
  - Distribusi grade
  - Status kelulusan
  - Mahasiswa dengan nilai tertinggi/terendah

### 9. Ekspor Data
- Pilih menu **9**
- Data diekspor ke file JSON dengan format:
  ```json
  {
    "nama": "PewDiePie",
    "nim": "122140023", 
    "nilai_uts": 91,
    "nilai_uas": 90,
    "nilai_tugas": 89,
    "nilai_akhir": 90.0,
    "grade": "A",
    "status": "LULUS"
  }
  ```
- Nama file: `data_mahasiswa_YYYYMMDD_HHMMSS.json`

## 🛡️ Validasi Input
- ✅ NIM harus unik
- ✅ Nilai harus angka antara 0-100
- ✅ Input nama tidak boleh kosong
- ✅ Konfirmasi untuk operasi hapus
- ✅ Error handling untuk input tidak valid

## 💻 Struktur Kode

### Class `Main`
- **`__init__()`** - Initialize dengan data contoh
- **`nilai_akhir()`** - Hitung nilai akhir
- **`grade()`** - Tentukan grade
- **`status()`** - Tentukan status kelulusan
- **`show()`** - Tampilkan data dalam tabel
- **`inputmhs()`** - Input data baru
- **`editmhs()`** - Edit data existing  
- **`deletemhs()`** - Hapus data
- **`searchmhs()`** - Cari data
- **`sortdata()`** - Sorting data
- **`gradefilter()`** - Filter by grade
- **`stats()`** - Tampilkan statistik
- **`export()`** - Ekspor ke JSON
- **`menu()`** - Tampilkan menu
- **`start()`** - Main program loop

## 📋 Contoh Output

### Tabel Data
```
========================================================================================================================
                                            DATA MAHASISWA
========================================================================================================================
No  Nama                 NIM         UTS   UAS   Tugas   Nilai Akhir Grade    Status
------------------------------------------------------------------------------------------------------------------------
1   PewDiePie            122140023   91    90    89      90.00       A        LULUS
2   Markeplier           123140112   80    80    75      78.50       B        LULUS
...
========================================================================================================================
Total data: 5 mahasiswa
```

### Statistik
```
STATISTIK LENGKAP NILAI MAHASISWA
==================================================
Total Mahasiswa    : 5
Rata-rata Nilai    : 69.10
Nilai Tertinggi    : 90.00
Nilai Terendah     : 48.10

Distribusi Grade:
  Grade A:  1 mahasiswa (20.0%)
  Grade B:  2 mahasiswa (40.0%) 
  Grade C:  0 mahasiswa (0.0%)
  Grade D:  1 mahasiswa (20.0%)
  Grade E:  1 mahasiswa (20.0%)

Status Kelulusan:
  LULUS: 3 mahasiswa (60.0%)
  TIDAK LULUS: 2 mahasiswa (40.0%)

Mahasiswa dengan Nilai Tertinggi:
  PewDiePie - 90.00 (Grade: A)

Mahasiswa dengan Nilai Terendah:
  Ericko Lim - 48.10 (Grade: E)
```

## 🎨 Keunggulan Program
- ✅ **User-friendly** - Interface sederhana dan intuitif
- ✅ **Robust** - Validasi input dan error handling
- ✅ **Lengkap** - Semua fitur manajemen data
- ✅ **Praktis** - Ekspor data ke JSON
- ✅ **Informative** - Statistik detail dan analisis


---