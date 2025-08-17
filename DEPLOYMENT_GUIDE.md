# 🚀 Deployment Guide - Backend Lomba 17 Agustus

## 📋 Prerequisites

- Node.js (v16 atau lebih baru)
- MongoDB Atlas account (untuk database)
- Vercel account (untuk deployment)

## 🔧 Setup Lokal

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

Buat file `config.env` dengan konfigurasi berikut:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lomba-17-agustus?retryWrites=true&w=majority

# MongoDB Lokal (fallback)
MONGODB_LOCAL=mongodb://localhost:27017/lomba-17-agustus

PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 3. Menjalankan Backend Secara Terus Menerus

#### Option A: Menggunakan PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start backend dengan PM2
npm run pm2:start

# Monitor aplikasi
npm run pm2:monit

# Lihat logs
npm run pm2:logs

# Restart jika perlu
npm run pm2:restart

# Stop aplikasi
npm run pm2:stop
```

#### Option B: Menggunakan Nodemon (Development)

```bash
npm run dev
```

#### Option C: Menggunakan Node langsung

```bash
npm start
```

## 🌐 Deployment ke Vercel

### 1. Setup Vercel Project

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Import project dari GitHub
3. Pilih folder `backend`

### 2. Environment Variables di Vercel

Tambahkan environment variables berikut di Vercel:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lomba-17-agustus?retryWrites=true&w=majority
NODE_ENV=production
CORS_ORIGIN=*
```

### 3. Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel --prod
```

## 🔗 Menghubungkan Frontend dengan Backend

### 1. Update Frontend Environment

Buat file `.env.local` di folder `frontend`:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
```

### 2. Update Backend URL di Frontend

Pastikan semua API calls di frontend menggunakan environment variable:

```javascript
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
```

## 🧪 Testing

### 1. Test Backend Lokal

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test API endpoint
curl http://localhost:5000/api/peserta
```

### 2. Test Backend Vercel

```bash
# Ganti dengan URL Vercel Anda
curl https://your-backend-url.vercel.app/health
curl https://your-backend-url.vercel.app/api/peserta
```

## 🔍 Troubleshooting

### Backend Tidak Bisa Diakses

1. **Cek MongoDB Connection**

   - Pastikan IP address sudah di-whitelist di MongoDB Atlas
   - Cek connection string

2. **Cek CORS**

   - Pastikan CORS_ORIGIN sudah benar
   - Untuk development: `http://localhost:3000`
   - Untuk production: `*` atau domain frontend

3. **Cek Environment Variables**
   - Pastikan semua environment variables sudah diset
   - Cek di Vercel dashboard

### PM2 Issues

```bash
# Reset PM2
pm2 kill
pm2 start ecosystem.config.js

# Cek status
pm2 status

# Cek logs
pm2 logs
```

## 📊 Monitoring

### PM2 Monitoring

```bash
# Monitor real-time
npm run pm2:monit

# Lihat logs
npm run pm2:logs

# Cek status
pm2 status
```

### Vercel Monitoring

- Buka Vercel dashboard
- Pilih project backend
- Lihat Function Logs dan Analytics

## 🔄 Auto-restart dengan PM2

PM2 akan otomatis restart aplikasi jika:

- Aplikasi crash
- Server restart
- Memory usage melebihi 1GB

Untuk setup auto-start saat boot:

```bash
pm2 startup
pm2 save
```

## 📝 Logs

### PM2 Logs

```bash
# Lihat semua logs
npm run pm2:logs

# Lihat error logs
pm2 logs lomba-17-agustus-backend --err

# Lihat output logs
pm2 logs lomba-17-agustus-backend --out
```

### Vercel Logs

- Buka Vercel dashboard
- Pilih project
- Klik "Functions" tab
- Lihat function logs
