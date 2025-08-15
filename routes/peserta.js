const express = require("express");
const router = express.Router();
const Peserta = require("../models/Peserta");

// GET - Mendapatkan semua peserta (untuk ditampilkan ke semua orang)
router.get("/", async (req, res) => {
  try {
    const peserta = await Peserta.find()
      .sort({ tanggalDaftar: -1 }) // Urutkan berdasarkan tanggal daftar terbaru
      .select("-__v"); // Exclude field __v

    res.status(200).json({
      success: true,
      count: peserta.length,
      data: peserta,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data peserta",
      error: error.message,
    });
  }
});

// GET - Mendapatkan peserta berdasarkan jenis lomba
router.get("/lomba/:jenisLomba", async (req, res) => {
  try {
    const { jenisLomba } = req.params;
    const peserta = await Peserta.find({ jenisLomba })
      .sort({ tanggalDaftar: -1 })
      .select("-__v");

    res.status(200).json({
      success: true,
      count: peserta.length,
      data: peserta,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data peserta berdasarkan lomba",
      error: error.message,
    });
  }
});

// GET - Mendapatkan peserta berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const peserta = await Peserta.findById(req.params.id).select("-__v");

    if (!peserta) {
      return res.status(404).json({
        success: false,
        message: "Peserta tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: peserta,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data peserta",
      error: error.message,
    });
  }
});

// POST - Mendaftarkan peserta baru
router.post("/", async (req, res) => {
  try {
    const peserta = await Peserta.create(req.body);

    res.status(201).json({
      success: true,
      message: "Peserta berhasil didaftarkan",
      data: peserta,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar sebelumnya",
      });
    }

    res.status(400).json({
      success: false,
      message: "Error saat mendaftarkan peserta",
      error: error.message,
    });
  }
});

// PUT - Update data peserta
router.put("/:id", async (req, res) => {
  try {
    const peserta = await Peserta.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!peserta) {
      return res.status(404).json({
        success: false,
        message: "Peserta tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data peserta berhasil diupdate",
      data: peserta,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error saat update data peserta",
      error: error.message,
    });
  }
});

// DELETE - Hapus peserta
router.delete("/:id", async (req, res) => {
  try {
    const peserta = await Peserta.findByIdAndDelete(req.params.id);

    if (!peserta) {
      return res.status(404).json({
        success: false,
        message: "Peserta tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Peserta berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saat menghapus peserta",
      error: error.message,
    });
  }
});

// GET - Statistik peserta
router.get("/stats/summary", async (req, res) => {
  try {
    const totalPeserta = await Peserta.countDocuments();
    const pesertaPerLomba = await Peserta.aggregate([
      {
        $group: {
          _id: "$jenisLomba",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const statusCounts = await Peserta.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalPeserta,
        pesertaPerLomba,
        statusCounts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saat mengambil statistik",
      error: error.message,
    });
  }
});

module.exports = router;
