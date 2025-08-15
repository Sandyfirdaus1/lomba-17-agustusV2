// File test sederhana untuk API
// Bisa dijalankan dengan: node test-api.js

const testData = {
  nama: "Test User",
  email: "test@example.com",
  noTelepon: "08123456789",
  alamat: "Jl. Test No. 1, Jakarta",
  jenisLomba: "Lomba Makan Kerupuk",
  catatan: "Peserta test untuk demo",
};

console.log("Data test untuk API:");
console.log(JSON.stringify(testData, null, 2));

console.log("\nEndpoint yang tersedia:");
console.log("1. GET /api/peserta - Lihat semua peserta");
console.log("2. POST /api/peserta - Daftar peserta baru");
console.log("3. GET /api/peserta/lomba/:jenisLomba - Filter berdasarkan lomba");
console.log("4. GET /api/peserta/:id - Lihat peserta berdasarkan ID");
console.log("5. PUT /api/peserta/:id - Update data peserta");
console.log("6. DELETE /api/peserta/:id - Hapus peserta");
console.log("7. GET /api/peserta/stats/summary - Statistik peserta");

console.log("\nUntuk testing, gunakan:");
console.log("- Postman");
console.log("- Insomnia");
console.log("- curl command");
console.log("- Browser (untuk GET requests)");
