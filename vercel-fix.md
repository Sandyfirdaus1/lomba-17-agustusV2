# 🔧 Perbaiki MongoDB Connection di Vercel

## 🚨 Masalah Saat Ini

- Backend berjalan ✅
- Database disconnected ❌
- API timeout ❌

## 🔧 Solusi

### 1. Cek Environment Variables di Vercel

Buka Vercel Dashboard > Project > Settings > Environment Variables

Pastikan sudah diset:

```
MONGODB_URI=mongodb+srv://sandyfirdaus19:gW3go898qcCRVReG@cluster0.takmhsl.mongodb.net/lomba-17-agustus?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
CORS_ORIGIN=*
```

### 2. Cek MongoDB Atlas

1. **Buka [MongoDB Atlas](https://cloud.mongodb.com)**
2. **Pilih cluster Anda**
3. **Klik "Network Access"**
4. **Klik "Add IP Address"**
5. **Pilih "Allow Access from Anywhere" (0.0.0.0/0)**
6. **Klik "Confirm"**

### 3. Test Connection String

Coba test connection string di MongoDB Compass atau shell:

```
mongodb+srv://sandyfirdaus19:gW3go898qcCRVReG@cluster0.takmhsl.mongodb.net/lomba-17-agustus?retryWrites=true&w=majority&appName=Cluster0
```

### 4. Redeploy Backend

Setelah setup environment variables:

1. Buka Vercel Dashboard
2. Pilih project backend
3. Klik "Deployments"
4. Klik "Redeploy" pada deployment terbaru

### 5. Test Lagi

```bash
# Test health
curl https://lomba-17-agustus-v2.vercel.app/health

# Test API
curl https://lomba-17-agustus-v2.vercel.app/api/peserta
```

## 🔍 Troubleshooting

### Jika Masih Error:

1. **Cek Username/Password MongoDB**

   - Pastikan username dan password benar
   - Coba reset password jika perlu

2. **Cek Database Name**

   - Pastikan database `lomba-17-agustus` sudah dibuat
   - Atau ganti dengan nama database yang ada

3. **Cek Cluster Status**

   - Pastikan cluster MongoDB Atlas aktif
   - Cek billing jika perlu

4. **Cek Vercel Logs**
   - Buka Vercel Dashboard > Functions
   - Lihat error logs untuk detail

## 📝 Alternative Solution

Jika masih bermasalah, bisa gunakan MongoDB local atau service lain:

```env
# Untuk MongoDB local
MONGODB_URI=mongodb://localhost:27017/lomba-17-agustus

# Atau gunakan MongoDB Atlas dengan connection string baru
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```
