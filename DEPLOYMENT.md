# Deployment Instructions - Backend

## Setup untuk Vercel Deployment

### 1. Environment Variables
Buat file `.env` di root folder backend dengan konfigurasi berikut:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lomba17agustus
MONGODB_LOCAL=mongodb://localhost:27017/lomba17agustus

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

### 2. Vercel Deployment

1. **Push ke GitHub Repository**
   ```bash
   git add .
   git commit -m "Add usia field and API endpoints for frontend integration"
   git push origin main
   ```

2. **Deploy ke Vercel**
   - Buka [Vercel Dashboard](https://vercel.com/dashboard)
   - Import repository `sandyfirdaus1/lomba-17-agustusV2`
   - Set environment variables:
     - `MONGODB_URI`: MongoDB Atlas connection string
     - `CORS_ORIGIN`: URL frontend yang sudah di-deploy

3. **Build Settings**
   - Framework Preset: Node.js
   - Build Command: `npm install`
   - Output Directory: `./`
   - Install Command: `npm install`

### 3. API Endpoints

#### GET `/api/peserta`
- Mendapatkan semua peserta
- Response: `{ success: true, count: number, data: Peserta[] }`

#### GET `/api/peserta/lomba/:jenisLomba`
- Mendapatkan peserta berdasarkan jenis lomba
- Response: `{ success: true, count: number, data: Peserta[] }`

#### POST `/api/peserta`
- Mendaftarkan peserta baru
- Body: `{ nama, email, noTelepon, usia, alamat, jenisLomba, catatan? }`
- Response: `{ success: true, message: string, data: Peserta }`

#### GET `/api/peserta/stats/summary`
- Mendapatkan statistik peserta
- Response: `{ success: true, data: { totalPeserta, pesertaPerLomba, statusCounts } }`

### 4. Model Peserta

```javascript
{
  nama: String (required),
  email: String (required, unique),
  noTelepon: String (required),
  usia: Number (required, 1-120),
  alamat: String (required),
  jenisLomba: String (required, enum),
  tanggalDaftar: Date (auto),
  status: String (enum: "Terdaftar", "Diterima", "Ditolak"),
  catatan: String (optional)
}
```

### 5. Jenis Lomba yang Tersedia

- "Lomba Makan Kerupuk"
- "Lomba Balap Karung"
- "Lomba Tarik Tambang"
- "Lomba Panjat Pinang"
- "Lomba Bakiak"

### 6. CORS Configuration

Backend sudah dikonfigurasi untuk menerima request dari frontend:
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}));
```

### 7. MongoDB Setup

1. **MongoDB Atlas (Recommended)**
   - Buat cluster di MongoDB Atlas
   - Whitelist IP address atau gunakan 0.0.0.0/0 untuk semua IP
   - Buat database user dengan read/write permissions
   - Copy connection string ke `MONGODB_URI`

2. **Local MongoDB (Development)**
   - Install MongoDB Community Server
   - Start MongoDB service
   - Gunakan `MONGODB_LOCAL` untuk development

### 8. Troubleshooting

**Error CORS:**
- Periksa `CORS_ORIGIN` environment variable
- Pastikan URL frontend sudah benar
- Restart deployment setelah mengubah environment variables

**Error MongoDB Connection:**
- Periksa connection string
- Pastikan IP address sudah di-whitelist
- Periksa username dan password

**Error Build:**
- Pastikan semua dependencies ada di `package.json`
- Periksa Node.js version compatibility
- Periksa import/export statements
