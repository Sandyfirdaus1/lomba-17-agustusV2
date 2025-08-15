# Setup MongoDB untuk Backend

## Opsi 1: MongoDB Atlas (Cloud - Recommended)

### Langkah 1: Whitelist IP Address

1. Buka [MongoDB Atlas](https://cloud.mongodb.com/)
2. Login dengan akun Anda
3. Pilih cluster yang sudah dibuat
4. Klik "Network Access" di sidebar kiri
5. Klik "Add IP Address"
6. Pilih salah satu:
   - **Allow Access from Anywhere**: `0.0.0.0/0` (untuk development)
   - **Allow Current IP**: Klik "Add Current IP Address"
   - **Custom IP**: Masukkan IP address Anda

### Langkah 2: Test Koneksi

Setelah whitelist IP, restart server:

```bash
npm run dev
```

## Opsi 2: MongoDB Lokal

### Langkah 1: Install MongoDB Community

1. Download dari [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Install dengan default settings
3. Pastikan MongoDB service berjalan

### Langkah 2: Test Koneksi

Server akan otomatis mencoba koneksi lokal jika Atlas gagal.

## Opsi 3: MongoDB Compass (GUI)

### Langkah 1: Install MongoDB Compass

1. Download dari [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Install dan buka aplikasi

### Langkah 2: Connect ke Database

1. Buka MongoDB Compass
2. Masukkan connection string:
   - **Atlas**: `mongodb+srv://sandyfirdaus19:gW3go898qcCRVReG@cluster0.takmhsl.mongodb.net/`
   - **Lokal**: `mongodb://localhost:27017/`

## Troubleshooting

### Error: "IP not whitelisted"

- Whitelist IP address Anda di MongoDB Atlas
- Atau gunakan `0.0.0.0/0` untuk development

### Error: "Authentication failed"

- Periksa username dan password di connection string
- Pastikan user memiliki akses read/write

### Error: "Connection timeout"

- Periksa firewall settings
- Pastikan port 27017 terbuka (untuk lokal)
- Periksa network connection

## Test API

Setelah MongoDB terhubung, test API dengan:

```bash
# Test koneksi
curl http://localhost:5000/

# Test daftar peserta
curl http://localhost:5000/api/peserta

# Test pendaftaran peserta baru
curl -X POST http://localhost:5000/api/peserta \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Test User",
    "email": "test@example.com",
    "noTelepon": "08123456789",
    "alamat": "Jl. Test No. 1",
    "jenisLomba": "Lomba Makan Kerupuk"
  }'
```

## Struktur Database

Database akan otomatis dibuat dengan nama `lomba-17-agustus` dan collection `pesertas`.

### Collection: pesertas

```json
{
  "_id": "ObjectId",
  "nama": "String",
  "email": "String (unique)",
  "noTelepon": "String",
  "alamat": "String",
  "jenisLomba": "String (enum)",
  "tanggalDaftar": "Date",
  "status": "String (enum)",
  "catatan": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
