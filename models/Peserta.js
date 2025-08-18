const mongoose = require("mongoose");

const pesertaSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, "Nama wajib diisi"],
      trim: true,
    },
    noTelepon: {
      type: String,
      required: [true, "Nomor telepon wajib diisi"],
      trim: true,
    },
    usia: {
      type: Number,
      required: [true, "Usia wajib diisi"],
      min: [1, "Usia minimal 1 tahun"],
      max: [120, "Usia maksimal 120 tahun"],
    },
    jenisLomba: {
      type: String,
      required: [true, "Jenis lomba wajib dipilih"],
      enum: [
        "Balap Karung",
        "Makan Kerupuk",
        "Balap Kelereng",
        "Memasukkan Paku ke Botol",
        "Tarik Tambang (Tim)",
        "Bakiak (Tim)",
        "Panjat Pinang",
        "Lempar Cincin",
        "Fashion Show Merah Putih",
      ],
    },
    tanggalDaftar: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: [
        "Terdaftar",
        "Diskualifikasi",
        "Juara 1",
        "Juara 2",
        "Juara 3",
        "Lolos ke Babak Selanjutnya",
      ],
      default: "Terdaftar",
    },
    alasanDiskualifikasi: {
      type: String,
      trim: true,
    },
    tanggalDiskualifikasi: {
      type: Date,
    },
    juara: {
      type: String,
      enum: ["", "Juara 1", "Juara 2", "Juara 3"],
      default: "",
    },
    hadiah: {
      type: String,
      trim: true,
    },
    catatanJuri: {
      type: String,
      trim: true,
    },
    // Field untuk tracking progress
    isLolos: {
      type: Boolean,
      default: false,
    },
    isDiskualifikasi: {
      type: Boolean,
      default: false,
    },
    isJuara: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk pencarian yang lebih cepat
pesertaSchema.index({ nama: "text" });

// Compound unique index untuk nama + jenisLomba + usia (hanya blokir jika sama persis)
// Mengizinkan: nama sama dengan usia berbeda pada lomba yang sama
pesertaSchema.index({ nama: 1, jenisLomba: 1, usia: 1 }, { unique: true });

module.exports = mongoose.model("Peserta", pesertaSchema);
