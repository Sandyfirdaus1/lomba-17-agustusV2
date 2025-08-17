# 🚀 Cara Deploy Backend ke Vercel

## 📋 Langkah-langkah Deployment

### 1. Push Code ke GitHub

```bash
git add .
git commit -m "Update backend for Vercel deployment"
git push origin main
```

### 2. Setup Vercel Project

1. **Buka [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Klik "New Project"**
3. **Import dari GitHub**
4. **Pilih repository `lomba-17-agustus`**
5. **Pilih folder `backend`**
6. **Klik "Deploy"**

### 3. Setup Environment Variables di Vercel

Setelah project dibuat, tambahkan environment variables:

1. **Buka project di Vercel Dashboard**
2. **Klik tab "Settings"**
3. **Klik "Environment Variables"**
4. **Tambahkan variables berikut:**

```
MONGODB_URI=mongodb+srv://sandyfirdaus19:gW3go898qcCRVReG@cluster0.takmhsl.mongodb.net/lomba-17-agustus?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
CORS_ORIGIN=*
```

### 4. Redeploy Setelah Setup Environment Variables

1. **Klik "Deployments" tab**
2. **Klik "Redeploy" pada deployment terbaru**

### 5. Test Backend

Setelah deploy selesai, test endpoint:

```bash
# Test health endpoint
curl https://your-backend-url.vercel.app/health

# Test API endpoint
curl https://your-backend-url.vercel.app/api/peserta
```

## 🔗 Menghubungkan Frontend

### 1. Update Frontend Environment

Buat file `.env.local` di folder `frontend`:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
```

### 2. Deploy Frontend

1. **Buat project baru di Vercel untuk frontend**
2. **Pilih folder `frontend`**
3. **Deploy**

## 🔍 Troubleshooting

### Backend Tidak Bisa Diakses

1. **Cek Environment Variables**

   - Pastikan `MONGODB_URI` sudah benar
   - Pastikan `NODE_ENV=production`
   - Pastikan `CORS_ORIGIN=*`

2. **Cek MongoDB Atlas**

   - Pastikan IP address sudah di-whitelist
   - Atau gunakan `0.0.0.0/0` untuk allow semua IP

3. **Cek Vercel Logs**
   - Buka Vercel dashboard
   - Pilih project backend
   - Klik "Functions" tab
   - Lihat function logs

### Error MongoDB Connection

Jika ada error MongoDB, cek:

1. Connection string sudah benar
2. Username dan password sudah benar
3. Database name sudah benar
4. IP address sudah di-whitelist

## 📊 Monitoring

### Vercel Dashboard

- **Functions**: Lihat function logs
- **Analytics**: Lihat traffic dan performance
- **Settings**: Manage environment variables

### Health Check

```bash
curl https://your-backend-url.vercel.app/health
```

Response yang diharapkan:

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production",
  "database": "connected"
}
```

## 🔄 Auto-deploy

Vercel akan otomatis deploy ulang setiap kali ada push ke branch `main` di GitHub.

## 📝 Tips

1. **Gunakan Environment Variables** untuk sensitive data
2. **Test di local** sebelum deploy
3. **Monitor logs** setelah deploy
4. **Setup proper CORS** untuk frontend
5. **Use proper error handling** di code
