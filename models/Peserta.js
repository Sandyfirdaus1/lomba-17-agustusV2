const mongoose = require("mongoose");

const pesertaSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, "Nama wajib diisi"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi"],
      unique: true,
      lowercase: true,
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
    alamat: {
      type: String,
      required: [true, "Alamat wajib diisi"],
      trim: true,
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
    catatan: {
      type: String,
      trim: true,
    },
    // Field baru untuk sistem turnamen
    babak: {
      type: String,
      enum: ["Penyisihan", "Perempat Final", "Semi Final", "Final"],
      default: "Penyisihan",
    },
    skor: {
      type: Number,
      default: 0,
    },
    waktuPenyelesaian: {
      type: Number, // dalam detik
      default: 0,
    },
    ranking: {
      type: Number,
      default: 0,
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
pesertaSchema.index({ nama: "text", email: "text" });

module.exports = mongoose.model("Peserta", pesertaSchema);
