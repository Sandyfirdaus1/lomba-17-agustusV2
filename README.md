# Backend API Lomba 17 Agustus

Backend untuk aplikasi pendaftaran dan pengelolaan peserta lomba 17 Agustus menggunakan Node.js, Express, dan MongoDB.

## 🚨 **PENTING: Setup Environment Variables**

**JANGAN COMMIT credentials MongoDB ke GitHub!**

1. **Copy file template:**

   ```bash
   cp env.example .env
   ```

2. **Edit file .env dengan credentials asli:**

   ```env
   MONGODB_URI=mongodb+srv://sandyfirdaus19:password@cluster0.takmhsl.mongodb.net/lomba-17-agustus?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   ```

3. **File .env sudah di .gitignore - tidak akan masuk GitHub**

## Fitur

- ✅ Pendaftaran peserta baru
- ✅ Melihat daftar semua peserta (public)
- ✅ Filter peserta berdasarkan jenis lomba
- ✅ Update data peserta
- ✅ Hapus data peserta
- ✅ Statistik peserta
- ✅ Validasi data
- ✅ Error handling

## Teknologi

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM untuk MongoDB
- **CORS** - Cross-origin resource sharing

## Instalasi

1. Install dependencies:

```bash
npm install
```

2. Setup environment variables (lihat section di atas)

3. Jalankan server:

```bash
# Development mode (dengan nodemon)
npm run dev

# Production mode
npm start
```

## Struktur Database

### Model Peserta

```javascript
{
  nama: String (required),
  email: String (required, unique),
  noTelepon: String (required),
  alamat: String (required),
  jenisLomba: String (required, enum),
  tanggalDaftar: Date (auto),
  status: String (enum: Terdaftar, Diterima, Ditolak),
  catatan: String (optional)
}
```

### Jenis Lomba yang Tersedia

- Lomba Makan Kerupuk
- Lomba Balap Karung
- Lomba Tarik Tambang
- Lomba Panjat Pinang
- Lomba Bakiak

## API Endpoints

### Base URL: `http://localhost:5000/api/peserta`

#### 1. Mendapatkan Semua Peserta (Public)

```
GET /
```

**Response:**

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "nama": "John Doe",
      "email": "john@example.com",
      "noTelepon": "08123456789",
      "alamat": "Jl. Contoh No. 123",
      "jenisLomba": "Lomba Makan Kerupuk",
      "tanggalDaftar": "2025-08-16T02:53:00.000Z",
      "status": "Terdaftar",
      "catatan": "Peserta baru"
    }
  ]
}
```

#### 2. Mendaftarkan Peserta Baru

```
POST /
```

**Body:**

```json
{
  "nama": "John Doe",
  "email": "john@example.com",
  "noTelepon": "08123456789",
  "alamat": "Jl. Contoh No. 123",
  "jenisLomba": "Lomba Makan Kerupuk",
  "catatan": "Peserta baru"
}
```

#### 3. Filter Peserta berdasarkan Jenis Lomba

```
GET /lomba/:jenisLomba
```

**Contoh:** `GET /lomba/Lomba%20Makan%20Kerupuk`

#### 4. Mendapatkan Peserta berdasarkan ID

```
GET /:id
```

#### 5. Update Data Peserta

```
PUT /:id
```

#### 6. Hapus Peserta

```
DELETE /:id
```

#### 7. Statistik Peserta

```
GET /stats/summary
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalPeserta": 25,
    "pesertaPerLomba": [
      {
        "_id": "Lomba Makan Kerupuk",
        "count": 8
      },
      {
        "_id": "Lomba Balap Karung",
        "count": 6
      }
    ],
    "statusCounts": [
      {
        "_id": "Terdaftar",
        "count": 20
      },
      {
        "_id": "Diterima",
        "count": 5
      }
    ]
  }
}
```

## Error Handling

Semua endpoint mengembalikan response dengan format yang konsisten:

**Success:**

```json
{
  "success": true,
  "data": {...}
}
```

**Error:**

```json
{
  "success": false,
  "message": "Pesan error",
  "error": "Detail error (optional)"
}
```

## CORS

API sudah dikonfigurasi dengan CORS untuk memungkinkan akses dari frontend yang berbeda domain.

## Environment Variables

**JANGAN COMMIT file .env ke GitHub!**

Buat file `.env` dari template `env.example`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5000
NODE_ENV=development
```

## Cara Penggunaan

1. **Frontend dapat mengakses daftar peserta** melalui endpoint `GET /api/peserta`
2. **Data peserta real-time** dan dapat diakses dari mana saja (HP, komputer, dll)
3. **Tidak ada autentikasi** untuk melihat daftar peserta (public access)
4. **Validasi data** otomatis saat pendaftaran

## Testing API

Gunakan tools seperti Postman, Insomnia, atau curl untuk testing:

```bash
# Test mendapatkan semua peserta
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

## 🔐 **Security Notes**

- ✅ **Environment variables di .gitignore**
- ✅ **Tidak ada hardcoded credentials**
- ✅ **Template file untuk setup**
- ✅ **CORS dikonfigurasi dengan aman**
