# 🚀 Quick Start Guide - Backend Lomba 17 Agustus

## 📋 Prerequisites

- Node.js (versi 14 atau lebih baru)
- npm atau yarn
- MongoDB (Atlas atau lokal)

## ⚡ Langkah Cepat

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Database

Pilih salah satu:

**Option A: MongoDB Atlas (Recommended)**

- Buka `config.env`
- Pastikan `MONGODB_URI` sudah benar
- Whitelist IP address Anda di MongoDB Atlas
- Lihat `MONGODB_SETUP.md` untuk detail

**Option B: MongoDB Lokal**

- Install MongoDB Community Server
- Server akan otomatis menggunakan MongoDB lokal jika Atlas gagal

### 3. Jalankan Server

```bash
# Development mode (dengan auto-restart)
npm run dev

# Production mode
npm start
```

### 4. Test API

Server akan berjalan di `http://localhost:5000`

**Test endpoints:**

- `GET /` - Welcome message
- `GET /api/peserta` - Daftar semua peserta
- `POST /api/peserta` - Daftar peserta baru
- `GET /api/peserta/stats/summary` - Statistik peserta

## 🎯 Fitur Utama

✅ **Public Access** - Semua orang bisa lihat daftar peserta  
✅ **Real-time Data** - Data update otomatis  
✅ **Mobile Friendly** - Bisa diakses dari HP  
✅ **Filter & Search** - Cari peserta berdasarkan lomba  
✅ **Statistics** - Total peserta dan status

## 📱 Cara Akses dari Frontend

### JavaScript Fetch API

```javascript
// Ambil semua peserta
const response = await fetch("http://localhost:5000/api/peserta");
const data = await response.json();

// Daftar peserta baru
const newPeserta = await fetch("http://localhost:5000/api/peserta", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    nama: "John Doe",
    email: "john@example.com",
    noTelepon: "08123456789",
    alamat: "Jl. Contoh No. 1",
    jenisLomba: "Lomba Makan Kerupuk",
  }),
});
```

### Axios

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Ambil semua peserta
const peserta = await api.get("/peserta");

// Daftar peserta baru
const newPeserta = await api.post("/peserta", {
  nama: "John Doe",
  email: "john@example.com",
  noTelepon: "08123456789",
  alamat: "Jl. Contoh No. 1",
  jenisLomba: "Lomba Makan Kerupuk",
});
```

## 🔧 Troubleshooting

### Server tidak bisa start

```bash
# Cek port yang digunakan
netstat -ano | findstr :5000

# Kill process yang menggunakan port 5000
taskkill /PID <PID> /F
```

### MongoDB connection error

- Lihat `MONGODB_SETUP.md`
- Pastikan IP address sudah di-whitelist
- Cek username/password connection string

### CORS error di frontend

- Backend sudah dikonfigurasi dengan CORS
- Pastikan URL backend benar
- Restart server setelah perubahan

## 📊 Database Schema

```javascript
{
  nama: "String (required)",
  email: "String (required, unique)",
  noTelepon: "String (required)",
  alamat: "String (required)",
  jenisLomba: "String (enum)",
  tanggalDaftar: "Date (auto)",
  status: "String (enum)",
  catatan: "String (optional)"
}
```

## 🌐 Deployment

### Heroku

```bash
# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Vercel

- Upload ke Vercel
- Set environment variables di dashboard
- Pastikan MongoDB Atlas IP whitelist sudah benar

## 📞 Support

Jika ada masalah:

1. Cek console log server
2. Lihat `MONGODB_SETUP.md`
3. Pastikan semua dependencies terinstall
4. Restart server

---

**🎉 Selamat! Backend Anda sudah siap digunakan!**
