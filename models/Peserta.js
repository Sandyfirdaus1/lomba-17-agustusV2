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
    alamat: {
      type: String,
      required: [true, "Alamat wajib diisi"],
      trim: true,
    },
    jenisLomba: {
      type: String,
      required: [true, "Jenis lomba wajib dipilih"],
      enum: [
        "Lomba Makan Kerupuk",
        "Lomba Balap Karung",
        "Lomba Tarik Tambang",
        "Lomba Panjat Pinang",
        "Lomba Bakiak",
      ],
    },
    tanggalDaftar: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Terdaftar", "Diterima", "Ditolak"],
      default: "Terdaftar",
    },
    catatan: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk pencarian yang lebih cepat
pesertaSchema.index({ nama: "text", email: "text" });

module.exports = mongoose.model("Peserta", pesertaSchema);
