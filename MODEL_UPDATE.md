# Model Update: Simplified Peserta Schema

## Overview

Model `Peserta` telah diupdate untuk menghapus field-field yang tidak diperlukan, membuat sistem lebih sederhana dan fokus pada data yang benar-benar diperlukan.

## Fields Removed ❌

### 1. **Email**

- **Sebelumnya**: Required field dengan validasi format dan unique constraint
- **Sekarang**: Dihapus sepenuhnya
- **Alasan**: Tidak diperlukan untuk pendaftaran lomba 17 Agustus

### 2. **Alamat**

- **Sebelumnya**: Required field untuk alamat peserta
- **Sekarang**: Dihapus sepenuhnya
- **Alasan**: Bisa diisi nanti atau tidak diperlukan untuk pendaftaran awal

### 3. **Babak**

- **Sebelumnya**: Field untuk tracking babak turnamen (Penyisihan, Perempat Final, Semi Final, Final)
- **Sekarang**: Dihapus sepenuhnya
- **Alasan**: Bisa ditambahkan nanti jika diperlukan

### 4. **Skor**

- **Sebelumnya**: Field untuk menyimpan skor peserta
- **Sekarang**: Dihapus sepenuhnya
- **Alasan**: Bisa ditambahkan nanti untuk sistem scoring

### 5. **Ranking**

- **Sebelumnya**: Field untuk ranking peserta
- **Sekarang**: Dihapus sepenuhnya
- **Alasan**: Bisa dihitung dari data lain atau ditambahkan nanti

### 6. **Waktu Penyelesaian**

- **Sebelumnya**: Field untuk waktu penyelesaian lomba (dalam detik)
- **Sekarang**: Dihapus sepenuhnya
- **Alasan**: Bisa ditambahkan nanti untuk lomba yang memerlukan timing

## Fields Kept ✅

### **Required Fields**

- `nama` - Nama peserta
- `noTelepon` - Nomor telepon
- `usia` - Usia peserta (1-120 tahun)
- `jenisLomba` - Jenis lomba yang dipilih

### **Auto-generated Fields**

- `tanggalDaftar` - Tanggal pendaftaran (otomatis)
- `status` - Status peserta (default: "Terdaftar")

### **Optional Fields**

- `catatan` - Catatan tambahan
- `alasanDiskualifikasi` - Alasan diskualifikasi
- `tanggalDiskualifikasi` - Tanggal diskualifikasi
- `juara` - Posisi juara
- `hadiah` - Hadiah yang diterima
- `catatanJuri` - Catatan dari juri

### **Status Tracking Fields**

- `isLolos` - Status lolos ke babak selanjutnya
- `isDiskualifikasi` - Status diskualifikasi
- `isJuara` - Status juara

## Database Changes

### **Indexes Updated**

- **Sebelumnya**: `{ nama: "text", email: "text" }`
- **Sekarang**: `{ nama: "text" }`

### **Unique Constraints**

- **Tetap**: `{ nama: 1, jenisLomba: 1 }` - Mencegah duplikasi nama dalam lomba yang sama

## API Changes

### **POST /api/peserta**

- **Sebelumnya**: Validasi email dan alamat sebagai required fields
- **Sekarang**: Hanya validasi nama, noTelepon, usia, dan jenisLomba

### **POST /api/peserta/:id/action**

- **Sebelumnya**: Bisa update babak, skor, ranking, waktuPenyelesaian
- **Sekarang**: Hanya update status dan field yang tersisa

## Benefits

1. **Simpler Registration**: Form pendaftaran lebih sederhana dan cepat
2. **Focused Data**: Hanya menyimpan data yang benar-benar diperlukan
3. **Better Performance**: Database lebih ringan tanpa field yang tidak digunakan
4. **Easier Maintenance**: Kode lebih sederhana dan mudah di-maintain
5. **Future Flexibility**: Field bisa ditambahkan nanti sesuai kebutuhan

## Migration Notes

⚠️ **Important**: Jika ada data lama dengan field yang dihapus, field tersebut akan tetap ada di database lama tapi tidak akan digunakan oleh aplikasi baru.

Untuk database baru, field yang dihapus tidak akan dibuat sama sekali.

## Testing

Gunakan script `test-new-model.js` untuk memverifikasi struktur model baru:

```bash
node test-new-model.js
```

## Frontend Integration

Frontend sudah diupdate untuk:

- Tidak mengirim field email dan alamat
- Hanya mengirim data yang diperlukan
- Error handling yang sesuai dengan model baru
